import { useState, useEffect } from "react";

const useEventsList = () => {
  const [eventsData, setEventsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

 useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
 
const fetchEvents = async () => {
    
  try {
    const response = await fetch('http://localhost:5000/events');
    if (!response.ok) {
         console.log("Response Status:", response.status);  // Log status code
      console.log("Response:", await response.text());  // Log raw response text
      throw new Error(`Error: ${response.statusText}`);
    }

    const eventDataList = await response.json(); 
     setEventsData(eventDataList);
        setLoading(false);
    console.log("Full Response Data:", eventDataList);
   
  } catch (error) {
    console.error('Error fetching anime:', error);
    setLoading(false);
  }
};  fetchEvents();
  }, []);

    return {
    eventsData,
    setSearchTerm,
    searchTerm,
    loading,
  };
};
  export default useEventsList


