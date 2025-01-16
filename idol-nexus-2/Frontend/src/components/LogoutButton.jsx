import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LogoutButton = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
    >
      Logout
    </button>
  );
};

export default LogoutButton;