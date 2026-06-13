import Footer from "@/components/shared/footer/Footer";
import HeadmasterMessage from "@/features/home/_components/HeadTeacherVoice";
import HeroSection from "@/features/home/_components/HeroSection";
import Marquee from "@/features/home/_components/Marquee";
import TeacherDirectory from "@/features/home/_components/TeachersList";
import NoticeBoard from "@/features/notice/_components/NoticeList";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <HeadmasterMessage />
      <NoticeBoard limit={2} />
      <TeacherDirectory />
      <Footer />
    </>
  );
}
