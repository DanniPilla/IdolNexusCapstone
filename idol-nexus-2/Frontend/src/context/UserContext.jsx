import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Wrap setToken to store the token in localStorage
  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const handleLogin = (userData, token) => {
    updateToken(token); // Use the wrapped updateToken function
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    updateToken(null); // Clear the token in both state and localStorage
  };

  useEffect(() => {
    const validateUser = async () => {
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
          if (Array.isArray(userData) && userData.length > 0) {
            setUser(userData[0]);
          } else {
            console.error("Invalid user data received:", userData);
            handleLogout();
          }
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Error validating user:", error);
        handleLogout();
      }
    };

    validateUser();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken: updateToken, // Expose the wrapped updateToken function
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);