import './App.css'
import { BrowserRouter, Routes } from 'react-router'
import { Route } from 'react-router'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import ProtectedRoutes from '../utils/ProtectedRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={LoginPage}></Route>
        <Route path='login' Component={LoginPage}></Route>
        
        <Route Component={ProtectedRoutes}>
          <Route path='home' Component={HomePage} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
