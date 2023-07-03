import React from "react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthenProvider } from "../components/AuthenContext";
import AuthenModal from "../components/AuthenModal";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../components/Modal";
import Navbar from "../Components/Navbar";
import PageLoading from "../Components/PageLoading";
import useDebounce from "../hooks/useDebounce";
import useQuery from "../hooks/useQuery";
import { courseService } from "../services/courseService";
import { teamsService } from "../services/teamsService";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);

  useEffect(() => {
    const script = document.createElement("script");
    // const scriptLib = document.createElement("script");
    script.src = "/dest/main.js";
    // scriptLib.src = "/dest/jsmain.min.js";

    // document.body.appendChild(scriptLib);
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
