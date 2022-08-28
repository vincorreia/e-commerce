import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function SearchBar(props) {
  const { query, setQuery } = props;
  const select = useRef(null);
  const [searchText, setSearchText] = useState("");

  function handleChange(event) {
    const targetId = event.target.id;
    const newValue = event.target.value;
    if (targetId === "searchbar") {
      setSearchText(newValue);
    }
    setQuery({ ...query, [targetId]: newValue });
  }

  return (
    <div className="searchbar flex-row space-around">
      <div className="flex-row">
        <Link to="/" className="link">
          HOME
        </Link>
      </div>
      <div className="flex-row center">
        <input
          id="searchbar"
          type="text"
          placeholder="SEARCH..."
          className="searchbar"
          onChange={(event) => {
            handleChange(event);
          }}
          value={searchText}
        />

        <div className="select-box">
          <select
            ref={select}
            name="by"
            id="by"
            onChange={(event) => {
              handleChange(event);
            }}
          >
            <option value="product">Product</option>
            <option value="tag">Tag</option>
          </select>
        </div>
      </div>
    </div>
  );
}
