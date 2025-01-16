const TicketCard = ({ tickets }) => {

 
   
  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-fuchsia-500 mb-6 text-center">Your Tickets</h1>

      {tickets?.length > 0 ? (
        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 bg-white border rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              {/* Event Thumbnail */}
              <div className="flex-shrink-0 w-full md:w-1/3">
                <img
                  src={ticket.eventDetails.thumbnailImage || "default-thumbnail.jpg"}
                  alt={ticket.eventDetails.name || "Event Image"}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>

              {/* Ticket Details */}
              <div className="flex flex-col justify-between w-full">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  {ticket.eventDetails.name || "Unknown Event"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {ticket.eventDetails.venueName}, {ticket.eventDetails.venueCity}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Date: {ticket.eventDetails.startDate ? new Date(ticket.eventDetails.startDate).toLocaleString() : "TBA"}
                </p>
                <p className="text-gray-700 text-sm mt-4">
                  <strong>Type:</strong> {ticket.ticketType}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Quantity:</strong> {ticket.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No tickets found.</p>
      )}
    </div>
  );
};

export default TicketCard;
