import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Premium modern font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-jakarta",
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Qurevo Businesses | Premium Online Presence",
  description: "A professional business page, hosted and managed by Qurevo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Ultra dark green background */}
      <body className={`${jakarta.variable} font-sans bg-evergreen-100 text-white selection:bg-lime_cream selection:text-evergreen antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}