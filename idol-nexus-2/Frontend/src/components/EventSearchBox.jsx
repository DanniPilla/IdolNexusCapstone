import { useState } from "react";

const EventSearchBox = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update search term state
    onFilterChange({ searchTerm: value, location: city, dateFilter }); // Notify parent
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value); // Update city state
    onFilterChange({ searchTerm, location: value, dateFilter }); // Notify parent
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDateFilter(value); // Update date filter state
    onFilterChange({ searchTerm, location: city, dateFilter: value }); // Notify parent
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
        value={city}
        onChange={handleCityChange}
        placeholder="City"
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