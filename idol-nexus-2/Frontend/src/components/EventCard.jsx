const EventCard = ({ events }) => {
  return (
    <a
      href={events.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105"
      style={{
        display: "block",
        maxWidth: "100%",
      }}
    >
      <div className="w-full h-full">
        <img
          src={events.image}
          alt={events.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />

        <div className="p-6 bg-pink-300 rounded-b-lg">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold pb-5">{events.name}</h2>
          <p className="text-sm sm:text-base lg:text-lg"><strong>Date: </strong>{new Date(events.date).toLocaleString()}</p>
          <p className="text-sm mb-2 sm:text-base lg:text-lg"><strong>Location: </strong>{events.location}</p>
          <p className="text-sm mb-2 sm:text-base lg:text-lg">{events.price}</p>
        </div>
      </div>
    </a>
  );
};

export default EventCard;