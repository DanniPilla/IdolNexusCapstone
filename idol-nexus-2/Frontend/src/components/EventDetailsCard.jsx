import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"
import { useNavigate} from "react-router-dom";

const EventDetailsCard = ({ event }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedDate, setSelectedDate] = useState(event.startDate);
  const [selectedTicketType, setSelectedTicketType] = useState("General Admission");
 const navigate = useNavigate();
  const handleAddToCart = () => {
    const ticket = {
      id: event.id,
      eventName: event.name,
      ticketType: selectedTicketType,
      price: event.ticketPrice || 0,
      date: selectedDate,
      thumbnail: event.thumbnailImage || "default-thumbnail.jpg",
    };
 navigate("/cart");
  console.log("Adding to cart:", ticket); 
    addToCart(ticket);
  };

  const startDate = event.startDate ? new Date(event.startDate) : null;

  return (
    <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">{event.name}</h1>
        <p className="text-sm text-gray-500">{event.category}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="relative flex justify-center items-center">
          <img
            src={event.thumbnailImage || "default-thumbnail.jpg"}
            alt={event.name}
            className="w-full h-auto rounded-lg object-cover shadow-md"
          />
          <button
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-pink-100"
            aria-label="Save Event"
          >
            ❤️
          </button>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-purple-700">{event.venueName}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {event.venueAddress}, {event.venueCity}, {event.venueCountry}
            </p>
            <p className="text-lg font-bold text-pink-600 mt-4">
              ${event.ticketPrice || "Free"}
            </p>
            <p className="text-gray-500 text-sm mt-2">{event.description}</p>
          </div>

          {/* Selectors */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-700 font-medium">Date</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 text-sm"
              >
                {startDate && <option>{startDate.toLocaleDateString()}</option>}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-700 font-medium">Ticket Type</label>
              <select
                value={selectedTicketType}
                onChange={(e) => setSelectedTicketType(e.target.value)}
                className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 text-sm"
              >
                <option>General Admission</option>
                <option>VIP</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg mt-6 hover:from-purple-600 hover:to-pink-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Organiser Info */}
      <div className="mt-8 border-t border-gray-300 pt-4">
        <details className="group">
          <summary className="text-gray-700 font-medium flex justify-between items-center cursor-pointer">
            More from this Organiser
            <span className="text-pink-500 group-open:rotate-180 transform transition">
              ▼
            </span>
          </summary>
          <p className="text-sm text-gray-500 mt-2">
            Melody Parade is an Australian Idol group made of 4 members:
            Marmalade, Pip, Tea, and Pepia.
          </p>
        </details>
      </div>
    </div>
  );
};

export default EventDetailsCard;