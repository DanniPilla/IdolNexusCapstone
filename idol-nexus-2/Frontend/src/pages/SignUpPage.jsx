import { Helmet } from "react-helmet-async";
import ImageCarousel from "../components/ImageCarousel"; // Ensure this is imported correctly
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  const images = [
    "https://www.j-popproject.com/wp-content/uploads/2021/11/image7-1.jpg",
    "https://i.pinimg.com/236x/8c/4d/3a/8c4d3a4a4815c1cef6489ca0f0629b43.jpg",
    "https://static.wikia.nocookie.net/jpop/images/a/a9/Kyotoflavor_Jul2021.jpg/revision/latest?cb=20210802200252",
  ];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center">
      {/* Helmet Meta Tags */}
      <Helmet>
        <title>Sign Up | Idol Nexus</title>
        <meta
          name="description"
          content="Create your account and join the Idol Nexus community!"
        />
      </Helmet>

      {/* Left Section - Image Carousel */}
      <div className="hidden lg:flex w-full lg:w-1/2 ">
        <ImageCarousel images={images} />
      </div>

      {/* Right Section - Form */}
      <SignUpForm/>
    </div>
  );
}