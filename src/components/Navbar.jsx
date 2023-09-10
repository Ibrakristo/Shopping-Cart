import { Link, Outlet, Form } from "react-router-dom";
import cart from '../assets/cart-shopping-solid.svg'
import search from '../assets/magnifying-glass-solid.svg'
export default function Navbar() {



    return (<div>
        <div><Link to={"/"}>Storio</Link></div>
        <Form method="GET" action="/search">
            <div>
                <input type="search" name="name" id="name" />
                <button><img src={search} alt="search" width="20px" height="20px" /></button>
            </div>
        </Form>
        <ul><li>
            <Link to={"/shop"}>Shop</Link>
        </li>
            <li><Link to={"/cart"}><img src={cart} alt="cart" width="20px" height="20px" /><span></span></Link></li></ul>
        <Outlet />
    </div>)
}