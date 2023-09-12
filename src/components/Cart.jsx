import { useDispatch, useSelector } from "react-redux";
import { itemRemoved, removeAll, selectAllItems } from "../cartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "react";
export default function Cart() {
    const cartItems = useSelector(selectAllItems);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        dispatch(removeAll())
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Container>
            <Box display="flex" justifyContent={"space-between"} margin={2}><Typography variant="h4" component={"span"}>{cartItems.length ? "Your Cart" : "You have no Items in the list"}</Typography>
                <Button variant="outlined" onClick={() => {
                    dispatch(removeAll());
                }}>Clear</Button>
            </Box>
            <Box display={"flex"} flexDirection={"column"} flexWrap={"nowrap"}>{cartItems.map(item => {
                return (
                    <Grid container alignItems={"center"} key={item.id}>
                        <Grid item xs={10}>
                            <Link to={`/details/${item.id}`} component={RouterLink} underline="none" display={"inline-block"} width={0.9}>
                                <Box display={"flex"} width={"100%"} alignItems={"center"} gap={5}>
                                    <img src={item.img} alt={`img for ${item.name}`} width={"30%"} style={{ flexShrink: 0 }} />
                                    <Typography variant="body1" component={"span"} color="rgba(0, 0, 0, 0.54)" >{item.name}</Typography>
                                    <Typography variant="body1" component={"span"} color="rgba(0, 0, 0, 0.54)" marginLeft={"auto"}>{"$" + item.price / 100}</Typography>
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Box width={"fit-content"} margin={"auto"}><Button onClick={() => {
                                dispatch(itemRemoved(item.id))
                            }}><DeleteIcon fontSize="small" /></Button></Box>
                        </Grid>
                    </Grid>
                )
            })}</Box>
            {cartItems.length ? <Box margin={"auto"} width={"fit-content"}><Button variant="contained" onClick={handleOpen}>Checkout</Button></Box> : ""}
            <Backdrop
                sx={{ color: '#fff', zIndex: 1 }}
                open={open}
                onClick={handleClose}
            >
                <Box>
                    <Typography variant="h4" component={"h5"}>Congraulations! You've Successfully Bought The Items.</Typography>
                    <Box width={"fit-content"} marginX="auto" marginY={3}>
                        <CheckCircleOutlineIcon fontSize="large" color="success!important" />
                    </Box>
                </Box>
            </Backdrop>
        </Container >
    )
}