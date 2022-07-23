import { useState } from "react";
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from "react-icons/fa"

function Reviews({reviews}) {
    const [current, setCurrent] = useState(0)
    const length = reviews.length;


    return ( 
        <div className="reviews">
            <FaArrowAltCircleLeft className="left-arrow"/>
            <FaArrowAltCircleRight className="right-arrow"/>
            {reviews.map((review, index) => {
                return (
                    <div>
                        <h3>{review.rating}</h3>
                        <h3>{review.content}</h3>
                    </div>
                )
            })}
        </div>
     );
}

export default Reviews;