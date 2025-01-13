import { Link } from "react-router-dom";
import { BadgeDollarSign } from "lucide-react";
import { MapPin } from "lucide-react";

const EventCard = ({ event }) => {
  return (
    <Link
      to={`/events/${event.id}`} 
      className="block bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg overflow-hidden"
    
    >
      <div className="relative">
        {/* Image Section */}
        <img
          src={event.thumbnailImage}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        {/* Overlay Date Section */}
        <div className="absolute top-2 left-2 bg-white text-center px-3 py-1 rounded-lg shadow-md">
          <p className="text-sm font-semibold text-gray-600">
            {new Date(event.startDate).toLocaleString("en-US", {
              month: "short",
            })}
          </p>
          <p className="text-lg font-extrabold text-gray-800">
            {new Date(event.startDate).getDate()}
          </p>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{event.name}</h2>
        <p className="text-sm text-indigo-500 mb-3 flex items-center gap-1">
          <MapPin />
          {event.venueName || "Online"}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-pink-500 font-semibold flex items-center gap-1">
            <BadgeDollarSign />
            {event.ticketPrice ? `$${event.ticketPrice}` : "Free"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;