import usePersonalUserView from "../hooks/usePersonalUserView";
import UserDisplayCard from "../components/UserDisplayCard";
import LogoutButton from "../components/LogoutButton";
import LoadingSpinner from "../components/LoadingSpinner";

export default function UserProfile() {
  const { users, setUsers, loading, error } = usePersonalUserView();

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full min-h-screen">
      <h1 className="text-3xl font-bold text-pink-600 mt-10 mb-5">Your personal profile</h1>
        <UserDisplayCard
      users={users}
      onUpdate={setUsers} // Pass setUsers to update the list
    />
      <LogoutButton />
    </div>
  );
}