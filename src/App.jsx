import './App.css';
import Nav from "./components/Nav"
import Home from './components/Home';
import Products from "./components/Products"
import Cart from "./components/Cart"
import {Routes, Route, useLocation} from "react-router-dom"

function App() {
  let location = useLocation().pathname;
  if(location === "/"){
    location = "home";
  } else{
    location = location.slice(1);
  }

  return (
    <div className="App">
      <main className={'main ' + location}>
        <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
      </main>
    </div>
  );
}

export default App;
