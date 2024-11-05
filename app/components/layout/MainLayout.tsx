import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SeatsProvider } from "../../context/SeatsContext";
const MainLayout = (children: React.ReactNode) => {
  return (
    <SeatsProvider>
      <div className="bg-slate-100 flex flex-col">
        <Header />
        <main className="flex-grow ">{children}</main>
        <Footer />
      </div>
    </SeatsProvider>
  );
};

export default MainLayout;
