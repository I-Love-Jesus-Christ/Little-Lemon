import Layout from "../templates/Layout";
import check_mark from  "../assets/icons/check_mark.svg";
import "../assets/css/pages/Confirmed_Booking.css";

function Confirmed_Booking(){
    return (
        <Layout>
            <div id="content-container">
                <img src={check_mark} alt="check mark" width="120" height="120"/>
                <h1>Your reservation is confirmed.</h1>
                <p id="confirmation-number">Confirmation #: </p>
                <section id="reservation-details-section">
                    <h2 id="reservation-details-heading">Reservation details</h2>
                    <article id="reservation-details">
                        <p>Name: </p>
                        <p>Email</p>
                        <p>Occasion: </p>
                        <p>Number of people: </p>
                        <p>Date: </p>
                        <p>Time: </p>
                        <p>Requests: </p>
                    </article>
                    <div id="reservation-details-button-container">
                        <button id="modify-button" type="button">Modify</button>
                        <button type="button">Cancel</button>
                    </div>

                </section>
            </div>
        </Layout>
    );
}
export default Confirmed_Booking;