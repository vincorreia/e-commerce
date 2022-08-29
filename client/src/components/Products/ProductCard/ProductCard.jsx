import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../../function/formatPrice";
import useRefreshToken from "../../../hooks/useRefreshToken";
import productService from "../../../services/product.service";
import { useSelector } from "react-redux";
import ButtonAddToCart from "../../Misc/Buttons/ButtonAddToCart";
import ButtonSoldOut from "../../Misc/Buttons/ButtonSoldOut";

export default function ProductCard({ product }) {
  const refreshToken = useRefreshToken();
  const navigate = useNavigate();
  const { isStaff } = useSelector((state) => state.auth);
  const [err, setErr] = useState(null);
  return (
    <div className="flex-col center card">
      <figure className="flex-row center">
        <img src={product.image} alt={product.name} className="product-image" />
      </figure>

      <div className="card-details flex-col center">
        <h2>{product.name}</h2>
        <div className="tag-wrapper flex-row center">
          {product.tags.map((tag, i) => {
            return (
              <span key={i} className={"tag"}>
                {tag}
              </span>
            );
          })}
        </div>
        <span className="price">${formatPrice(product.price)}.00</span>
        <div className="button-wrapper flex-row center wrap">
          <button
            className="dark"
            onClick={() => {
              navigate("/products/" + product.id);
            }}
          >
            More Details
          </button>
          {product.stock > 0 ? (
            <ButtonAddToCart product={product} color="allow" />
          ) : (
            <ButtonSoldOut />
          )}

          {isStaff && (
            <>
              <button
                className="primary"
                onClick={() => {
                  navigate("/products/" + product.id + "/update");
                }}
              >
                Update
              </button>
              <button
                className="deny"
                onClick={() => {
                  refreshToken().then(() => {
                    productService
                      .deleteProduct(product.id)
                      .then(() => {
                        window.location.reload();
                      })
                      .catch((err) => {
                        setErr(err);
                      });
                  });
                }}
              >
                Delete
              </button>
              <p className="error">{err}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
