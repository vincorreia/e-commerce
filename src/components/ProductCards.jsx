import React, { useEffect } from "react";
import { products } from "../data/Products"

export default function ProductCards(props){
    let filteredResults = products;
    const query = props.query
    
    useEffect(() =>{
        if(query.by === "product" && query.searchbar){
            filteredResults = filterByProduct(query.searchbar)
        } else if (query.by === "tag" && query.searchbar && query.searchbar.length > 0){
            filteredResults = filterByTag(query.searchbar)
        }

        console.log(filteredResults)
    },[query])

    function filterByProduct(searchBarQuery){

        let filteredArray = products.filter(item => {
            return item.product.toLowerCase().includes(searchBarQuery.toLowerCase())
        })

        return filteredArray;
    }

    function filterByTag(searchBarQuery){
        let filteredArray = products.filter(item => {
            let count = 0;

            item.tag.forEach(tag => {
                if(tag.toLowerCase().includes(searchBarQuery.toLowerCase())){
                    count ++;
                }
            })

            return count > 0;
        })

        return filteredArray;
    }
    return (
    <div className="cards-wrapper">

    </div>
    )
}