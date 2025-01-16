
import { useState, useEffect } from "react";

const useEventSearch = () => {
  const [eventsData, setEventsData] = useState([]); // All events
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    dateFilter: "",
    ticketPrice: "",
    category: "",
  }); // Filters state
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error message

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
        const normalizedEvents = eventDataList.map((event) => ({
          ...event,
          startDate: event.startDate ? new Date(event.startDate).toISOString() : null,
        }));
        setEventsData(normalizedEvents);
        setFilteredEvents(normalizedEvents); // Initialize with all events
        setErrorMessage(null); // Clear previous errors
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorMessage("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on filters
  useEffect(() => {
    if (loading) return;

    const { searchTerm, location, dateFilter, ticketPrice, category } = filters;
    let filtered = eventsData;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((event) =>
        event.venueCity?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (ticketPrice === "free") {
      filtered = filtered.filter((event) =>
        event.ticketPrice <= 0
      );
    }

    if (ticketPrice === "costs") {
       filtered = filtered.filter((event) =>
        event.ticketPrice > 0
      );
    }

    if (category === "ofukai") {
      filtered =filtered.filter((event) =>
        event.category === "Ofukai"
    );
    }

    if (dateFilter === "today") {
      const today = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return (
          eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear()
        );
      });
    }

    if (dateFilter === "this_week") {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      });
    }

    if (dateFilter === "this_month") {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startOfMonth && eventDate <= endOfMonth;
      });
    }

    setFilteredEvents(filtered);
  }, [filters, eventsData, loading]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    eventsData,
    filteredEvents,
    loading,
    errorMessage,
    updateFilters, // Function to update filters dynamically
  };
};

export default useEventSearch;