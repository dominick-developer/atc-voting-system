import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/api/query-provider";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/shared/toast";

export const metadata: Metadata = {
  title: "ATC Online Voting System",
  description: "Secure, transparent and modern student election platform for Arusha Technical College.",
  manifest: "/manifest.webmanifest",
  applicationName: "ATC Voting",
  appleWebApp: { capable: true, title: "ATC Voting", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#10243A",
  width: "device-width",
  initialScale: 1,
};
// ... ndani ya RootLayout:
return (
  <html lang="en">
    <body>
      <ToastProvider>{children}</ToastProvider>
    </body>
  </html>
);
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}