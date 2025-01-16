import { useEffect, useState } from "react";
import useEventSearch from "./useEventSearch"; 

const useTicketView = () => {
  const [tickets, setTickets] = useState([]);
  const [enrichedTickets, setEnrichedTickets] = useState([]); // Tickets with event details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { eventsData, loading: eventsLoading, errorMessage: eventsError } = useEventSearch();

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/tickets/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setTickets(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Enrich tickets with event details when both tickets and events data are available
  useEffect(() => {
    if (tickets.length > 0 && eventsData.length > 0) {
      const enriched = tickets.map((ticket) => {
        const eventDetails = eventsData.find((event) => event.id === ticket.eventId) || {};
        return { ...ticket, eventDetails };
      });
      setEnrichedTickets(enriched);
    }
  }, [tickets, eventsData]);

  return {
    tickets: enrichedTickets, // Return detailed tickets
    loading: loading || eventsLoading, // Combine loading states
    error: error || eventsError, // Combine errors
  };
};

export default useTicketView;