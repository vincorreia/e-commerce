import CreateProduct from "./CreateProduct"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../../services/product.service";

function UpdateProduct() {
    const productId = Number(useParams().id)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        productService.getProductById(productId)
        .then(response => {
            const newProduct = {
                ...response.data.product,
                isCreated: true
            }
            setProduct(newProduct)
        })
    }, [])

    return (
        <div className="flex-row center">
            {product && <CreateProduct product={product}/>}
        </div>
    );
}

export default UpdateProduct;