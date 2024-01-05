import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loggedOut } from "../userSlice";
import apiSlice from "../apiSlice";


export default function ProtectedRoutes() {
    const userObj = useSelector((state) => { return state.user });
    const date = new Date();
    const dispatch = useDispatch();
    const tokenDate = new Date(userObj.time);


    const user = userObj.token;
    if (user && date.getTime() > tokenDate?.getTime()) {
        dispatch(apiSlice.util.resetApiState());

        dispatch(loggedOut());
    }
    return (
        <>
            {user ? <Outlet /> : <Navigate to="/" />}
        </>
    )

}