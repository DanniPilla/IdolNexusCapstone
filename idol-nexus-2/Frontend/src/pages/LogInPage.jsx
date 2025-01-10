import { Helmet } from "react-helmet-async";
import ImageCarousel from "../components/ImageCarousel"
import LogIn from "../components/LogIn"


export default function LogInPage() {
  const images = [
    "https://www.j-popproject.com/wp-content/uploads/2021/11/image7-1.jpg",
    "https://i.pinimg.com/236x/8c/4d/3a/8c4d3a4a4815c1cef6489ca0f0629b43.jpg",
    "https://static.wikia.nocookie.net/jpop/images/a/a9/Kyotoflavor_Jul2021.jpg/revision/latest?cb=20210802200252"
  ];
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
<LogIn/>
      </div>
  );
}

// 