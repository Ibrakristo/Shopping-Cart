import UserPanel from './UserPanel'
import CartPanel from './CartPanel'
import { useDispatch, useSelector } from 'react-redux'
import { loggedOut } from '../userSlice';
import apiSlice from '../apiSlice';
export default function Panel() {
    const dispatch = useDispatch();
    const userObj = useSelector((state) => {
        return state.user;
    })
    const user = userObj.token;
    const date = new Date();
    const tokenDate = new Date(userObj.time);

    if (user && date.getTime() > tokenDate?.getTime()) {
        dispatch(apiSlice.util.resetApiState());

        dispatch(loggedOut());
    }
    return (
        <>
            {user ? <CartPanel /> : < UserPanel />}
        </>
    )
} 