import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { getCart } from './cartHelpers'
import Card from './Card'
import Checkout from './Checkout'

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart())
    },[run])

    const showItems = (items) => {
        return (
            <div>
                <h3>Your cart has {`${items.length}`} items</h3>
                <hr/>
                {items.map((p, i) => ( <div key={i} className="mb-4" ><Card product={p} showRemoveProductButton={true} showAddToCartButton={false} cartUpdate={true} setRun={setRun} run={run}/></div> ))}
            </div>
        )
    }

    const noItemsMessage =() => {
        return(
            <h2> Your Cart is empty. <br/> <Link to="/shop">Continue shopping</Link> </h2>
        )
    }

    return(
        <Layout title="Shopping Cart" description="Manage your cart items." className="container-fluid">
            <div className="row">
                <div className="col-6">
                    { items.length >0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr/>
                    <Checkout setRun={setRun} run={run} products={items}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;