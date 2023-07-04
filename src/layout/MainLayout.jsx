import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthenProvider } from "../components/AuthenContext";
import AuthenModal from "../components/AuthenModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/dest/main.js";

    document.body.appendChild(script);
  }, []);
  return (
    <AuthenProvider>
      {/* Page Effects */}
      {/* <PageLoading /> */}
      {/* Header */}
      <Header />
      {/* Sidebar Nav */}
      <Navbar />

      {/* Main */}
      <Outlet />

      {/* Footer */}
      <Footer />
      {/* Modal */}
      <Modal />
      <AuthenModal />
    </AuthenProvider>
  );
};

export default MainLayout;
