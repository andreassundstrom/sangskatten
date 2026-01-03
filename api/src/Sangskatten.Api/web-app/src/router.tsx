import { MainLayout } from './layout/MainLayout.tsx';
import { Home } from './pages/Home.tsx'

import { createBrowserRouter } from "react-router";
import { SheetMusicPage } from './pages/SheetMusic.tsx';
import type { SheetMusic } from './types/SheetMusic.ts';


const getSheetMusic = async () : Promise<SheetMusic[]> => {
    return fetch('/api/v1/sheet-music').then(res => res.json())
}

export const router = createBrowserRouter([{
    path:'/',
    Component: MainLayout,
    children:[
        {index:true, Component: Home, loader: async () => {
            var data = await getSheetMusic();
            return { sheetMusic: data }
        }},
        { path: '/sheet-music/:id', Component: SheetMusicPage }
    ]
}])