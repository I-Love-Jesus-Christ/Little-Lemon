import Layout from "../templates/Layout";
import Reservation_Form from "../components/Reservation_Form";
import "../assets/css/pages/Reservation.css";

function Reservation() {
    return (<>
        <Layout className="layout">
            <div id="content-container">
                    <h1>Reserve a table</h1>
                    <p>Please fill the form below to reserve a table.</p>
                    <Reservation_Form />
            </div>
        </Layout>
    </>);

}

export default Reservation;