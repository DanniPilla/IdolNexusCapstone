const EventCard = ({ event }) => {
  return (
    <a
      href={event.virtualLink || "#"} // Use `virtualLink` if available
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg overflow-hidden"
    >
      <div className="flex h-full">
        {/* Date Section */}
        <div className="flex-shrink-0 bg-pink-500 text-white p-4 text-center">
          <p className="text-lg font-bold">
            {new Date(event.startDate).toLocaleString("en-US", {
              month: "short",
            })}
          </p>
          <p className="text-3xl font-extrabold">
            {new Date(event.startDate).getDate()}
          </p>
          <p className="text-sm">
            {new Date(event.startDate).toLocaleString("en-US", {
              year: "numeric",
            })}
          </p>
        </div>

        {/* Event Details Section */}
        <div className="flex-grow">
          <img
            src={event.thumbnailImage}
            alt={event.name}
            className="w-full h-40 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {event.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Location: </strong>
              {event.location || "TBA"}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Category: </strong>
              {event.category}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Tags: </strong>
              {event.tags?.join(", ") || "No tags"}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-pink-500 font-semibold">
                {event.price ? `$${event.price}` : "Free"}
              </p>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default EventCard;