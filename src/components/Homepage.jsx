import Container from "@mui/material/Container"
import Featured from "./Featured"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Trailer from '../assets/Trailer.webm'

export default function Homepage() {

    return (
        <>        <div className="trailer" >
            <Typography className="test" variant="h3" component="h2" sx={{ position: "absolute", top: "calc(50% - 72px)", padding: "10px" }} > The Home for all your Games</Typography>
            <video autoPlay loop muted src={Trailer} style={{ width: "100%", maxHeight: "550px", objectFit: "fill", opacity: 0.2 }}></video>
        </div >
            <Container>

                <Featured />
            </Container>
        </>

    )
}