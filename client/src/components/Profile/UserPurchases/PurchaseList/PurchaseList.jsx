import PurchaseItem from "./PurchaseItem/PurchaseItem";

function PurchaseList( { purchases } ) {

    return ( 
        <ul className="purchase-list">
            {purchases.map(purchase => {
                return <PurchaseItem key={purchase.id} price={purchase.price} items={purchase.items} id={purchase.id} />
            })}
        </ul>
     );
}

export default PurchaseList;