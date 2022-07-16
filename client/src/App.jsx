import './App.css';
import Nav from "./components/Nav"
import Home from './components/Home';
import Store from "./components/Store"
import Cart from "./components/Cart"
import CartProvider from './context/CartContext';
import {Routes, Route, useLocation} from "react-router-dom"
import Form from './components/Form';

function App() {
  let location = useLocation().pathname;
  if(location === "/"){
    location = "home";
  } else{
    location = location.slice(1);
  }

  return (
    <CartProvider>
      <div className={"App " + location}>
        <main className='main'>
          <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Store/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path='/login' element={<Form />}/>
              <Route path='/signup' element={<Form />}/>
            </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
