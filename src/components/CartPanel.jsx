import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiSlice, { useGetGamesQuery, useGetpicturesQuery } from "../apiSlice"
import { loggedOut } from '../userSlice';
import { Avatar, Stack } from '@mui/material';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';

export default function CartPanel() {
    const [imgSrc, setImgSrc] = useState(false);
    let count = 0;
    let img;
    const {
        data: gamesInCart,
        isLoading,
    } = useGetGamesQuery();
    let dispatch = useDispatch();
    const user = useSelector((state) => (state.user));
    const name = user.name;



    async function logout(e) {
        e.preventDefault();
        dispatch(apiSlice.util.resetApiState());

        dispatch(loggedOut());
    }

    if (!isLoading) {
        count = gamesInCart ? gamesInCart.length : 0;
    }

    if (!imgSrc) {
        img = <Spinner />
    }

    else {
        img = < Avatar src={imgSrc} style={{ "alignSelf": "flex-end" }} alt="" />
    }
    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch("http://localhost:3000/api/user/getpicture", {
                headers: {
                    "Authorization": user.token
                },
                mode: "cors"
            });
            let blob = await response.blob();
            const dataUrl = URL.createObjectURL(blob);
            setImgSrc(dataUrl);

        };

        setTimeout(fetchData, 300);
    }, [user.token, user.profile])

    return (
        <>
            <Stack direction="row" justifyContent={"space-evenly"} alignItems={"center"} width={"100%"} spacing={1}>

                <Link component={RouterLink} to={"/profile"} underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: "5px", maxHeight: "75%", }}> {img}  {name} </Link>

                <Badge color="primary" badgeContent={count} invisible={count == 0 ? true : false}>
                    <Link component={RouterLink} to={"/cart"} ><ShoppingCartIcon fontSize="small" color="action" /></Link>
                </Badge>
                <Link onClick={logout} underline="hover">logout</Link>

            </Stack >
        </>
    )
}