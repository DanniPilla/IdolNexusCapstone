import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LogoutButton = () => {
  const { handleLogout } = useUser();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); // Use the context method to clear user and token
    navigate("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogoutClick}
      className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
    >
      Logout
    </button>
  );
};

export default LogoutButton;