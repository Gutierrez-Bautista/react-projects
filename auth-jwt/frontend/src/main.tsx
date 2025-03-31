import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Components/App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
