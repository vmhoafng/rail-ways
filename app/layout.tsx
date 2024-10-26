import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import useDropdownMenu from "./hooks/useDropDown";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-slate-100 flex flex-col">
          <Header />
          <main className="flex-grow ">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
