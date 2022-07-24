import React from "react";

export default function NotFound(props){
    const page = props.page;

    return <div className={"not-found " + page}>
         <h1>No results found 😔</h1>
    </div>
}