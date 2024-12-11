export default function HomePage() {
 return (
    <div className="w-full">

      <header className="w-full text-center py-16 bg-gradient-to-b from-[#FFF0F5] to-[#FFE5EB]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF4081] tracking-wider leading-tight">
          Welcome to Idol Nexus
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Connect with your favorite idols, explore exciting events, and join
          the community.
        </p>
        <button className="mt-8 px-8 py-3 bg-[#FF4081] text-white text-sm font-bold rounded-full shadow-md hover:bg-[#E33670] transition">
          Get Started
        </button>
      </header>

      {/* Upcoming Events Section */}
      <section className="py-16 w-full max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
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
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
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
                <button className="mt-4 px-4 py-2 text-sm bg-[#FF4081] text-white rounded-full shadow hover:bg-[#E33670] transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          © 2024 Idol Nexus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}