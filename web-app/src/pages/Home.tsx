import { useLoaderData } from "react-router"
import type { SheetMusic } from "../types/SheetMusic"

export const Home = () => {
    const { sheetMusic } = useLoaderData<{sheetMusic: SheetMusic[]}>()
    return <ul>
        
            {sheetMusic.map(score => 
            <li id={score.id}>
            <a href={`sheet-music/${score.id}`}>
                {score.title}
            </a></li>)}
            
            
    </ul>
}
