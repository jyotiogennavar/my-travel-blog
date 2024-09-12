import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'My Blog',
  description: 'A blog built with Next.js and Contentful',
  openGraph: {
    title: 'My Blog',
    description: 'A blog built with Next.js and Contentful',
    url: 'https://my-travel-blog.com',
    siteName: 'My Blog',
    images: [
      {
        url: 'https://my-travel-blog.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Blog',
    description: 'A blog built with Next.js and Contentful',
    images: ['https://my-travel-blog.com/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}