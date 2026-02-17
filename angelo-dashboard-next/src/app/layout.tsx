import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Angelo Araya Villanueva | Senior Lead Engineer",
  description: "Interactive Engineering Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-secondary text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}