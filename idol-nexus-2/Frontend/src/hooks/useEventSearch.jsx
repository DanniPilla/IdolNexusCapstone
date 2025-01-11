
import { useState, useEffect } from "react";

const useEventSearch = () => {
  const [eventsData, setEventsData] = useState([]); // All events
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
  const [searchTerm, setSearchTerm] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Debounced search term
  const [errorMessage, setErrorMessage] = useState(null); // Error message

  // Debounce search term to limit frequent re-renders
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const eventDataList = await response.json();
         const normalisedEvents = eventDataList.map((event) => ({
        ...event,
        startDate: event.startDate ? new Date(event.startDate).toISOString() : null, // Ensure ISO 8601 format or null
      }));
        setEventsData(normalisedEvents);
        setFilteredEvents(eventDataList); // Initialise with all events
        setErrorMessage(null); // Clear any previous error
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorMessage("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on debounced search term
  useEffect(() => {
    if (loading) return;

    const term = debouncedSearchTerm.toLowerCase();
    const filtered = eventsData.filter((event) => {
      return (
        event.name.toLowerCase().includes(term) ||
        event.location?.toLowerCase().includes(term) ||
        event.category?.toLowerCase().includes(term)
      );
    });

    setFilteredEvents(filtered);
  }, [debouncedSearchTerm, eventsData, loading]);

  return {
    eventsData, // Full event data
    filteredEvents, // Filtered event data based on search
    setSearchTerm, // Function to update the search term
    searchTerm, // Current search term
    loading, // Loading state
    errorMessage, // Error message
  };
};

export default useEventSearch;