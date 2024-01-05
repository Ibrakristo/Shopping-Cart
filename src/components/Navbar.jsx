import { Link as RouterLink, Outlet, Form } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import Panel from './Panel'
import { loggedOut } from "../userSlice";
import apiSlice from "../apiSlice";
export default function Navbar() {
    const userObj = useSelector((state) => { return state.user });
    const user = userObj.token;
    const date = new Date();
    const dispatch = useDispatch();
    const tokenDate = new Date(userObj.time);
    if (user && date.getTime() > tokenDate?.getTime()) {
        dispatch(apiSlice.util.resetApiState());

        dispatch(loggedOut());
    }
    return (
        <>
            <Grid container alignItems={"baseline"} justifyContent={"space-between"} paddingX={3} paddingY={{ xs: 2, md: 0 }}>
                <Grid container item xs={12} md={3} alignItems={"center"} justifyContent={"space-evenly"} minWidth={"fit-content"} >
                    <Link component={RouterLink} to={"/"} underline="none" fontSize={24}>Storio</Link>
                    <Link component={RouterLink} to={"/shop"} underline="none" fontSize={16}>Shop</Link>
                </Grid>


                <Grid container item xs={12} md={6} justifyContent={"center"} minWidth={"fit-content"} marginBottom={3} marginTop={1}>
                    <Form method="GET" action="/search">
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <TextField id="Search" label="Search" variant="standard" name="name" margin="dense" />
                            <Button sx={{ paddingY: 1 }} type="submit"><SearchIcon fontSize="medium" color="action" /></Button>
                        </Box>
                    </Form>
                </Grid>
                <Grid container item xs={12} md={3} minWidth={"fit-content"} alignItems={"center"}>
                    <Panel />
                </Grid>
            </Grid>
            <Outlet />
            <Footer />
        </>
    )
}