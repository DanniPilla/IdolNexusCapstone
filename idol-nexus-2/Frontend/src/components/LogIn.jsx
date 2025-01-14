import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { useUser } from "../context/UserContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Login successful:", data);

      // Save the JWT token to localStorage
      localStorage.setItem("token", data.token);

      // Save user information in the context
      setUser(data.user);

      // Redirect to the home page
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12 lg:px-16 rounded-l-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto rotate-45"
          src="light-stick (2).png"
          alt="Idol nexus"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-pink-500">
          Welcome back!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">Sign in to your account</p>
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleEmailSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm"
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
