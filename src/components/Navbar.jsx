import { Link as RouterLink, Outlet, Form } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { useState } from "react";

export default function Navbar() {


    return (
        <>
            <Grid container alignItems={"baseline"} padding={2}>
                <Grid container item xs={1} marginLeft={1}>
                    <Link component={RouterLink} to={"/"} underline="none" fontSize={24}>Storio</Link>
                </Grid>
                <Grid container item xs={1} marginLeft={5}>
                    <Link component={RouterLink} to={"/shop"} underline="none" fontSize={16}>Shop</Link>
                </Grid>

                <Grid container item xs justifyContent={"center"}>
                    <Form method="GET" action="/search">
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <TextField id="Search" label="Search" variant="standard" name="name" margin="dense" />
                            <Button sx={{ paddingY: 1 }} type="submit"><SearchIcon fontSize="medium" color="action" /></Button>
                        </Box>
                    </Form>
                </Grid>
                <Grid container item xs={1} justifyContent={"center"}>
                    <Link component={RouterLink} to={"/cart"} ><ShoppingCartIcon fontSize="small" color="action" /></Link>
                </Grid>
            </Grid>
            <Container>

                <Outlet />
            </Container>
        </>
    )
}