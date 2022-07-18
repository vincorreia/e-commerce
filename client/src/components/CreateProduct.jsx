import { useEffect, useRef, useState } from "react";
import productService from "../services/product.service";

function CreateProduct() {
    const plusSign = "https://i.imgur.com/pJYS4Df.png"

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [img, setImg] = useState(plusSign)
    const [tags, setTags] = useState("")
    const [hidden, setHidden] = useState("")
    const imageInputRef = useRef()
    const imageRef = useRef()

    function handleSubmit(e){
        e.preventDefault();

        const newProduct = {
            "product": JSON.stringify({
                name: name,
                price: price,
                image: img,
                tags: tags.split(","),
                description: ""
            })
        }
    
    productService.createProduct(newProduct)

    window.location.reload()
    }

    useEffect(() => {
        if(imageRef.current){
            imageRef.current.addEventListener("click", () => {
                if(imageInputRef.current.className.trim().length > 0){
                    setHidden("")
                }
                else{
                    setHidden("hidden")
                }
            })
        }
    }, [imageRef])

    return (         
    <form className="flex-col center card product-creator" onSubmit={handleSubmit}>
        <figure className="flex-row center">
            <img ref={imageRef} src={img} alt="Placeholder" className="product-image"/>
        </figure>
        <input ref={imageInputRef} type="text" 
        className={hidden} 
        placeholder="insert image link" 
        value={img} 
        onChange={(e) => {
            setImg(e.target.value)
        }}/>

        <div className="card-details flex-col center">
            <input className="new-product-name" type="text" placeholder="New Product Name" value={name} 
            onChange={(e) => {
                setName(e.target.value)
            }}/>
            <div className="tag-wrapper flex-row center">
                <input type="text" className="new-tags" placeholder="Tag1,Tag2,Tag3" value={tags}
                    onChange={e => {
                        setTags(e.target.value)
                    }}
                />
            </div>
            <span className="price">$<input className="new-price" type="text" placeholder="100" value={price}
                onChange={e => {
                    setPrice(e.target.value)
                }}
            />.00</span>
            <div className="buttons-wrapper flex-row space-around">
                <button className="dark">Place Holder</button>
                <button className="allow" type="submit">Create Product</button>
            </div>
    </div>
    
</form> );
}

export default CreateProduct;