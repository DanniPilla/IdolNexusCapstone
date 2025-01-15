
const TicketCard = ({tickets}) => {


  return (
    <div>
      <h1>Your Tickets</h1>
      {tickets?.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <strong>Event:</strong> {ticket.eventId} <br />
              <strong>Type:</strong> {ticket.ticketType} <br />
              <strong>Quantity:</strong> {ticket.quantity} <br />
              <strong>Price:</strong> ${ticket.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default TicketCard;