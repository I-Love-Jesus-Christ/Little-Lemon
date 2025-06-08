import "../assets/css/components/Reservation_Form.css";
import {useState, useRef} from "react";
import {fetchAPI} from "../api/meh";

function Reservation_Form(){
    const [name, set_name] = useState("");
    const [email, set_email] = useState("");
    const [occasion, set_occasion] = useState("");
    const [number_of_guests, set_number_of_guests] = useState("");
    const [date, set_date] = useState("");
    const [hour, set_hour] = useState("");
    const [minute, set_minute] = useState("");
    const [meridiem_value, set_meridiem_value] = useState("AM");
    const [request, set_request] = useState("");
    const [available_times, set_available_times] = useState([]);
    const [hour_error_message, set_hour_error_message] = useState("");
    const [minute_error_message, set_minute_error_message] = useState("");
    const [selected_time_error_message, set_selected_time_error_message] = useState("");
    const [date_error_message, set_date_error_message] = useState("");
    const [name_error_message, set_name_error_message] = useState("");
    const [email_error_message, set_email_error_message] = useState("");
    const [occasion_error_message, set_occasion_error_message] = useState("");
    const [number_of_guests_error_message, set_number_of_guests_error_message] = useState("");
    const [selected_time_confirmation_message, set_selected_time_confirmation_message] = useState("");

    const [empty_name_error, set_empty_name_error] = useState(false);
    const [empty_email_error, set_empty_email_error] = useState(false);
    const [empty_number_of_guests_error, set_empty_number_of_guests_error] = useState(false);
    const [empty_occasion_error, set_empty_occasion_error] = useState(false);
    const [empty_date_error, set_empty_date_error] = useState(false);
    const [empty_hour_error, set_empty_hour_error] = useState(false);
    const [empty_minute_error, set_empty_minute_error] = useState(false);

    function format_date(date){
        const split_date = date.split("-");
        const year = split_date[0];
        const month = split_date[1];
        const day = split_date[2];
        const date_in_proper_format = `${month}/${day}/${year}`;
        return date_in_proper_format
    }


    function get_current_available_times_for_current_date(current_date){
        /* We must fetch available times for the current date by making a call to an API */
        const current_available_times = fetchAPI(current_date);

        /* We must format each available time in the current_available_times array for the current_date */
        const formatted_current_available_times = current_available_times.map((time) => {
            const split_time = time.split(":");
            let hour = Number(split_time[0]);
            let the_meridiem_value = "";
            if (hour < 12) {
                the_meridiem_value = "AM";
                if (hour == 0){
                    hour = 12;
                }
             } else {
                the_meridiem_value = "PM";
                if (hour != 12) {
                    hour = hour % 12;
                }
            }
            let minute = split_time[1];
            let new_time = `${hour}:${minute} ${the_meridiem_value}`;
            return new_time;
        });
        /* We must return the formatted_current_available_times array */
        return formatted_current_available_times;
    }

    function handle_date_change(event){
        let current_date = event.target.value;

        /* We must reset the className */
        event.target.className = "no-error";

        /* We must reset empty_date_error state */
        set_empty_date_error(false);

        /* We must reset date_error_message state*/
        set_date_error_message("");

        /* We must reset selected_time_error_message state */
        set_selected_time_error_message("");

        /* We must reset selected_time_confirmation_message state */
        set_selected_time_confirmation_message("");

        /* We must trim the current_date */
        current_date = current_date.trim();

        /* We must set the date state */
        set_date(current_date);

        /* We must validate current_date */
        if (current_date != ""){
            let todays_date_object = new Date();
            let selected_date_object = new Date(current_date);
            if (selected_date_object < todays_date_object) {
                set_date_error_message("You musn't time travel to the past.");
                event.target.className = "required-error-input";
                return;
            }
            const TODAY_IN_MILLISECONDS = todays_date_object.getTime();
            const A_YEAR_IN_MILLISECONDS = 3.154e+10;
            const MAX_RESERVATION_DATE_IN_MILLISECONDS = TODAY_IN_MILLISECONDS + A_YEAR_IN_MILLISECONDS;
            const max_reservation_date_object = new Date(MAX_RESERVATION_DATE_IN_MILLISECONDS);
            if (selected_date_object > max_reservation_date_object){
                set_date_error_message("You must reserve a date within the timespan of a year from today.");
                event.target.className = "required-error-input";
                return;
            }

            /* We must get the available times for the current_date  */
            const current_available_times = get_current_available_times_for_current_date(current_date);

            /* We must set the available_times state */
            set_available_times(current_available_times);

            /* We must validate the selected time for current_date */
            if (hour != "" && hour_error_message == "" && minute != "" && minute_error_message == ""){
                const selected_time = `${hour}:${minute} ${meridiem_value}`;
                const selected_time_is_available = available_times.includes(selected_time);
                if (selected_time_is_available == false){
                    set_selected_time_error_message(`${selected_time} is not an available time to make a reservation on ${format_date(current_date)}.`);
                } else {
                    set_selected_time_confirmation_message(`${selected_time} is an available time to make a reservation on ${format_date(current_date)}.`);
                }
            }
        } else {
            set_available_times([]);
            return;
        }
    }

    function handle_meridiem_button_click(event){
        let current_meridiem_value = event.target.value;

        /* We must set meridiem_value_state */
        set_meridiem_value(current_meridiem_value);

        /* We must reset selected_time_error_message state */
        set_selected_time_error_message("");

        /* We must reset selected_time_confirmation_message state */
        set_selected_time_confirmation_message("");

        /* We must validate the selected time for the current_date */
        if (hour != "" && hour_error_message == "" && minute != "" && minute_error_message == "" && date != "" && date_error_message == ""){
            const selected_time = `${hour}:${minute} ${current_meridiem_value}`;
            const selected_time_is_available = available_times.includes(selected_time);
            if (selected_time_is_available == false){
                set_selected_time_error_message(`${selected_time} is not an available time to make a reservation on ${format_date(date)}.`);
            } else {
                set_selected_time_confirmation_message(`${selected_time} is an available time to make a reservation on ${format_date(date)}.`);
            }
        }

    }

    const meridiem_value_is_set_style = {
        backgroundColor: "#EE9972",
        color: "#333333",
        fontWeight: 666
    };

    const meridiem_value_is_not_set_style = {
        backgroundColor: "#FBDABB",
        color: "#333333",
        fontWeight: 666
    };

    const available_times_jsx = available_times.map((time) => {
        if (available_times.length > 0){
            return (
                <li key={time}>{time}</li>
            );
        }
    });

    function handle_hour_change(event){
        let current_hour = event.target.value;

        /* Trim the current_hour */
        current_hour = current_hour.trim();

        /* Set the hour state */
        set_hour(current_hour);

        /* We must reset the border */
        event.target.className = "no-error";

        /* we must reset empty_hour_error state*/
        set_empty_hour_error(false);

        /* We must reset the hour_error_message state */
        set_hour_error_message("");

        /* We must reset the selected_time_error_message state */
        set_selected_time_error_message("");

        /* We must reset selected_time_confirmation_message state */
        set_selected_time_confirmation_message("");


        /*Now we must validate current_hour*/
        if (current_hour == "") {
            return;
        }
        const pattern = /\D/;
        if(pattern.test(current_hour)){
            set_hour_error_message("Hour must not contain any non-digit characters.");
            event.target.className = "required-error-input";
            return;
        }

        if (current_hour.length > 2) {
            set_hour_error_message("Hour must contain only 1 or 2 digits.");
            event.target.className = "required-error-input";
            return;
        }
        if (current_hour.length == 2 && (Number(current_hour) > 12 || Number(current_hour) < 10)) {
            set_hour_error_message("Invalid hour value.");
            event.target.className = "required-error-input";
            return;
        }
        if (current_hour == "0") {
            set_hour_error_message("Invalid hour value.");
            event.target.className = "required-error-input";
            return;
        }

        /* We must validate if the selected time is available for the selected date */
        if (minute != "" && minute_error_message == "" && date != "" && date_error_message == ""){
            const selected_time = `${current_hour}:${minute} ${meridiem_value}`;
            const selected_time_is_available = available_times.includes(selected_time);
            if (selected_time_is_available == false){
                set_selected_time_error_message(`${selected_time} is not an available time to make a reservation on ${format_date(date)}.`);
            } else {
                set_selected_time_confirmation_message(`${selected_time} is an available time to make a reservation on ${format_date(date)}.`);
            }
        }
    }


    function handle_minute_change(event){
        let current_minute = event.target.value;

        /* Trim the current_minute */
        current_minute = current_minute.trim();

        /* Set the minute state */
        set_minute(current_minute);

        /* We must reset empty_minute_error state */
        set_empty_minute_error(false);

        /* We must reset the className */
        event.target.className = "no-error";

        /* We must reset the minute_error_message state */
        set_minute_error_message("");

        /* We must reset the selected_time_error_message state */
        set_selected_time_error_message("");

        /* We must reset selected_time_confirmation_message state */
        set_selected_time_confirmation_message("");


        /* Now we must validate current_minute */
        if (current_minute == ""){
            return;
        }

        const pattern = /\D/;
        if (pattern.test(current_minute)){
            set_minute_error_message("Minute must not contain any non-digit characters.");
            event.target.className = "required-error-input";
            return;
        }

        if(Number(current_minute) < 0 || Number(current_minute) > 59){
            set_minute_error_message("Invalid minute value.");
            event.target.className = "required-error-input";
            return;
        }

        if(current_minute.length > 2){
            set_minute_error_message("Minute must have 2 digits.");
            event.target.className = "required-error-input";
            return;
        }

        if(current_minute.length == 2){
            /* We must validate if the selected time is available for the selected date */
            if(hour != "" && hour_error_message == "" && date != "" && date_error_message == ""){
                const selected_time = `${hour}:${current_minute} ${meridiem_value}`;
                const selected_time_is_available = available_times.includes(selected_time);
                if (selected_time_is_available == false){
                    set_selected_time_error_message(`${selected_time} is not an available time to make a reservation on ${format_date(date)}.`);
                } else {
                    set_selected_time_confirmation_message(`${selected_time} is an available time to make a reservation on ${format_date(date)}.`);
                }
            }
        }
    }



    function handle_name_change(event){
        let current_name = event.target.value;

        /* We must trim current_name */
        current_name = current_name.trim()

        /* We must reset empty_name_error state */
        set_empty_name_error(false);

        /* We must reset name_error_message state */
        set_name_error_message("");

        /* We must reset the className */
        event.target.className = "no-error";

        /* We must set name state */
        set_name(current_name);

        /* We must validate current_name */
        if (current_name == ""){
            return;
        }
    }

    function handle_email_change(event){
        let current_email = event.target.value;

        /* We must reset empty_email_error state */
        set_empty_email_error(false);

        /* We must reset email_error_message state */
        set_email_error_message("");

        /* We must reset the className */
        event.target.className = "no-error";

        /* We must set email state */
        set_email(current_email);

        /* We must reset email className */
        event.target.className = "no-error";

        /*  We must validate current_email */
        if (current_email == ""){
            return;
        }

    }

    function handle_email_blur(event){
        let current_email = event.target.value;

        /* We must trim current_email */
        current_email = current_email.trim();

        /*  We must validate current_email */
        if (current_email == ""){
            return;
        }

        const pattern = /[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+/;
        if(pattern.test(current_email) == false){
            set_email_error_message("Invalid email address.");
            event.target.className = "required-error-input";
        }
    }

    function handle_occasion_change(event){
        let current_occasion = event.target.value;

        /* We must reset empty_occasion_error state */
        set_empty_occasion_error(false);

        /* We must reset occasion_error_message state */
        set_occasion_error_message("");

        /* We must set occasion state */
        set_occasion(current_occasion);

        /* We must reset the className */
        event.target.className = "no-error";

    }

    function handle_number_of_guests_change(event){
        let current_number_of_guests = event.target.value;

        /* We must reset empty_number_of_guests_error state */
        set_empty_number_of_guests_error(false);

        /* We must reset number_of_guests_error_message state */
        set_number_of_guests_error_message("");

        /* We must set number_of_guests state */
        set_number_of_guests(current_number_of_guests);

        /* We must reset the className */
        event.target.className = "no-error";

        /* We must validate current_number_of_guests */
        if (current_number_of_guests == ""){
            return;
        }
    }

    function form_error_exists(){
        if(name_error_message != "" || email_error_message != "" || occasion_error_message != "" || number_of_guests_error_message != "" || date_error_message != "" || hour_error_message != "" || minute_error_message != "" || selected_time_error_message != ""){
            return true;
        }
        /*
        if ( !name || !email || !occasion || !number_of_guests || !date || !hour || !minute){
            return true;
        }
        */
    }

    function handle_submit_click(event){
        if (!name) {
            set_empty_name_error(true);
        }
        if (!email) {
            set_empty_email_error(true);
        }
        if (!occasion) {
            set_empty_occasion_error(true);
        }
        if(!number_of_guests) {
            set_empty_number_of_guests_error(true);
        }
        if(!date) {
            set_empty_date_error(true);
        }
        if(!hour) {
            set_empty_hour_error(true);
        }
        if(!minute){
            set_empty_minute_error(true);
        }
    }



    return (
        <form method="POST" action="">
            {empty_name_error == true ? (<>
            <label htmlFor="name" className="label-1"><span className="required-error-asterik">*</span> Name</label>
            <input type="text" id="name" name="name" required  maxLength="1020" className="required-error-input" onChange={(event) => handle_name_change(event)} />
            <p className="error-message">Name is required.</p>
            </>) : (<>
            <label htmlFor="name" className="label-1"> Name</label>
            <input type="text" id="name" name="name" required  maxLength="1020" className="" onChange={(event) => handle_name_change(event)} />
            {name_error_message != "" &&
            <p className="error-message">{name_error_message}</p>
            }
            </>)}
            {empty_email_error == true ?(<>
            <label htmlFor="email" className="label-1"><span className="required-error-asterik">*</span> Email</label>
            <input type="text" id="email" maxLength="415" name="email" required className="required-error-input" onBlur={(event)=>handle_email_blur(event)} onChange={(event) => handle_email_change(event)} />
            <p className="error-message">Email is required.</p>
            </>):(<>
            <label htmlFor="email" className="label-1">Email</label>
            <input type="text" id="email" maxLength="415" name="email" required className="" onBlur={(event)=>handle_email_blur(event)} onChange={(event) => handle_email_change(event)} />
            {email_error_message != "" &&
            <p className="error-message">{email_error_message}</p>
            }
            </>)}
            {empty_occasion_error == true ?(<>
            <label htmlFor="occasion" className="label-1"><span className="required-error-asterik">*</span> Occasion</label>
            <select id="occasion" name="occasion" required className="required-error-select" onChange={(event) => handle_occasion_change(event)}>
                <option value="">-- Please select an occasion --</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="engagement">Engagement</option>
                <option value="chaperoned_courtship">Chaperoned courtship</option>
                <option value="marital_date">Marital date</option>
                <option value="casual">Casual</option>
            </select>
            <p className="error-message">Occasion is required.</p>
            </>) : (<>
            <label htmlFor="occasion" className="label-1">Occasion</label>
            <select id="occasion" name="occasion" required className="" onChange={(event) => handle_occasion_change(event)}>
                <option value="">-- Please select an occasion --</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="engagement">Engagement</option>
                <option value="chaperoned_courtship">Chaperoned courtship</option>
                <option value="marital_date">Marital date</option>
                <option value="casual">Casual</option>
            </select>
            </>)}
            {empty_number_of_guests_error == true ?(<>
            <label htmlFor="number-of-guests" className="label-1"><span className="required-error-asterik">*</span> How many people will you be with?</label>
            <input type="number" id="number-of-guests" name="number_of_guests" required min="1" className="required-error-input" onChange={(event) => handle_number_of_guests_change(event)}/>
            <p className="error-message">How many people you will be with is required.</p>
            </>): (<>
            <label htmlFor="number-of-guests" className="label-1">How many people will you be with?</label>
            <input type="number" id="number-of-guests" name="number_of_guests" required min="1" className="" onChange={(event) => handle_number_of_guests_change(event)}/>
            {number_of_guests_error_message != "" &&
            <p className="error-message">{number_of_guests_error_message}</p>
            }
            </>)}
            {empty_date_error == true ? (<>
            <label htmlFor="date" className="label-1"><span className="required-error-asterik">*</span> Date</label>
            <input type="date" id="date" name="date" className="required-error-input" onChange={(event) => handle_date_change(event)}/>
            <p className="error-message">Date is required.</p>
            </>): (<>
            <label htmlFor="date" className="label-1">Date</label>
            <input type="date" id="date" name="date" className="" onChange={(event) => handle_date_change(event)}/>
            {date_error_message != "" &&
            <p className="error-message" id="date-error-message">{date_error_message}</p>
            }
            {(date_error_message == "" && date != "") &&
            <section id="available-reservation-times">
                <h3>Available reservation times for {format_date(date)}</h3>
                <ul>{available_times.length > 0 && available_times_jsx}</ul>
            </section>
            }
            </>)}
            <div id="time-container">
                <div id="hour-container" className="item">
                    {empty_hour_error == true ?(<>
                    <label htmlFor="hour"><span className="required-error-asterik">*</span> Hour</label>
                    <input type="text" inputMode="numeric" id="hour" name="hour" required min="1" max="12" className="required-error-input"  onChange={(event) => handle_hour_change(event)}/>
                    </>) : (<>
                    <label htmlFor="hour">Hour</label>
                    <input type="text" inputMode="numeric" id="hour" name="hour" required min="1" max="12" className="" onChange={(event) => handle_hour_change(event)}/>
                    </>)}
                </div>
                <div id="minute-container" className="item">
                    {empty_minute_error == true ?(<>
                    <label htmlFor="minute"><span className="required-error-asterik">*</span> Minute</label>
                    <input type="text" inputMode="numeric" id="minute" name="minute" placeholder="MM" required min="0" max="60" className="required-error-input" onChange={(event) => handle_minute_change(event)}/>
                    </>):(<>
                    <label htmlFor="minute">Minute</label>
                    <input type="text" inputMode="numeric" id="minute" name="minute" placeholder="MM" required min="0" max="60" className="" onChange={(event) => handle_minute_change(event)} />
                    </>)}
                </div>
                <div id="time-button-container" className="item">
                    {meridiem_value == "AM" ?
                    <button type="button" className="" value="AM" style={meridiem_value_is_set_style}  onClick={(event) => handle_meridiem_button_click(event) }>AM</button>
                    :
                    <button type="button" className="" value="AM" style={meridiem_value_is_not_set_style} onClick={(event) => handle_meridiem_button_click(event) }>AM</button>
                    }
                    {meridiem_value == "PM" ?
                    <button type="button" className="" value="PM" style={meridiem_value_is_set_style}  onClick={(event) => handle_meridiem_button_click(event) }>PM</button>
                    :
                    <button type="button" className="" value="PM" style={meridiem_value_is_not_set_style}  onClick={(event) => handle_meridiem_button_click(event) }>PM</button>
                    }
                </div>
            </div>
            {hour_error_message != "" &&
            <p className="error-message" id="hour-error-message">{hour_error_message}</p>
            }
            {empty_hour_error == true &&
            <p className="error-message">Hour is required.</p>
            }
            {minute_error_message != "" &&
            <p className="error-message" id="minute-error-message">{minute_error_message}</p>
            }
            {empty_minute_error == true &&
            <p className="error-message">Minute is required.</p>
            }
            {selected_time_error_message != "" &&
            <p className="error-message" id="selected-time-error-message">{selected_time_error_message}</p>
            }
            {selected_time_confirmation_message != "" &&
            <p id="selected-time-confirmation-message">{selected_time_confirmation_message}</p>
            }
            <label className="label-1" htmlFor="requests">Any requests? <span className="optional">(Optional)</span></label>
            <textarea id="requests" maxLength="10000" name="requests" rows="7" className="form-element-type-1 form-element-type-5" onChange={(event) => set_request(event.target.value)}></textarea>
            <input type="submit" value="Send" id="submit" disabled={form_error_exists()} className="form-element-type-1" onClick={(event)=> handle_submit_click(event)}/>
        </form>
    );
}

export default Reservation_Form;