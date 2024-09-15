import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modern Blog",
  description: "A contemporary blog built with Next.js and Contentful",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Header /> */}
          <main className="min-h-screen">{children}</main>
          <Footer />
          <NewsletterPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
