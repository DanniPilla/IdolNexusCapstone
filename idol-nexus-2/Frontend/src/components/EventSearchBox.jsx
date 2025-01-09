import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EventSearchBox = ({ onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Initialize searchTerm from URL params on first render only
  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchTerm(query);
    onFilterChange({ searchTerm: query, location, dateFilter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component mount

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update searchTerm state
    setSearchParams({ query: value }); // Update URL
    onFilterChange({ searchTerm: value, location, dateFilter }); // Notify parent
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    onFilterChange({ searchTerm, location: value, dateFilter });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDateFilter(value);
    onFilterChange({ searchTerm, location, dateFilter: value });
  };

  return (
    <div className="flex flex-wrap gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Event"
        className="flex-grow bg-transparent border-b-2 border-white rounded-xl px-4 py-2 placeholder-white focus:outline-none"
      />
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Location"
        className="flex-grow bg-transparent border-b-2 border-white rounded-xl px-4 py-2 placeholder-white focus:outline-none"
      />
      <select
        value={dateFilter}
        onChange={handleDateChange}
        className="bg-transparent border-b-2 border-white rounded-xl px-4 py-2 placeholder-white text-white focus:outline-none"
      >
        <option value="">Any Date</option>
        <option value="today">Today</option>
        <option value="this_week">This Week</option>
        <option value="this_month">This Month</option>
      </select>
    </div>
  );
};

export default EventSearchBox;