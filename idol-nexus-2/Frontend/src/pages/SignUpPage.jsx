import { Helmet } from "react-helmet-async";
import ImageCarousel from "../components/ImageCarousel"; // Ensure this is imported correctly

export default function SignUpPage() {
  const images = [
    "https://www.j-popproject.com/wp-content/uploads/2021/11/image7-1.jpg",
    "https://i.pinimg.com/236x/8c/4d/3a/8c4d3a4a4815c1cef6489ca0f0629b43.jpg",
    "https://static.wikia.nocookie.net/jpop/images/a/a9/Kyotoflavor_Jul2021.jpg/revision/latest?cb=20210802200252",
  ];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
      {/* Helmet Meta Tags */}
      <Helmet>
        <title>Sign Up | Idol Nexus</title>
        <meta
          name="description"
          content="Create your account and join the Idol Nexus community!"
        />
      </Helmet>

      {/* Left Section - Image Carousel */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-gray-100">
        <ImageCarousel images={images} />
      </div>

      {/* Right Section - Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-2xl lg:w-1/2">
        <h1 className="text-3xl font-bold text-center text-purple-500 mb-4">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Join Idol Nexus and connect with your favorite local Idols!
        </p>

        <form className="space-y-6" action="/api/signup" method="POST">
          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-label="Enter your email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              placeholder="Enter your email"
            />
          </div>

          {/* First and Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                aria-label="Enter your first name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                aria-label="Enter your last name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                aria-label="Enter your password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                aria-label="Confirm your password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <label
              htmlFor="profilePicture"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              aria-label="Upload your profile picture"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              aria-label="Enter your phone number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              placeholder="123-456-7890"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg py-3 hover:bg-purple-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}