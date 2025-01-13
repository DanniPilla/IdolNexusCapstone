const EventDetailsCard = ({ event }) => {
  const startDate = event.startDate ? new Date(event.startDate) : null;
  const endDate = event.endDate ? new Date(event.endDate) : null;

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Event Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {event.name}
          </h1>
          <p className="text-gray-500">{event.category}</p>
        </div>

        {/* Image */}
        <div className="mx-auto mt-6 max-w-2xl">
          <img
            src={event.thumbnailImage || "default-thumbnail.jpg"}
            alt={event.name}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="mt-8 px-4">
          <p className="text-gray-700">{event.description}</p>
          {startDate && (
            <p className="text-gray-500 mt-4">
              Start: {startDate.toLocaleString()}
            </p>
          )}
          {endDate && (
            <p className="text-gray-500">
              End: {endDate.toLocaleString()}
            </p>
          )}
          <p className="text-gray-500 mt-2">
            Ticket Price: {event.ticketPrice ? `$${event.ticketPrice}` : "Free"}
          </p>
          {event.venueName && (
            <p className="text-gray-500 mt-2">
              Venue: {event.venueName}, {event.venueAddress}, {event.venueCity},{" "}
              {event.venueCountry}
            </p>
          )}
          {event.virtualLink && (
            <p className="text-gray-500 mt-2">
              Virtual Link:{" "}
              <a
                href={event.virtualLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Join Here
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;