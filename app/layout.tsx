import type { Metadata } from "next";
import { Poppins, Playfair_Display, Aleo } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const poppins = Poppins({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-poppins'
});

const playfair = Playfair_Display({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-playfair_display'
});

const aleo = Aleo({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-aleo'
});

export const metadata: Metadata = {
    title: "Moore",
    description: "A wedding organizer agency",
    icons: {
        icon: '/favicon.ico',
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${poppins.variable} ${playfair.variable} ${aleo.variable}`}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
