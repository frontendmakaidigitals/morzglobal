import ContactForm from "@/pages/home/form";
import BlogSection from "@/pages/home/blogs";
import FeaturesSection from "@/pages/home/features";
import Specialties from "@/pages/home/offering";
import AreasOfExpertise from "@/pages/home/expertise";
import AboutSection from "@/pages/home/whoweare";
import HeroSection from "@/pages/home/hero-section";
import TextMarquee from "@/pages/home/text-marquee";
import ServicesOverview from "@/pages/home/service-overview";
import ServicesGrid from "@/pages/home/serviice";
import LogoMarquee from "@/pages/home/logo-marquee";
const Page = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <LogoMarquee />
      <ServicesOverview />
      <TextMarquee />
      <ServicesGrid />
      <BlogSection />
      <ContactForm />
    </>
  );
};

export default Page;
