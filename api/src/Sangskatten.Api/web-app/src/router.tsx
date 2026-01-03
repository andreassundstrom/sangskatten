import { MainLayout } from './layout/MainLayout.tsx';
import { Home } from './pages/Home.tsx'

import { createBrowserRouter } from "react-router";
import { ScorePage } from './pages/ScorePage.tsx';
import type { Score } from './types/Score.ts';


const getSheetMusic = async () : Promise<Score[]> => {
    return fetch('/scores/index.json').then(res => res.json())
}

export const router = createBrowserRouter([{
    path:'/',
    Component: MainLayout,
    children:[
        {index:true, Component: Home, loader: async () => {
            var data = await getSheetMusic();
            return { scores: data }
        }},
        { path: '/scores/:id', Component: ScorePage }
    ]
}])