import React, { useEffect, useState } from "react";
import productService from "../../../services/product.service";
import ProductCard from "../ProductCard/ProductCard";
import NotFound from "../../Misc/NotFound/NotFound";
import CreateProduct from "../../Admin/CreateProduct";
import { useSelector } from "react-redux";

export default function ProductContainer({ query }) {
  const [products, setProducts] = useState(null);
  const [filteredResults, setFilteredResults] = useState(products);
  const [loading, setIsLoading] = useState(true);
  const { isStaff } = useSelector((state) => state.auth);

  useEffect(() => {
    if (products) {
      if (!query.searchbar || query.searchbar.trim().length === 0) {
        setFilteredResults(products);
      } else {
        if (query.by === "product") {
          setFilteredResults(filterByProduct(query.searchbar));
        } else if (query.by === "tag") {
          setFilteredResults(filterByTag(query.searchbar));
        }
      }
    }
  }, [query, products]);

  useEffect(() => {
    productService.getProducts().then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  function filterByProduct(searchBarQuery) {
    // This function will return a filtered array from query.searchbar

    let filteredArray = products.filter((item) => {
      return item.name.toLowerCase().includes(searchBarQuery.toLowerCase());
    });

    return filteredArray;
  }

  function filterByTag(searchBarQuery) {
    // This function returns a filtered array from query.searchbar
    let filteredArray = products.filter((item) => {
      let count = 0;

      item.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(searchBarQuery.toLowerCase())) {
          count++;
        }
      });

      return count > 0;
    });

    return filteredArray;
  }

  return (
    <div className="flex-row center">
      <div className="cards-wrapper flex-row space-even wrap">
        {filteredResults && filteredResults.length !== 0 ? (
          <>
            {filteredResults.map((product, i) => {
              return <ProductCard product={product} key={i} />;
            })}
            {isStaff && <CreateProduct />}
          </>
        ) : loading ? (
          <h1 style={{ color: "white" }}>Loading...</h1>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}
