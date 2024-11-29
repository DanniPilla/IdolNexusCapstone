
export default function HomePage(){

 return (
    <div
      className="w-full min-h-screen  flex flex-col justify-center items-center "
    
    >
      <h1 className="text-center mt-[5rem]">
       Welcome to<div className="pl-6 text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-pink-600 drop-shadow-lg">
        <p>
          <span className="text-pink-400">Anime</span>
          <span className=" text-pink-700">Finder</span>
        </p>
      </div> 
      </h1>
  <p className="text-center mt-[2rem]">
        Discover your favorite anime, explore genres, and build your watchlist.
        Dive into the world of anime with just a few clicks!
      </p>
      <img className="mt-[2rem] " src="https://64.media.tumblr.com/6fb49796364519b50627ef20d1ee9bfd/989ae70bbd8fd464-61/s500x750/bf1ba1d902fe3b62ef611e4ecee843fa8417cdeb.gifv"/>
    </div>
  );
}