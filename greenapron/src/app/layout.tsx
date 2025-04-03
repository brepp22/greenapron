"use client";

import { ThemeProvider , useTheme } from "next-themes";
import {useEffect, useState} from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function ThemeToggle(){
  const { theme , setTheme } = useTheme();
  const [mounted , setMounted] = useState(false);


useEffect (() => {
  setMounted(true);
}, []);

if (!mounted) return null ;


  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 mt-4 rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="flex flex-col items-center justify-center min-h-screen">
            {children}
            <ThemeToggle /> 
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

