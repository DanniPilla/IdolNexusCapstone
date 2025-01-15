import { NavLink } from 'react-router-dom'
import { Heart, House, Ticket, Search, LogIn, Plus, ClipboardPen, ShoppingCart } from "lucide-react"
import { useUser } from "../context/UserContext";
import { useState } from "react";
import Cart from "../components/Cart";

export default function NavBar() {
  const [showModal, setShowModal] = useState(false);
   const { user } = useUser();
    const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <nav 
      className="NavBar sticky top-0 w-full flex justify-between items-center shadow-md z-50">
      <div className="pl-6 text-2xl font-extrabold text-pink-600 drop-shadow-lg">
        <p>
          <span className="text-white ">Idol</span>
          <span className="text-white font-normal  ">Nexus</span>
          <img
            className="absolute -top-2 -right-11 h-12 w-auto rotate-45 z-0 "
            src="light-stick (2).png"
          />
      
        </p>
      </div>
      <ul className="flex justify-center space-x-4 py-4">
        <li className="relative group">
          <NavLink to="/" className="px-4 uppercase font-bold text-white hover:text-purple-700">
            <House className="text-lg sm:hidden" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:hidden transition-opacity duration-200">
            Home
          </span>
        </li>
        <li className="relative group">
          <NavLink to="/events" className="px-4 uppercase font-bold text-white hover:text-purple-700">
            <Search className="text-lg sm:hidden" />
            <span className="hidden sm:inline">Find Events</span>
          </NavLink>
          <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:hidden transition-opacity duration-200">
            Find Events
          </span>
        </li>
       
        {user && (
          <>
           <li className="relative group">
          <NavLink to="/createevents" className="px-4 uppercase font-bold text-white hover:text-purple-700">
            <Plus className="text-lg sm:hidden" />
            <span className="hidden sm:inline">Create Events</span>
          </NavLink>
          <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:hidden transition-opacity duration-200">
            Create Events
          </span>
        </li>
        <li className="relative group">
          <NavLink to="/tickets" className="px-4 uppercase font-bold text-white hover:text-purple-700">
            <Ticket className="text-lg sm:hidden" />
            <span className="hidden sm:inline">Tickets</span>
          </NavLink>
          <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:hidden transition-opacity duration-200">
            Tickets
          </span>
        </li>

        <li className="relative group flex items-center">
          <button 
          onClick={toggleModal}
          className="px-4 uppercase font-bold text-white hover:text-purple-700">
           
            <ShoppingCart  className="text-lg sm:hidden" />
            <ShoppingCart  className="hidden sm:inline text-lg" />
        
          </button>
          <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:hidden transition-opacity duration-200">
            Cart
          </span>
        </li>
          </>
        )}
        {user ? (
          <li className="relative group">
            <NavLink to="/profile" className="hidden sm:inline px-4 uppercase font-bold text-white hover:text-purple-700">
            <span >
              Welcome, {user.displayName || user.firstName || "User"}
            </span>
            </NavLink>
          </li>
        ) : (
          <>
        <li className="relative group">
          <NavLink to="/login" className="px-4 uppercase font-bold text-white hover:text-purple-700">
            <LogIn className="text-lg sm:hidden" />
            <span className="hidden sm:inline">Log In</span>
          </NavLink>
          <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:hidden transition-opacity duration-200">
            Log In
          </span>
        </li>
        <li className="relative group">
          <NavLink to="/signup" className="px-4 uppercase font-bold text-white hover:text-purple-700">
            <ClipboardPen className="text-lg sm:hidden" />
            <span className="hidden sm:inline">Sign Up</span>
          </NavLink>
          <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:hidden transition-opacity duration-200">
            Sign Up
          </span>
        </li>
        </>
        )}
      </ul>
      <Cart showModal={showModal} toggle={toggleModal} />
    </nav>
  )
}