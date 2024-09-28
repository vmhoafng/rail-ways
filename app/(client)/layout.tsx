"use client";
import React, { createContext, useState } from "react";
import Layout from "../components/Layouts/MainLayout";
import { ModalProvider } from "../components/Modal/RegisterModal/RegisterModalContext";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <Layout>{children}</Layout>
    </ModalProvider>
  );
}

export default LandingLayout;
