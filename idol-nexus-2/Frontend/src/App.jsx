import { useState } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer'
import './App.css'
import './index.css';
import { UserProvider } from './context/UserContext'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserProvider>
      <Navbar/>
      <AppRoutes/>
<Footer/>
</UserProvider>
    </>
  )
}

export default App
