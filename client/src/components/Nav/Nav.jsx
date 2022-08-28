import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Nav() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;

  return (
    <nav className="flex-row space-around nav">
      <div className="flex-row center">
        <NavLink className="brand" to="/">
          Watches
        </NavLink>
      </div>
      <div className="profile-section flex-row">
        <NavLink className="nav-link" to="/products">
          STORE
        </NavLink>
        {isAuthenticated ? (
          <NavLink className="nav-link" to="/profile">
            PROFILE
          </NavLink>
        ) : (
          <>
            <NavLink className="nav-link" to="/login">
              LOGIN
            </NavLink>
            <NavLink className="nav-link" to="/signup">
              SIGN UP
            </NavLink>
          </>
        )}
        <NavLink className="nav-link" to="/cart">
          CART{" "}
          <span className={cart.length > 0 ? "amount" : "amount hidden"}>
            {cart.length}
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
