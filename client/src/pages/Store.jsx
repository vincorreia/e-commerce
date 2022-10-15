import React, { useState } from "react";
import { SearchBar } from "components/atoms";
import { ProductContainer } from "components/organisms";

export const Store = () => {
  const [query, setQuery] = useState({ by: "product" });
  return (
    <div className="sectionContainer">
      <SearchBar setQuery={setQuery} query={query} />
      <ProductContainer query={query} />
    </div>
  );
};
