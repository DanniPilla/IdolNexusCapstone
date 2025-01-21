import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Sync localStorage whenever user or token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, token]);

  // Validate user token on mount
  useEffect(() => {
    const validateUser = async () => {
      if (!token) return; // Do nothing if no token is available

      try {
        const response = await fetch("http://localhost:5000/api/users/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData[0] || null); // Handle cases where the array is empty
        } else {
          console.error("Token validation failed:", await response.json());
          handleLogout(); // Log out if the token is invalid
        }
      } catch (error) {
        console.error("Error validating user:", error);
        handleLogout(); // Log out on network errors
      }
    };

    validateUser();
  }, [token]); // Re-run only if token changes

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);