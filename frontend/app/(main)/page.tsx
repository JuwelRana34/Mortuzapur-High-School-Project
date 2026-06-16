import Footer from "@/components/shared/footer/Footer";
import Notification from "@/components/shared/notification/InstallPrompt";
import HeadmasterMessage from "@/features/home/_components/HeadTeacherVoice";
import HeroSection from "@/features/home/_components/HeroSection";
import Marquee from "@/features/home/_components/Marquee";
import TeacherDirectory from "@/features/home/_components/TeachersList";
import NoticeBoard from "@/features/notice/_components/NoticeList";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default function Home() {
  const { env } = getCloudflareContext();
  return (
    <>
      <HeroSection />
      <Marquee />
      <Notification publicKey={env.NEXT_PUBLIC_VAPID_PUBLIC_KEY} />
      <HeadmasterMessage />
      <NoticeBoard limit={2} />
      <TeacherDirectory />
      <Footer />
    </>
  );
}
