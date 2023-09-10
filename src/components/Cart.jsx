import { useDispatch, useSelector } from "react-redux";
import { itemRemoved, selectAllItems } from "../cartSlice";
import trash from '../assets/trash-solid.svg'

export default function Cart() {
    const cartItems = useSelector(selectAllItems);
    const dispatch = useDispatch();
    return (
        <div>
            <div>{cartItems.length ? "Your Cart" : "You have no Items in the list"}</div>
            <div>{cartItems.map(item => {
                return (
                    <div key={item.id}>
                        <div><img src={item.img} alt={`img for ${item.name}`} /></div>
                        <div><span>{item.name}</span> <span>{item.price}</span></div>
                        <div><button onClick={() => {
                            dispatch(itemRemoved(item.id))
                        }}><img src={trash} alt="trash" width="20px" height="20px" /></button></div>

                    </div>
                )
            })}</div>
            {cartItems.length ? <button>Checkout</button> : ""}
        </div >
    )
}