import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import useFetch from "../hooks/useFetch";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestOptions, setRequestOptions] = useState(null);
  const { setUser, setToken } = useUser(); // Include setToken here
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    requestOptions?.endpoint,
    requestOptions?.options,
    [requestOptions]
  );

  const handleEmailSignIn = (e) => {
    e.preventDefault();

    setRequestOptions({
      endpoint: "http://localhost:5000/api/users/login",
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    });
  };

  // Handle login response
  useEffect(() => {
    if (data) {
      console.log("Login successful:", data);

      // Use handleLogin to store token and user in the context and localStorage
      setUser(data.user);
      setToken(data.token); // Now properly using setToken from UserContext
      console.log("Token and user saved successfully.");

      // Redirect to the home page
      navigate("/");
    }
  }, [data, navigate, setUser, setToken]);

  return (
    <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12 lg:px-16 rounded-l-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto rotate-45"
          src="light-stick (2).png"
          alt="Idol Nexus"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-pink-500">
          Welcome back!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
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
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

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