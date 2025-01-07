import { useState } from "react";
import { signInWithEmail, signInWithGoogle } from "../firebase/firebase"; // Auth functions from Firebase setup
import { Helmet } from "react-helmet-async";
import ImageCarousel from "../components/ImageCarousel"

 const images = [
    "https://www.j-popproject.com/wp-content/uploads/2021/11/image7-1.jpg",
    "https://i.pinimg.com/236x/8c/4d/3a/8c4d3a4a4815c1cef6489ca0f0629b43.jpg",
    "https://static.wikia.nocookie.net/jpop/images/a/a9/Kyotoflavor_Jul2021.jpg/revision/latest?cb=20210802200252"
  ];
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmail(email, password);
      console.log("Signed in with email:", user);
      // Handle successful sign-in 
    } catch (err) {
      console.error("Error signing in with email:", err);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in with Google:", user);
      // Handle successful sign-in 
    } catch (err) {
      console.error("Error signing in with Google:", err);
      setError(err.message);
    }
  };

  return (
  <div className="flex min-h-screen">
      <Helmet>
        <title>Sign In | Idol Nexus</title>
        <meta name="description" content="Sign in to your Idol Nexus account." />
      </Helmet>

      {/* Left Section - Background Image */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-screen">
        <ImageCarousel images={images} />
      </div>

      {/* Right Section - Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 bg-pink-200 px-8 py-12 lg:px-16 rounded-l-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-16 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome back!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Sign in to your account</p>
          {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleEmailSignIn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email or phone number
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

          <div className="mt-8">
            <button
              onClick={handleGoogleSignIn}
              className="w-full rounded-lg bg-white border border-gray-300 px-4 py-2 flex items-center justify-center text-sm text-gray-900 hover:bg-gray-50"
            >
              <img
                className="h-5 w-5 mr-2"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google"
              />
              Sign in with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;