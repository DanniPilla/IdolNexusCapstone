import useUserView from "../hooks/userPersonalUserView";
import UserDisplayCard from "../components/UserDisplayCard";
import LogoutButton from "../components/LogoutButton";
import LoadingSpinner from "../components/LoadingSpinner";

export default function UserProfile() {
  const { users, loading, error } = useUserView();

  if (loading) return <LoadingSpinner/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="w-full min-h-screen">
      <h1 className="pl-6 text-8xl font-extrabold drop-shadow-lg text-pink-400 text-center mt-[5rem]">
        users
      </h1>
      <UserDisplayCard users={users} />
    </div>

    <LogoutButton />
    </>
  );
}