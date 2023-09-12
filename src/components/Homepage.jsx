import Container from "@mui/material/Container"
import Featured from "./Featured"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"


export default function Homepage() {

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: "center" }}><Typography variant="h2" component="h1">The Home for all your Games.</Typography></Box>
            <Featured />
        </Container>
    )
}