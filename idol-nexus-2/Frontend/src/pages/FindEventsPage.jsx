import { Helmet } from "react-helmet-async";
import EventSearchBox from "../components/EventSearchBox";
import EventsGrid from "../components/EventsGrid";
import useEventSearch from "../hooks/useEventSearch";
import UserDisplayCard from "../components/UserDisplayCard";

export default function FindEventPage() {
  const { filteredEvents, loading, updateFilters } = useEventSearch();

  return (
    <div>
      <Helmet>
        <title>Find Events | Discover Your Favorite Idols</title>
        <meta
          name="description"
          content="Explore and find events for your favorite idols. Discover exciting opportunities to meet idols near you."
        />
        <meta
          name="keywords"
          content="idols, events, meet idols, discover events, idol events"
        />
        <meta property="og:title" content="Find Events | Discover Your Favorite Idols" />
        <meta
          property="og:description"
          content="Explore and find events for your favorite idols. Discover exciting opportunities to meet idols near you."
        />
        <meta property="og:image" content="/images/events-og-image.png" />
        <meta property="og:url" content="https://yourwebsite.com/find-events" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EventFinder" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta
          name="twitter:title"
          content="Find Events | Discover Your Favorite Idols"
        />
        <meta
          name="twitter:description"
          content="Explore and find events for your favorite idols. Discover exciting opportunities to meet idols near you."
        />
        <meta name="twitter:image" content="/images/events-twitter-image.png" />
      </Helmet>

      <div className="w-full">
        <section className="py-16 w-full max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-pink-500 text-center">
            Find Events for You
          </h2>
          <p className="text-gray-500 text-center mt-2">
            These idols can't wait to meet you!
          </p>
          <div className="bg-purple-700 px-8 py-4 rounded-xl shadow-lg text-white mt-6">
            <EventSearchBox onFilterChange={updateFilters} />
          </div>
          <EventsGrid events={filteredEvents} loading={loading} />
        </section>
      </div>
      <UserDisplayCard/>
    </div>
  );
}