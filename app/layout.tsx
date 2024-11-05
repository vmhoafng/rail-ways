import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./globals.css";
import { SeatsProvider } from "./context/SeatsContext";
import { Montserrat } from "next/font/google";

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
    <SeatsProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <div className="bg-slate-100 flex flex-col">
            <Header />
            <main className="flex-grow ">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </SeatsProvider>
  );
}
