import { Outlet } from "react-router"
import { NavBar } from "./NavBar"
import { Box, Container } from "@mui/material"

export const MainLayout = () => {
    return <Box>
    <NavBar />
    <Container maxWidth='xl' sx={{pt:2}}>
        <Outlet />
        </Container>
        </Box>
}