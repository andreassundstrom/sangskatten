import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'


export default function App() {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
