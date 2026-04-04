import NewsSection from "../components/news/NewsSection";
import NotificationToast from "../components/news/NotificationToast.jsx";
import HeroSearch from "../components/home/HeroSearch";
import OurProcess from "../components/home/OurProcess";
import NewsletterSection from "../components/home/NewsletterSection";
import TopCoursesSection from "../components/home/TopCoursesSection";
import StatsSection from "../components/home/StatsSection";
import HiringPartners from "../components/common/HiringPartners";
import WhyChooseUs from "../components/home/WhyChooseUs";
import WhoWeAre from "../components/home/WhoWeAre";
import StudyGoalSection from "../components/home/StudyGoalSection";
import TopStudyPlaces from "../components/home/TopStudyPlaces";
import TestimonialSection from "../components/home/TestimonialOrbitGSAP";
import HomeInstitutesSection from "../components/home/HomeInstitutesSection";
import BlogCard from "../components/home/BlogCard";
import { LayoutGrid, CircleStar } from "lucide-react";

const Home = () => {
  // loader

  return (
    <>
      {/* Hero / Banner */}
      {/* Other home sections */}
      <NotificationToast />
      <HeroSearch />
      <StudyGoalSection />
      <WhoWeAre />
      <HomeInstitutesSection
        title="Explore Top Colleges In India By State"
        filterType="state"
        filters={[
          { name: "All", label: "All States", icon: LayoutGrid },
          { name: "Bihar", label: "Bihar", icon: CircleStar },
          { name: "Delhi", label: "Delhi", icon: CircleStar },
          { name: "Maharashtra", label: "Maharashtra", icon: CircleStar },
        ]}
      />
      {/* Explore top colleges by state */}
      <WhyChooseUs />
      <StatsSection />
      <HiringPartners />
      {/* Explore top colleges by stream */}
      {/* Explore top colleges by stream */}
      <HomeInstitutesSection
        title="Explore Colleges By Stream"
        filterType="stream"
        filters={[
          { name: "All", label: "All Streams", icon: LayoutGrid },
          { name: "Engineering", label: "Engineering", icon: CircleStar },
          { name: "Medical", label: "Medical", icon: CircleStar },
          { name: "Management", label: "Management", icon: CircleStar },
        ]}
      />
      <OurProcess />
      <TopStudyPlaces />
      <TestimonialSection />
      <NewsSection />
      <TopCoursesSection />
      {/* <Blog/> */}
      <BlogCard />
      <NewsletterSection />

      {/* Other sections if any */}
    </>
  );
};

export default Home;
