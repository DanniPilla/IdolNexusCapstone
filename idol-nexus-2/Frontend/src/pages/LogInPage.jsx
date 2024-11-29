
import { Helmet } from "react-helmet-async"; 

// save as pages/PostsPage.jsx
export default function LogInPage() {

 return (
    <div
      className="w-full min-h-screen  "
      
    >
       <Helmet>
        <title>Anime Search | Discover Your Favorite Anime</title>
        <meta name="description" content="Find and explore your favorite anime series, characters, and genres. Search and discover anime in an easy and fun way." />
        <meta name="keywords" content="anime, search, favorite anime, discover anime, anime genres, anime series" />
        <meta property="og:title" content="Anime Search | Discover Your Favorite Anime" />
        <meta property="og:description" content="Find and explore your favorite anime series, characters, and genres. Search and discover anime in an easy and fun way." />
        <meta property="og:image" content="/images/anime-og-image.png" />
        <meta property="og:url" content="https://yourwebsite.com/anime" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AnimeSearch" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta name="twitter:title" content="Anime Search | Discover Your Favorite Anime" />
        <meta name="twitter:description" content="Find and explore your favorite anime series, characters, and genres. Search and discover anime in an easy and fun way." />
        <meta name="twitter:image" content="/images/anime-twitter-image.png" />
      </Helmet>
      <h1 className="pl-6 text-8xl font-extrabold drop-shadow-lg text-pink-400 text-center mt-[5rem]">
        Anime
      </h1>

    </div>
  );
}
