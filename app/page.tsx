import ContactForm from "@/pages/home/form";
import BlogSection from "@/pages/home/blogs";
import FeaturesSection from "@/pages/home/features";
import Specialties from "@/pages/home/offering";
import AreasOfExpertise from "@/pages/home/expertise";
import AboutSection from "@/pages/home/whoweare";
import HeroSection from "@/pages/home/hero-section";
const Page = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AreasOfExpertise />
      <BlogSection />
      <FeaturesSection />
      <Specialties />
      <ContactForm />
    </>
  );
};

export default Page;
