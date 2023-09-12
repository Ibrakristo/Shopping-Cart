import { Link as RouterLink } from "react-router-dom";
import { itemAdded } from "../cartSlice";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import { useEffect, useState } from "react";

export default function Item({ item }) {
    let [trigger, setTrigger] = useState(false);
    let dispatch = useDispatch();

    useEffect(() => {
        setTrigger(true);
    }, [])
    return (
        <Paper variant="outlined" sx={{ backgroundColor: "#282828" }} >
            <Collapse in={trigger} timeout={500}>
                <Link component={RouterLink} to={`/details/${item.id || item._id}`} sx={{ display: "inline-block" }} color={"inherit"} underline="none" >
                    <img src={item.header_image} alt={`header_image for ${item.name} `} width={"100%"} />
                    <Typography variant="body1" component="h3">{item.name}</Typography>
                </Link>
                <Typography variant="button" component="span">{"$" + item.original_price / 100}</Typography>
                <Box marginX={"auto"} width={"fit-content"}>

                    <Button onClick={() => {
                        dispatch(itemAdded({ name: item.name, img: item.header_image, price: item.original_price, id: item.id || item._id }))
                    }}>
                        Add to Cart
                    </Button>
                </Box>
            </Collapse>
        </Paper >
    )
}