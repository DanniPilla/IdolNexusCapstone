import SkeletonCard from "./SkeletonCard";
import EventCard from "./EventCard";

const EventsGrid = ({ events, loading }) => {
  // Skeleton array for loading state
  const skeletonArray = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 items-center mt-10">
      {loading
        ? skeletonArray.map((_, index) => <SkeletonCard key={index} />)
        : events.length > 0
        ? events.map((event) => (
            <EventCard key={event.id || event._id} event={event} />
          ))
        : (
          <p className="text-center col-span-full">
            Sorry, there isn't an event that matches your search.
          </p>
        )}
    </div>
  );
};

export default EventsGrid;