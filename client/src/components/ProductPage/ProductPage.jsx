import productService from "../../services/product.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PurchaseBox from "./Purchase Box/PurchaseBox";
import ProductDetails from "./Product Details/ProductDetails";
import Spinner from "../Misc/Spinner/Spinner";

function ProductPage() {
  const params = useParams().id || false;
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState({
    rating: 5,
    reviews: [],
  });

  const getAverageRating = (reviewArray) => {
    const totalRating = reviewArray.reduce(
      (prevValue, review) => prevValue + review.rating,
      0
    );

    const averageRating = totalRating / reviewArray.length;

    return averageRating;
  };

  useEffect(() => {
    if (params) {
      productService.getProductById(params).then((response) => {
        if (response.data.reviews.length) {
          const responseReviews = response.data.reviews;
          setReviews({
            rating: getAverageRating(responseReviews),
            reviews: responseReviews,
          });
        }
        setProduct(response.data.product);
      });
    }
  }, [params]);

  return (
    <div className="sectionContainer flex-col center align-center">
      <div className="product-page flex-row space-around wrap">
        {product ? (
          <>
            <figure className="product-figure flex-row">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
            </figure>
            <ProductDetails
              product={product}
              reviews={reviews}
              params={params}
            />
            <PurchaseBox product={product} />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default ProductPage;
