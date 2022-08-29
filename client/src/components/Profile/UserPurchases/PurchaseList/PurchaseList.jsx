import PurchaseItem from "./PurchaseItem/PurchaseItem";

function PurchaseList( { purchases } ) {

    return ( 
        <div>
            {purchases.map(purchase => {
                return <PurchaseItem key={purchase.id} price={purchase.price} items={purchase.items} id={purchase.id} />
            })}
        </div>
     );
}

export default PurchaseList;