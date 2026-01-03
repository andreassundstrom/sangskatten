import { Link, useLoaderData } from "react-router"
import type { SheetMusic } from "../types/SheetMusic"
import { Card, CardContent, List, ListItem, Typography } from "@mui/material"

export const Home = () => {
    const { sheetMusic } = useLoaderData<{sheetMusic: SheetMusic[]}>()
    return <Card>
        <CardContent>
        <Typography variant="h1">
            Sångskatten
            </Typography>
        <Typography variant="h2">Childrens songs</Typography>
        <List>
            {sheetMusic.map(score => 
            <ListItem key={score.id} component={Link} to={`sheet-music/${score.id}`}>{score.title}</ListItem>
            )
            }
        </List>
        </CardContent>
        </Card>
}
