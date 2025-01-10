import "./globals.css";
import { Inter } from "next/font/google";
import HRMSChatbot from "./HRMSChatbot/page";
import ChatbotButton from "./CustomChatbot/page";
import CustomChatbot from "./CustomChatbot/page";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
          <h1>HRMS Dashboard</h1>
          <CustomChatbot />
        {children}
      </body>
    </html>
  );
}
