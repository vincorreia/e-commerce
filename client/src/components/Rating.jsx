import { useState } from "react";
import { FaStar } from "react-icons/fa"

function Rating({product}) {

    const [rating, setRating] = useState(null);
    const [hover, setHover]= useState(null)


    return (
        <div className="rating">
        {[...Array(5)].map((star, i) => {

            const ratingValue = i + 1;

            if(product){
                return (
                    <label key={i}>
                        <FaStar size={20}
                            color={ratingValue <= product.rating ? "#ffc107" : "#e4e5e9"}
                        />
                    </label>
                )
            }
            return <label key={i}>
            <input 
                type="radio" 
                name="rating" value={ratingValue} 
                onClick={() => {setRating(ratingValue)}}
            />
            <FaStar 
                className="star" 
                size={20} 
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseOver={() => setHover(ratingValue)}
                onMouseOut={() => setHover(null)}
            />
            </label>
        })}
        </div>
    )
}

export default Rating;