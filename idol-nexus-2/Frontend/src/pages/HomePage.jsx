import ImageCarousel from "../components/ImageCarousel";
import EventSearchBox from "../components/EventSearchBox";
import EventsGrid from "../components/EventsGrid";
import useEventSearch from "../hooks/useEventSearch";

export default function HomePage() {
  const images = [
    "https://www.j-popproject.com/wp-content/uploads/2021/11/image7-1.jpg",
    "https://images.squarespace-cdn.com/content/v1/65dd87a5ba1d730583d0b3db/581f140c-aae7-4518-9f04-fc0b99de363c/DSC04286+%281%29.jpg",
    "https://www.tokyoweekender.com/wp-content/uploads/2021/06/Ladybeard-Babybeard-Japan-Tokyo-Weekender.jpg",
    ,
  ];

  const { filteredEvents, loading, updateFilters } = useEventSearch();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative">
        <ImageCarousel images={images} />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-700 px-8 py-4 rounded-xl shadow-lg text-white w-3/4 md:w-2/3">
          <EventSearchBox onFilterChange={updateFilters} />
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="py-16 w-full max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-pink-500 text-center">
          Upcoming Events
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Don’t miss out on these exciting opportunities!
        </p>
        <EventsGrid events={filteredEvents} loading={loading} />
      </section>
    </div>
  );
}