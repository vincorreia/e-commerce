import { queryAllByAltText } from "@testing-library/react";
import React, { useEffect, useRef, useState } from "react";

export default function SearchBar(props){

    const setQuery = props.setQuery;
    const query = props.query;
    const select = useRef(null);
    const [searchText, setSearchText] = useState("")

    function handleChange(event) {
        const targetId = event.target.id;
        const newValue = event.target.value;
        if(targetId === "searchbar"){
            setSearchText(newValue)
        }
        setQuery({...query, targetId: newValue})
    }
    return (
        <div className="searchbar flex-row center">
            <input id="searchbar" type="text" placeholder="SEARCH..." className="searchbar" onChange={(event) => {
                handleChange(event)
            }} value={searchText} />
            <div className="select-box">
                <select ref={select} name="by" id="by" onChange={event => {
                    handleChange(event);
                }}>
                    <option value="product">Product</option>
                    <option value="tag">Tag</option>
                </select>
            </div>
        </div>
    )
}