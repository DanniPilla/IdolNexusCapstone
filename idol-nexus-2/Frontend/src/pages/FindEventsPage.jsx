
import { Helmet } from "react-helmet-async"; 
import EventSearchBox from '../components/EventSearchBox';
import EventsGrid from "../components/EventsGrid";
import useEventSearch from "../hooks/useEventSearch";
import { useEffect, useState } from "react";
// save as pages/PostsPage.jsx
export default function FindEventPage() {
const { eventsData, loading } = useEventSearch();
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  const handleFilterChange = ({ searchTerm, location, dateFilter }) => {
    let filtered = eventsData;

    // Filter logic
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (location) {
      filtered = filtered.filter((event) =>
        event.location?.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (dateFilter === "today") {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        const today = new Date();
        return (
          eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear()
        );
      });
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    setFilteredEvents(eventsData);
  }, [eventsData]);

 return (
<div>
       <Helmet>
        <title>Anime Search | Discover Your Favorite Anime</title>
        <meta name="description" content="Find and explore your favorite anime series, characters, and genres. Search and discover anime in an easy and fun way." />
        <meta name="keywords" content="anime, search, favorite anime, discover anime, anime genres, anime series" />
        <meta property="og:title" content="Anime Search | Discover Your Favorite Anime" />
        <meta property="og:description" content="Find and explore your favorite anime series, characters, and genres. Search and discover anime in an easy and fun way." />
        <meta property="og:image" content="/images/anime-og-image.png" />
        <meta property="og:url" content="https://yourwebsite.com/anime" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AnimeSearch" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta name="twitter:title" content="Anime Search | Discover Your Favorite Anime" />
        <meta name="twitter:description" content="Find and explore your favorite anime series, characters, and genres. Search and discover anime in an easy and fun way." />
        <meta name="twitter:image" content="/images/anime-twitter-image.png" />
      </Helmet>
      
<div className="w-full">
    
       

      {/* Upcoming Events Section */}
      <section className="py-16 w-full max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-pink-500 text-center">
          Find events for you
        </h2>
        <p className="text-gray-500 text-center mt-2">
          These idols can't wait to meet you!
        </p>
         <div className=" bg-purple-700 px-8 py-4 rounded-xl shadow-lg text-white mt-6">
          <EventSearchBox onFilterChange={handleFilterChange} />
        
      </div>
        <EventsGrid events={filteredEvents} loading={loading} />
      </section>
    </div>
    </div>
    
  );
}
