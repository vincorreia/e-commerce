import formatPrice from "../../../function/formatPrice";

function PriceTag({ price }) {
    return ( 
        <span className="price">
            <span className="sign">US$</span>
                {formatPrice(price)}
            <span className="cents">00</span>
      </span>
     );
}

export default PriceTag;