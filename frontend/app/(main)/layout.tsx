import Navbar from "@/components/shared/navbar/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <div>{children}</div>
    </>
  );
}
