import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    virtualLink: "",
    capacity: 0,
    thumbnailImage: null,
    ticketPrice: 0.0,
    venueName: "",
    venueAddress: "",
    venueCity: "",
    venueCountry: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });

      const response = await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Event creation failed");
      }

      console.log("Event created successfully:", data);
      navigate("/events"); // Redirect to events page
      setError(null); // Clear errors on success
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-2xl lg:w-1/2">
      <h1 className="text-3xl font-bold text-center text-purple-500 mb-4">
        Create an Event
      </h1>
      <form onSubmit={handleCreateEvent} className="space-y-6">
        {/* Event Name */}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter event name"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter event description"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter event category"
          />
        </div>

        {/* Start and End Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900">
              End Date
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            />
          </div>
        </div>

        {/* Venue Details */}
        <div>
          <label htmlFor="venueName" className="block mb-2 text-sm font-medium text-gray-900">
            Venue Name
          </label>
          <input
            type="text"
            id="venueName"
            name="venueName"
            value={formData.venueName}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter venue name"
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="thumbnailImage"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="thumbnailImage"
            name="thumbnailImage"
            accept="image/*"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg py-3 hover:bg-purple-600"
        >
          Create Event
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateEventForm;