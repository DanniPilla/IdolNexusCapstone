import { useState } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer'
import './App.css'
import './index.css';
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>
    <UserProvider>
      <Navbar/>
      <AppRoutes/>
<Footer/>
</UserProvider>
</CartProvider>
    </>
  )
}

export default App
