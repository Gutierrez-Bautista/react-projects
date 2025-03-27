import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './Login'
import ProtectedRoutes from './ProtectedRoutes'
import ProtectedPage from './Protected'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={LoginPage} />
        <Route path='/login' Component={LoginPage} />

        <Route Component={ProtectedRoutes}>
          <Route path='/protected' Component={ProtectedPage} />
        </Route>

        <Route path='*' element={<h1>404: not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
