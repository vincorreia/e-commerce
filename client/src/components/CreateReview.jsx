import { useState } from "react";
import Rating from "./Rating";
import productService from "../services/product.service"


function CreateReview({productId}) {

    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        
        const newReview = {
            rating: rating,
            content: content
        }

        productService.createReview(newReview, productId);
    }

    return (  
        <form className="flex-col create-review wrap" onSubmit={handleSubmit}>
            <Rating 
                size={17.5}
                rating={rating}
                setRating={setRating}
            />
            <textarea type="text"  rows="7" value={content} onChange={(e) => {
                setContent(e.target.value);
            }} />
            <button className="primary" type="submit">Post Review</button>
        </form>
    );
}

export default CreateReview;