import { useState, useEffect } from "react";

const useEventSearch = () => {
  const [eventsData, setEventsData] = useState([]); // All events
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
  const [searchTerm, setSearchTerm] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Debounced search term

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
          console.log("Response Status:", response.status); // Log status code
          console.log("Response:", await response.text()); // Log raw response text
          throw new Error(`Error: ${response.statusText}`);
        }

        const eventDataList = await response.json();
        setEventsData(eventDataList);
        setFilteredEvents(eventDataList); // Initialize with all events
        setLoading(false);
        console.log("Full Response Data:", eventDataList);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on debounced search term
  useEffect(() => {
    const filterEvents = () => {
      if (!debouncedSearchTerm) {
        setFilteredEvents(eventsData); // Reset to all events
        return;
      }

      const filtered = eventsData.filter((event) => {
        return (
          event.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          event.location?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          event.category?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          (event.tags || []).some((tag) =>
            tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
        );
      });

      setFilteredEvents(filtered);
    };

    filterEvents();
  }, [debouncedSearchTerm, eventsData]);

  return {
    eventsData, // Full event data
    filteredEvents, // Filtered event data based on search
    setSearchTerm, // Function to update the search term
    searchTerm, // Current search term
    loading, // Loading state
  };
};

export default useEventSearch;