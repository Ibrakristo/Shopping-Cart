import { useDispatch, useSelector } from "react-redux";
import { itemRemoved, selectAllItems } from "../cartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from "@mui/material/Typography";
export default function Cart() {
    const cartItems = useSelector(selectAllItems);
    const dispatch = useDispatch();
    return (
        <Container>
            <div>{cartItems.length ? "Your Cart" : "You have no Items in the list"}</div>
            <Box display={"flex"} flexDirection={"column"} flexWrap={"nowrap"}>{cartItems.map(item => {
                return (
                    // <div key={item.id}>
                    //     <div><img src={item.img} alt={`img for ${item.name}`} /></div>
                    //     <div><span>{item.name}</span> <span>{item.price}</span></div>
                    //     <div><button onClick={() => {
                    //         dispatch(itemRemoved(item.id))
                    //     }}><DeleteIcon fontSize="small" /></button></div>

                    // </div>
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
            {cartItems.length ? <Box margin={"auto"} width={"fit-content"}><Button variant="contained">Checkout</Button></Box> : ""}
        </Container >
    )
}