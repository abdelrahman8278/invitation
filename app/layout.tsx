import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Digital Atelier | You're Invited",
  description: "Wedding invitation management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
