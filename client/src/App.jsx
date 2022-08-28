import "./App.css";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Store from "./components/Store (Products)/Store";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout";
import { useEffect } from "react";
import authService from "./services/auth.service";
import { cartServices } from "./services/cart.service";
import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import ProductPage from "./components/ProductPage/ProductPage";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useDispatch } from "react-redux";
import { authActions } from "./store/slices/authSlice";
import { cartActions } from "./store/slices/cartSlice";

function App() {
  let location = useLocation().pathname;
  const dispatch = useDispatch();
  if (location === "/") {
    location = "home";
  } else {
    location = location.slice(1);
  }

  useEffect(() => {
    const user = authService.getStorageUser();
    const cart = cartServices.getStorageCart();
    try {
      if (user.accessToken.length) {
        dispatch(authActions.login(user));
      }
    } catch {}
    try {
      if (cart.length) {
        dispatch(cartActions.setCart(cart));
      }
    } catch {}
  }, [dispatch]);

  return (
    <div className={"App " + location}>
      <main className="main">
        <Nav />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Store />} />
            <Route path="products/:id" element={<ProductPage />} />
            <Route path="products/:id/update" element={<UpdateProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
