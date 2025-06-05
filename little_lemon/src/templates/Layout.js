import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../assets/css/templates/Layout.css";

function Layout({children}){
    return (<>
        <Nav />
        <main>{children}</main>
        <div class="footer-container">
            <Footer />
        </div>

    </>);
}

export default Layout;