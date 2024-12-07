import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./globals.css";
import useDropdownMenu from "./hooks/useDropDown";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/UserContext";
import { Montserrat } from "next/font/google";
import { StationsProvider } from "./context/StationsContext";
import { JourneyProvider } from "./context/JourneyContext";
import ChatWidget from "./components/ChatWidget";
import { SeatsProvider } from "./context/SeatsContext";
import { ScheduleProvider } from "./context/ScheduleContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // You can customize the weights as needed
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScheduleProvider>
      <JourneyProvider>
        <SeatsProvider>
          <StationsProvider>
            <html lang="en">
              <body className={montserrat.className}>
                <UserProvider>
                  <div className="bg-slate-100 flex flex-col">
                    <Header />
                    <ChatWidget />
                    <main className="flex-grow">{children}</main>
                    <Toaster />
                    <Footer />
                  </div>
                </UserProvider>
              </body>
            </html>
          </StationsProvider>
        </SeatsProvider>
      </JourneyProvider>
    </ScheduleProvider>

  );
}
