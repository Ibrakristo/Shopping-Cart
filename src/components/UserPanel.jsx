import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';


export default function UserPanel() {


    return (
        <>
            <Stack direction="row" justifyContent={"space-evenly"} alignItems={"center"} width={"100%"} spacing={1}>
                <Link component={RouterLink} to={"/login"} underline="hover">
                    Login
                </Link>
                <Link component={RouterLink} to={"/register"} underline="hover">Register</Link>
            </Stack>

        </>
    )
}