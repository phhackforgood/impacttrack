import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impact Track",
  description: "Track your volunteering impact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`} >
        <div className="flex flex-row">
          <SideBar />
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html >
  );
}
