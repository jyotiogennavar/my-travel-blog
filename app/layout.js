import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
// import NewsletterPopup from "@/components/NewsletterPopup/NewsletterPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Travel Blog",
  description: "A contemporary blog built with Next.js and Contentful",
  image: "/og-image.jpg",
  url: "https://my-travel-blog.vercel.app",
  type: "website",
  siteName: "My Travel Blog",
  fbAppId: "123456789",
  locale: "en_US",
  colorScheme: "auto",
  themeColor: "#000000",
  backgroundColor: "#ffffff",
  favicon: "/favicon.ico",
  keywords: ["travel", "blog", "adventure", "explore"],

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
          {/* <NewsletterPopup /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
