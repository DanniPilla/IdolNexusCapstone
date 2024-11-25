import { Link, useNavigate } from 'react-router-dom'

import { useContext } from "react";
import { MyThemeContext } from "../context/MyThemeContext";


// save as pages/PostsPage.jsx
export default function PageNotFound(){
   const { theme } = useContext(MyThemeContext);
 return (
    <div
       className="w-full min-h-screen  "
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
      }}
    >
      <h1 className="text-center mt-[5rem]">
       Page Not Found</h1>
<p className="text-center mt-[2rem]" >What were you looking for?
Maybe going back <Link to="/">home </Link>
 will help you find it.</p>

</div>
)
}