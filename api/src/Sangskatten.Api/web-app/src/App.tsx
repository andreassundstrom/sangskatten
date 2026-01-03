import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'


export default function App() {
  const theme = createTheme({
    palette:{
      primary: {main:'#2D3C59'},
      secondary: {main:'#94A378'}
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
