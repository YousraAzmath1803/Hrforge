'use client'; // Ensure it's client-side
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/page";
import { usePathname } from "next/navigation"; // Only usePathname is needed
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path
  const [showNavbar, setShowNavbar] = useState(false); // State to control navbar visibility

  useEffect(() => {
    // Update navbar visibility based on the pathname
    setShowNavbar(pathname !== "/");
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: 'flex' }}>
          {/* Conditionally render Navbar */}
          {showNavbar && <Navbar />}
          <div
            style={{
              flexGrow: 1,
              padding: '3px',
              marginTop: showNavbar ? '60px' : '0', // Adjust marginTop based on the page
              marginLeft: showNavbar ? '4px' : '0', // Adjust marginLeft based on the page
            }}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
