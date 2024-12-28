import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";

export default function HomePage() {
  const images = [
    "https://images.squarespace-cdn.com/content/v1/65dd87a5ba1d730583d0b3db/581f140c-aae7-4518-9f04-fc0b99de363c/DSC04286+%281%29.jpg",
    "https://www.tokyoweekender.com/wp-content/uploads/2021/06/Ladybeard-Babybeard-Japan-Tokyo-Weekender.jpg",
    "https://scontent.fbne6-1.fna.fbcdn.net/v/t39.30808-6/334943177_598247811824239_1474274488831979670_n.jpg",
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative">
        <ImageCarousel images={images} />
        {/* Search Bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-700 bg-opacity-90 px-8 py-4 rounded-xl shadow-lg text-white w-3/4 md:w-2/3">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search Event"
              className="flex-grow bg-transparent border-b-2 border-white px-4 py-2 placeholder-white focus:outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="flex-grow bg-transparent border-b-2 border-white px-4 py-2 placeholder-white focus:outline-none"
            />
            <select
              className="bg-transparent border-b-2 border-white px-4 py-2 placeholder-white text-white focus:outline-none"
            >
              <option>Any Date</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="py-16 w-full max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-pink-500 text-center">
          Upcoming Events
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Don’t miss out on these exciting opportunities!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* Event Cards */}
          {[1, 2, 3].map((event) => (
            <div
              key={event}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src="https://via.placeholder.com/300"
                alt="Event"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Idol Showcase 2024
                </h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Date: Jan 15, 2024 <br />
                  Location: Tokyo Dome
                </p>
                <button className="mt-4 px-4 py-2 text-sm bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}