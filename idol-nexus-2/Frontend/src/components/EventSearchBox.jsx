import { useSearchParams } from "react-router-dom";
import {Search} from 'lucide-react'
import useEventSearch from '../hooks/useEventSearch'
import EventCard from "./EventCard";
import SkeletonCard from "./SkeletonCard";

const EventSearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {  eventsData, setSearchTerm, searchTerm, loading,} = useEventSearch();
  const skeletonArray = Array.from({ length: 10 }, (_, i) => i);


   return (
    <div
      className=" p-4"
    >
      <div className="flex justify-center space-x-4 mb-6">
    <div className="relative max-w-md">
  <Search className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-500" />
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 p-2 border border-gray-300 rounded mb-4 text-black"
  />
</div>
     </div>
 <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 items-center">
        {loading===true? (
          skeletonArray.map((_, index) => <SkeletonCard key={index} />)
        ) : loading===false && eventsData.length > 0? (
          eventsData.map((event) => (
              <EventCard key={event._id || event.id} events={event} />
            ))
          ): (
          <p className="text-center">Sorry, there isn't an event that matches your search.</p>
        )}
      </div>
    </div>
  );
};

export default EventSearchBox;