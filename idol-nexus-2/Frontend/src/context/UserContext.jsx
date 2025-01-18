import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/users/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData[0]); // Assuming the API returns an array with one user
        } else {
          handleLogout(); // Log out if the token is invalid or expired
        }
      } catch (error) {
        console.error("Error validating user:", error);
        handleLogout();
      }
    };

    validateUser();
  }, []); // Run once on page load

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);