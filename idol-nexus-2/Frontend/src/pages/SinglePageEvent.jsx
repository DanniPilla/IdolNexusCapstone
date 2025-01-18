import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import EventDetailsCard from "../components/EventDetailsCard";

export default function SinglePage() {
  const { eventId } = useParams(); // Extract the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        console.log("fetched data", data)
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full min-h-screen">
      <Helmet>
        <title>{event.name} | Idol Nexus</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={event.name} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.thumbnailImage || "/images/default-event-image.png"} />
        <meta property="og:url" content={`https://IdolNexus.com/api/events/${eventId}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IdolNexus" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.name} />
        <meta name="twitter:description" content={event.description} />
        <meta name="twitter:image" content={event.thumbnailImage || "/images/default-event-image.png"} />
      </Helmet>
    
      <div className="mt-8">
        <EventDetailsCard event={event} />
      </div>
    </div>
  );
}