
import {Routes, Route} from "react-router-dom"
import HomePage from "../pages/HomePage";
import FindEventsPage from "../pages/FindEventsPage";
import CreateEventPage from "../pages/CreateEventsPage";
import PageNotFound from "../pages/PageNotFound";
import TicketsPage from "../pages/TicketsPage";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import SinglePageEvent from "../pages/SinglePageEvent";

import UserProfile from "../pages/UserProfile";

function AppRoutes(props) {

return (
<Routes>
{/* index matches on default/home URL: / */}
<Route index element={<HomePage {...props} />} />


<Route path="/events" element={<FindEventsPage {...props} />}/>

<Route path="/events/:eventId" element={<SinglePageEvent {...props}/>}/>



<Route path='/createevents' element={<CreateEventPage {...props} />} />

<Route path='/tickets' element={<TicketsPage {...props} />} />

<Route path='/login' element={<LogInPage {...props} />} />

<Route path='/signup' element={<SignUpPage {...props} />} />


<Route path='/profile' element={<UserProfile {...props} />} />

{/* special route to handle if none of the above match */}
<Route path="*" element={<PageNotFound />} />


</Routes>
)
}

export default AppRoutes;