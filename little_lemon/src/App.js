import {Routes, Route} from "react-router";
import Reservation from './pages/Reservation';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu_and_Order from './pages/Menu_and_Order';
import Confirmed_Booking from "./pages/Confirmed_Booking";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Confirmed_Booking/>} path="/confirmed-booking"></Route>
        <Route element={<Reservation />} path="/"> </Route>
        <Route element={<Home />} path="/home"></Route>
        <Route element={<Menu_and_Order />} path="/menu-and-order"></Route>
        <Route element={<Cart />} path="/cart"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<About />} path="/about"></Route>
        <Route element={<Contact />} path="/contact"></Route>
      </Routes>
    </>
  );
}

export default App;
