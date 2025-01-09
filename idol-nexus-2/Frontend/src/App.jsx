import { useState } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer'
import './App.css'
import './index.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <AppRoutes/>
<Footer/>
    </>
  )
}

export default App
