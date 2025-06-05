import './App.css';
import {Routes, Route} from "react-router";
import Reservation from './pages/Reservation';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu_and_Order from './pages/Menu_and_Order';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/"> </Route>
        <Route element={<Reservation />} path="/reserve"></Route>
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
