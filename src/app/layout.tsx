import "@/styles/globals.css";

import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import localFont from "next/font/local";

const DepartureMono = localFont({
    src: "../fonts/DepartureMono-Regular.woff2",
    variable: "--font-departure-mono",
});

export const metadata: Metadata = {
    title: "Merry Christmas!",
    description: "Celebrate Christmas with joy and togetherness.",
    openGraph: {
        title: "Merry Christmas!",
        description: "Celebrate Christmas with joy and togetherness.",
        siteName: "Your Website",
        images: [
            {
                url: "/og-image.png", // URL of your OG image
                width: 1200,
                height: 630,
                alt: "Merry Christmas Tree",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${DepartureMono.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased dark`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
