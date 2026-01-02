import { Link, useLoaderData } from "react-router"
import type { SheetMusic } from "../types/SheetMusic"
import { Card, CardContent, List, ListItem } from "@mui/material"

export const Home = () => {
    const { sheetMusic } = useLoaderData<{sheetMusic: SheetMusic[]}>()
    return <Card>
        <CardContent>
        <List>
            {sheetMusic.map(score => 
            <ListItem key={score.id} component={Link} to={`sheet-music/${score.id}`}>{score.title}</ListItem>
            )
            }
    </List>
        </CardContent>
        </Card>
}
