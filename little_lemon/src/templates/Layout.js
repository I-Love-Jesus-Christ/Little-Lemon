import "../assets/css/templates/Layout.css";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Footer from "../components/Footer";


function Layout({children}){
    return (<>
        <Nav />
        <Main>{children}</Main>
        <Footer />
    </>);
}

export default Layout;