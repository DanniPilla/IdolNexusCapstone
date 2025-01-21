import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profilePicture: null,
    phoneNumber: "",
    role: "attendee", // Default role
    websiteUrl: "",
    socialLinks: "",
    organisationName: "",
    bio: "",
    displayName: "",
  });
  const [error, setError] = useState(null);
   const { setUser } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password, // Password will be hashed on the server
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      profilePicture: formData.profilePicture || null, // File handling on server-side
      displayName: formData.displayName,
      organisationName: formData.organisationName,
    bio: formData.bio,

    };

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log("Registration successful:", data);
      setUser(data.user);
      // Redirect to the home page
      navigate("/");
      setError(null); // Clear errors on success
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-2xl lg:w-1/2">
      <h1 className="text-3xl font-bold text-center text-purple-500 mb-4">
        Create Your Account
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Join Idol Nexus and connect with your favorite local Idols!
      </p>

      <form
        onSubmit={handleSignUp}
        className="space-y-6"
        action="/api/users/register"
        method="POST"
      >
        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-label="Enter your email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            required
            aria-label="IdolPower!"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="IdolPower!"
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
              value={formData.firstName}
              onChange={handleInputChange}
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
              value={formData.lastName}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
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
              value={formData.confirmPassword}
              onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            value={formData.phoneNumber}
            onChange={handleInputChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            aria-label="Enter your phone number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="123-456-7890"
          />
        </div>
<div>
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="attendee">Attendee</option>
            <option value="organiser">Organiser</option>
          </select>
        </div>

        {/* Conditional Inputs for Organisers */}
        {formData.role === "organiser" && (
          <>
            <div>
              <label htmlFor="organisationName" className="block mb-2 text-sm font-medium text-gray-900">
                Organisation Name
              </label>
              <input
                type="text"
                id="organisationName"
                name="organisationName"
                value={formData.organisationName}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter your organisation name"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter a short bio"
              />
            </div>
          </>
        )}

        {/* Website URL */}
        <div>
          <label htmlFor="websiteUrl" className="block mb-2 text-sm font-medium text-gray-900">
            Website URL
          </label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="https://example.com"
          />
        </div>

        {/* Social Links */}
        <div>
          <label htmlFor="socialLinks" className="block mb-2 text-sm font-medium text-gray-900">
            Social Links 
          </label>
          <textarea
            id="socialLinks"
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder='{"facebook": "url", "instagram": "url"}'
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg py-3 hover:bg-purple-600"
        >
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;

