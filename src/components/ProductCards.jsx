import React, { useEffect, useState } from "react";
import { products } from "../data/Products"
import ProductCard from "./ProductCard";
import NotFound from "./NotFound";

export default function ProductCards(props){
    const [filteredResults, setFilteredResults] = useState(products);
    const query = props.query
    
    useEffect(() =>{
        if(!query.searchbar || query.searchbar.trim().length === 0){
            setFilteredResults(products);
        } else {
            if(query.by === "product"){
                setFilteredResults(filterByProduct(query.searchbar))
            } else if (query.by === "tag"){
                setFilteredResults(filterByTag(query.searchbar))
            }
        }
    },[query])


    function filterByProduct(searchBarQuery){ // This function will return a filtered array from query.searchbar

        let filteredArray = products.filter(item => {
            return item.name.toLowerCase().includes(searchBarQuery.toLowerCase())
        })

        return filteredArray;
    }


    function filterByTag(searchBarQuery){ // This function returns a filtered array from query.searchbar
        let filteredArray = products.filter(item => {
            let count = 0;

            item.tags.forEach(tag => {
                if(tag.toLowerCase().includes(searchBarQuery.toLowerCase())){
                    count ++;
                }
            })

            return count > 0;
        })
        
        return filteredArray;
    }

    return (
    <div className="flex-row center">
        <div className="cards-wrapper flex-row space-even wrap">
            {filteredResults.length !== 0 ? filteredResults.map((product, i) => {
                return <ProductCard product={product} key={i}/>
                })
                : <NotFound />
            }
        </div>
    </div>
    )
}