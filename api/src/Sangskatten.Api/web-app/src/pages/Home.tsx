import { Link, useLoaderData } from "react-router"
import type { Score as Score } from "../types/Score"
import { Card, CardContent, List, ListItem, Typography } from "@mui/material"

export const Home = () => {
    const { scores } = useLoaderData<{scores: Score[]}>()
    return <Card>
        <CardContent>
        <Typography variant="h1">
            Sångskatten
            </Typography>
        <Typography variant="h2">Childrens songs</Typography>
        <List>
            {scores.map(score => 
            <ListItem key={score.filename} component={Link} to={`scores/${score.filename}`}>{score.title}</ListItem>
            )
            }
        </List>
        </CardContent>
        </Card>
}
