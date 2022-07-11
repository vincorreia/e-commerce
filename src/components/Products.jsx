import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ProductCards from "./ProductCards";

export default function Products(){
    const [query, setQuery] = useState({by: "product"})
    return (
        <div className="sectionContainer">
            <SearchBar 
                setQuery={setQuery}
                query={query}
            />
            <ProductCards
                query={query}
            />
        </div>
    )
}