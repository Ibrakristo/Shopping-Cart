import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from "@mui/material/Typography";
import { useState } from "react";
import apiSlice, { useEmptyCartMutation, useGetGamesQuery, useRemoveGamesMutation } from "../apiSlice";
import { loggedOut } from "../userSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const { data: cartItems,
        isLoading,
        isError,
        error } = useGetGamesQuery();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState("");
    const userObj = useSelector((state) => { return state.user })
    const date = new Date();
    const tokenDate = new Date(userObj.time);
    const Navigate = useNavigate();
    const user = userObj.token;
    const [emptyCart] = useEmptyCartMutation();
    if (user && date.getTime() > tokenDate?.getTime()) {
        dispatch(apiSlice.util.resetApiState());
        dispatch(loggedOut());
    }


    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return (
            <div style={{ margin: "auto", width: "fit-content", marginTop: "50px" }}>Sorry we Encountred A {error.status} of Status {error.originalStatus} with Content of "{error.data}"</div>
        )
    }

    const [removeGames, { isLoadingRemove, isErrorRemove, errorRemove }] = useRemoveGamesMutation();
    if (isErrorRemove) {
        return (
            <div style={{ margin: "auto", width: "fit-content", marginTop: "50px" }}>Sorry we Encountred A {errorRemove.status} of Status {errorRemove.originalStatus} with Content of "{errorRemove.data}"</div>
        )
    }
    const handleOpen = async () => {
        try {

            let secret = await fetch("http://localhost:3000/api/cart/checkout", {
                headers: {
                    "Authorization": user
                },
                mode: "cors"
            });
            if (!secret.ok) {
                setErrors("Something went wrong!");
                return;
            }
            const secretKey = await secret.json();
            Navigate("/checkout", {
                state: {
                    key: secretKey.clientSecret, amount: amount
                }
            })
        }
        catch (ex) {
            setErrors(ex.msg || ex.message)
        }

    };
    let amount = 0;
    for (let game of cartItems) {
        amount += game.original_price;
    }
    amount = amount / 100;

    return (
        <Container>
            <Box display="flex" justifyContent={"space-between"} margin={2}><Typography variant="h4" component={"span"}>{cartItems.length ? "Your Cart" : "You have no Items in the list"}</Typography>
                <Button variant="outlined" onClick={async () => {
                    const res = await emptyCart();
                    if (res.error) {
                        setErrors(res.error.data.error);
                    }
                    else {
                        setErrors("");
                    }
                }}>Clear</Button>
            </Box>
            <Box display={"flex"} flexDirection={"column"} flexWrap={"nowrap"}>{cartItems.map(item => {

                return (
                    <Grid container alignItems={"center"} key={item._id}>
                        <Grid item xs={10}>
                            <Link to={`/details/${item._id}`} component={RouterLink} underline="none" display={"inline-block"} width={0.9}>
                                <Box display={"flex"} width={"100%"} alignItems={"center"} gap={5}>
                                    <img src={item.header_image} alt={`img for ${item.name}`} width={"30%"} style={{ flexShrink: 0 }} />
                                    <Typography variant="body1" component={"span"}  >{item.name}</Typography>
                                    <Typography variant="body1" component={"span"} marginLeft={"auto"}>{"$" + item.original_price / 100}</Typography>
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Box width={"fit-content"} margin={"auto"}><Button onClick={async () => {
                                const res = await removeGames([item._id])
                                if (res.error) {
                                    setErrors(res.error.data.error);
                                };
                            }}><DeleteIcon fontSize="small" /></Button></Box>
                        </Grid>
                    </Grid>
                )
            })}</Box>
            {cartItems.length ? (<><Box marginY={3}><Typography variant="h4" component={"h3"}>Total Amount : {"$" + amount}</Typography></Box><Box margin={"auto"} width={"fit-content"}><Button variant="contained" onClick={handleOpen}>Checkout</Button></Box></>) : ""}
            <div><span>{errors}</span></div>

        </Container >
    )
}