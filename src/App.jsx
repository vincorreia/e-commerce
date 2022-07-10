import './App.css';
import Nav from "./components/Nav"
import Home from './components/Home';
import Products from "./components/Products"
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
          </Routes>
      </main>
    </div>
  );
}

export default App;
