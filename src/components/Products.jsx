import React, { useState } from "react";
import SearchBar from "./SearchBar"

export default function Products(){
    const [query, setQuery] = useState({})
    return (
        <div className="sectionContainer">
            <SearchBar 
                setQuery={setQuery}
                query={query}
            />
        </div>
    )
}