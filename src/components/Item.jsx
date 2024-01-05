import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import { useEffect, useState } from "react";
import { useAddGameMutation } from "../apiSlice";

export default function Item({ item }) {
    const user = useSelector((state) => { return state.user.token })
    let [trigger, setTrigger] = useState(false);
    const Navigate = useNavigate();
    useEffect(() => {
        setTrigger(true);
    }, [])

    const [addToCart, { isError, error }] = useAddGameMutation();
    if (isError) {
        return (
            <div style={{ margin: "auto", width: "fit-content", marginTop: "50px" }}>Sorry we Encountred A {error.status} of Status {error.originalStatus} with Content of "{error.data}"</div>
        )
    }
    return (
        <Paper variant="elevation" elevation={20} sx={{ backgroundColor: "#282828", ":hover": { transform: "translateY(-10px)", } }} >
            <Collapse in={trigger} timeout={500}>
                <Link component={RouterLink} to={`/details/${item.id || item._id}`} sx={{ display: "inline-block" }} color={"inherit"} underline="none" >
                    <img src={item.header_image} alt={`header_image for ${item.name} `} width={"100%"} />
                    <Typography variant="body1" component="h3" marginLeft={1}>{item.name}</Typography>
                </Link>
                <Typography variant="button" component="span" marginLeft={1}>{"$" + item.original_price / 100}</Typography>
                <Box marginX={"auto"} width={"fit-content"}>

                    <Button onClick={() => {
                        if (user) {
                            addToCart(item.id || item._id);
                        } else {
                            Navigate("/login")
                        }
                    }}>
                        Add to Cart
                    </Button>
                </Box>
            </Collapse>
        </Paper >
    )
}