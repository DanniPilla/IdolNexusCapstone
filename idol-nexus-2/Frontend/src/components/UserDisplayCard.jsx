import { PenIcon } from "lucide-react"

const UserDisplayCard = ({ users = [] }) => {
  if (!users.length) {
    return <p>No user data available.</p>; 
  }

  return (
    <div className="flex flex-col items-center">
      {/* User Info Card */}
      {users.map((user) => (
        <div
          className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg text-gray-800 p-4"
          key={user.id}
        >
          {/* Edit Icon */}
          <button
            className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-2 hover:bg-purple-600 transition-colors"
            // onClick=
          >
            <PenIcon className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={user.profilePicture || "https://via.placeholder.com/200"}
              alt="Profile Picture"
              className="rounded-lg border-4 border-purple-500 shadow-md mb-4 sm:mb-0 sm:mr-6 w-40 h-40 object-cover"
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">
                {user.displayName || "Idol Name"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p>
                  <span className="font-semibold">Idol Group:</span>{" "}
                  {user.organisationName || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Birthday:</span>{" "}
                  {user.birthday || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Height:</span>{" "}
                  {user.height || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Call and Response:</span>{" "}
                  {user.callAndResponse || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Hobby:</span>{" "}
                  {user.hobby || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Favorite Food:</span>{" "}
                  {user.favoriteFood || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Favorite Color:</span>{" "}
                  {user.favoriteColor || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Badges Row */}
      <div className="flex overflow-x-auto mt-6 mb-6 space-x-4">
        <button className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1435/1435715.png"
            alt="Character 1"
            className="rounded-full"
          />
        </button>
        <button className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1435/1435715.png"
            alt="Character 2"
            className="rounded-full"
          />
        </button>
        <button className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1435/1435715.png"
            alt="Character 3"
            className="rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default UserDisplayCard;