import { Link } from "react-router-dom";
import { itemAdded } from "../cartSlice";
import { useDispatch } from "react-redux";
export default function Item({ item }) {
    let dispatch = useDispatch();

    return (
        <div >
            <Link to={`/details/${item.id || item._id}`}>
                <img src={item.header_image} alt={`header_image for ${item.name} `} />
                <div>{item.name}</div>
            </Link>
            <div>{"$" + item.original_price / 100}</div>
            <button onClick={() => {
                dispatch(itemAdded({ name: item.name, img: item.header_image, price: item.original_price, id: item.id || item._id }))
            }}>
                Add to Cart
            </button>
        </div>
    )
}