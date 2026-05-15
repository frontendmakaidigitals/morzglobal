import Footer from "@/footer/footer";
import Header from "@/header/header";
import SmoothScrollProvider from "../smooth-scrollprovder";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <SmoothScrollProvider>
        {children}
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}
