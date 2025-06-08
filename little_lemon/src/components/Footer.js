import "../assets/css/components/Footer.css";
import {Link} from "react-router";

function Footer(){
    return (
        <footer>
            <nav id="footer-nav-1">
                <Link className="footer-nav-link" to="/contact">Contact</Link>
                <Link className="footer-nav-link" to="/about">About</Link>
            </nav>
            <nav id="footer-nav-2">
                <Link className="footer-nav-link" to="/contact">Contact</Link>
                <Link className="footer-nav-link" to="/about">About</Link>
            </nav>
            <p id="copyright">
                &copy; 2025
            </p>
        </footer>
    );
}

export default Footer;