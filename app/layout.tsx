import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="bg-slate-100 flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Toaster />
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
