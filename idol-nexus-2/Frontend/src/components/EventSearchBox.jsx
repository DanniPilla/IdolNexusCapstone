import { useState, useEffect } from "react";

const EventSearchBox = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [category, setCategory] = useState("");

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

  
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setTicketPrice(value); // Update date filter state
    onFilterChange({ searchTerm, location: city, dateFilter: value, ticketPrice: value }); // Notify parent
  };

  
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value); // Update date filter state
   
  };

 useEffect(() => {
    onFilterChange({ category });
  }, [category]); 
  

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
        className=" bg-transparent border-b-2 border-white rounded-xl px-4 py-2  text-white focus:outline-none"
      >
        <option value="">Any Date</option>
        <option value="today">Today</option>
        <option value="this_week">This Week</option>
        <option value="this_month">This Month</option>
      </select>

      <select
        value={ticketPrice}
        onChange={handlePriceChange}
        className=" bg-transparent border-b-2 border-white rounded-xl px-4 py-2  text-white focus:outline-none"
      placeholder="Price"
      >
         <option value="" disabled hidden className="text-gray-400">
    Price
  </option>
   <option value="">Any</option>
  <option value="free">Free</option>
  <option value="0-20">$0-$20</option>
  <option value="20-50">$20-$50</option>
</select>
      <select
        value={category}
        onChange={handleCategoryChange}
        placeholder="Category"     
        className=" bg-transparent border-b-2 border-white rounded-xl px-4 py-2  text-white focus:outline-none"

     >
        <option value="" disabled hidden className="text-gray-400">
    Category
  </option>
  <option value="">All</option>
  <option value="ofukai">Ofukai</option>
  <option value="debut">Debut</option>
  <option value="graduation">Graduation</option>
  <option value="taiban">Taiban</option>
  <option value="birthday">Birthday</option>
  <option value="online">Online</option>
      </select>
    </div>
  );
};

export default EventSearchBox;