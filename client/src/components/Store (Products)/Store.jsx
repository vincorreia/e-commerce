import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProductContainer from "./ProductContainer/ProductContainer";

export default function Store() {
  const [query, setQuery] = useState({ by: "product" });
  return (
    <div className="sectionContainer">
      <SearchBar setQuery={setQuery} query={query} />
      <ProductContainer query={query} />
    </div>
  );
}
