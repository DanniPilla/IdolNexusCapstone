import useTicketView from "../hooks/useTicketView";
import TicketCard from "../components/TicketCard";

export default function TicketsPage() {
  const { tickets, loading, error } = useTicketView();

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full min-h-screen">
      <h1 className="pl-6 text-8xl font-extrabold drop-shadow-lg text-pink-400 text-center mt-[5rem]">
        Tickets
      </h1>
      <TicketCard tickets={tickets} />
    </div>
  );
}