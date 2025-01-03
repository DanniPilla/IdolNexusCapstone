import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {Heart, House, Tv, BookHeart} from "lucide-react"

export default function NavBar() {


return (
<nav 
  className="NavBar sticky  top-0  w-full  flex justify-between items-center shadow-md  z-50">
   <div className="pl-6 text-2xl font-extrabold text-pink-600 drop-shadow-lg">
        <p>
          <span className="text-pink-400">Idol</span>
          <span className=" text-pink-700">Nexus</span>
        </p>
      </div>
  <ul className="flex justify-center space-x-4 py-4">
    <li><NavLink to="/" className="px-4 uppercase font-bold text-pink-500 hover:text-gray-500" >
    <House className="text-lg sm:hidden" />
    <span className="hidden sm:inline">Home</span>
    
    </NavLink></li>
    <li><NavLink to="/findevents" className="px-4 uppercase font-bold text-pink-500 hover:text-gray-500" >
    <Tv className="text-lg sm:hidden" />
    <span className="hidden sm:inline">Find Events</span>
    
    </NavLink></li>
    
    <li><NavLink to="/createevents" className="px-4 uppercase font-bold text-pink-500 hover:text-gray-500" >
    <Heart className="text-lg sm:hidden"/>
    <span className="hidden sm:inline">Create Events</span>
    </NavLink></li>
    <li><NavLink to="/tickets" className="px-4 uppercase font-bold text-pink-500  hover:text-gray-500" >
    <BookHeart className="text-lg sm:hidden" />
    <span className="hidden sm:inline">Tickets</span>
    
    </NavLink></li>
     <li><NavLink to="/login" className="px-4 uppercase font-bold text-pink-500  hover:text-gray-500" >
    <BookHeart className="text-lg sm:hidden" />
    <span className="hidden sm:inline">Log In</span>
    
    </NavLink></li>
     <li><NavLink to="/signup" className="px-4 uppercase font-bold text-pink-500  hover:text-gray-500" >
    <BookHeart className="text-lg sm:hidden" />
    <span className="hidden sm:inline">Sign Up</span>
    
    </NavLink></li>
   
  </ul>

</nav>
)
}