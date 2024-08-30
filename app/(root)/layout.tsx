'use client'
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function RootLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
        useEffect(() => {
            AOS.init({
                duration: 800,
                once: false,
            });
        }, []);
        return (
        <div className="flex h-screen flex-col">
            <Header/>
            <main className="flex-1 pt-[75px]">{children}</main>
            <Footer/>
        </div>
    );
}
  