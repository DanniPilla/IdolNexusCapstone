import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import useEventSearch from "../hooks/useEventSearch";
import EventCard from "./EventCard";
import SkeletonCard from "./SkeletonCard";

const EventSearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { eventsData, setSearchTerm, searchTerm, loading } = useEventSearch();

  // Initialize searchTerm from URL params (if available)
  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchTerm(query);
  }, [searchParams, setSearchTerm]);

  // Skeleton array for loading state
  const skeletonArray = Array.from({ length: 10 }, (_, i) => i);

  // Handle search term changes and update URL params
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams({ query: value });
  };

  return (
    <div className="p-4">
      {/* Search Box */}
      <div className="flex justify-center space-x-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 p-2 border border-gray-300 rounded text-black"
            placeholder="Search events..."
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 items-center">
        {loading
          ? skeletonArray.map((_, index) => <SkeletonCard key={index} />)
          : eventsData.length > 0
          ? eventsData.map((event) => (
              <EventCard key={event.id || event._id} events={event} />
            ))
          : (
            <p className="text-center col-span-full">
              Sorry, there isn't an event that matches your search.
            </p>
          )}
      </div>
    </div>
  );
};

export default EventSearchBox;