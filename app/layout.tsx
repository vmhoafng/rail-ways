import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import useDropdownMenu from "./hooks/useDropDown";
import { SeatsProvider } from "./context/SeatsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log();

  return (
    <SeatsProvider>
      <html lang="en">
        <body>
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
