import { AppBar, Button, Container, Toolbar } from "@mui/material"
import { Link } from "react-router"

export const NavBar = () => {
    return <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar>
            <Button color="inherit" component={Link} to={'/'}>Sångskatten</Button>
        </Toolbar>
        </Container>
    </AppBar>
}