import type { Metadata, Viewport } from "next";
import { ToastProvider } from "@/components/shared/toast";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ATC Digital Democracy",
  description:
    "Secure online voting system for Arusha Technical College — SOATECO & Class elections.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
