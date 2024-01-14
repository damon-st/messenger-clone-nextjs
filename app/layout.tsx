import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ActiveStatus } from "@/components/active-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger clone",
  description: "Messenger clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ToasterProvider />
          <ActiveStatus />
        </AuthProvider>
      </body>
    </html>
  );
}
