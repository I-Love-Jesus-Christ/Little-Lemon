import "../assets/css/components/Nav.css";
import {Link} from "react-router";
import logo from "../assets/icons/the_logo.svg";

function Nav(){
    return (
        <nav id="top-nav">
            <div id="left-nav-part">
                <div id="hamburger-menu">
                    <svg id="hamburger-menu-svg" height="40"  width="40" fill="#495E57" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M97.092 36.078H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222zM97.092 61.889H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222zM97.092 87.7H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222z"/></svg>                    
                    <div id="hamburger-menu-content">
                        <Link className="hamburger-menu-link" to="/home">Home</Link>
                        <Link className="hamburger-menu-link" to="/menu-and-order">Menu & Order</Link>
                        <Link className="hamburger-menu-link" to="/login">Login</Link>
                        <Link className="hamburger-menu-link" to="/">Reservation</Link>
                    </div>
                </div>
                <Link id="left-nav-part-logo-link" to="/home">
                    <img src={logo} id="left-nav-part-logo-image" height="80" width="180" alt="logo"/>
                </Link>
            </div>
            <div id="middle-nav-part">
                <Link id="middle-nav-part-logo-link" to="/home">
                    <img src={logo} id="middle-nav-part-logo-image" height="80" width="250" alt="logo" />
                </Link>
                <div id="middle-nav-part-links-div">
                    <Link className="middle-nav-part-link" to="/home">Home</Link>
                    <Link className="middle-nav-part-link" to="/menu-and-order">Menu & Order</Link>
                    <Link className="middle-nav-part-link" to="/login">Login</Link>
                    <Link className="middle-nav-part-link" to="/">Reservation</Link>
                </div>
            </div>
            <div id="right-nav-part">
                <Link id="cart-link" to="/cart">
                <svg id="cart-svg" height="40" width="40" fill="#495E57" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z" data-name="Shopping Cart"/></svg>
                </Link>
            </div>
        </nav>
    );
}

export default Nav;