import useUserView from "../hooks/useUserView";
import UserDisplayCard from "../components/UserDisplayCard";

export default function TicketsPage() {
  const { users, loading, error } = useUserView();

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full min-h-screen">
      <h1 className="pl-6 text-8xl font-extrabold drop-shadow-lg text-pink-400 text-center mt-[5rem]">
        users
      </h1>
      <UserDisplayCard users={users} />
    </div>
  );
}