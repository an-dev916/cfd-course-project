import { message } from "antd";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { PATHS } from "../../constants/pathnames";
import authService from "../../services/authService";
import orderService from "../../services/orderService";

const AuthenContext = createContext({});

export const AuthenProvider = ({ children }) => {
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);
  const [renderForm, setRenderForm] = useState("login");
  const [profileInfo, setProfileInfo] = useState({});
  const [userCourses, setUserCourses] = useState([]);
  const [userPayments, setUserPayments] = useState([]);
  const openAuthenModal = () => {
    if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
      setIsAuthenModalOpen(true);
    } else {
      message.config({
        top: 60,
      });
      message.success("Đã đăng nhập thành công!");
    }
  };
  const closeAuthenModal = () => {
    setIsAuthenModalOpen(false);
    setRenderForm("login");
  };

  const onLogin = async (loginData) => {
    // call API
    console.log("loginData :>> ", loginData);
    try {
      const res = await authService.login(loginData);
      console.log("res login nè :>> ", res);
      const { token, refreshToken } = res?.data?.data || {};

      //   Lưu vào Localstorage
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);
      console.log("token", token);
      //   Get Profile By Token
      if (!!token) {
        onGetProfile(token);
        onGetMyCourses(token);
        onGetMyPayments(token);
        message.success("Đăng nhập thành công!");
        closeAuthenModal();
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Đăng nhập thất bại!");
    }
  };
  const onRegister = async (registerData) => {
    // call API
    try {
      const res = await authService.register(registerData);
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công!");
        onLogin({
          email: registerData.email,
          password: registerData.password,
        });
      }
      console.log("res :>> ", res);
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Đăng ký thất bại!");
    }
  };

  const onGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data) {
        setProfileInfo(profileRes?.data.data);
      }
    } catch (error) {
      console.log("error", error);
      onLogout();
    }
  };

  const onLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.token);
    localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    setProfileInfo({});
    setUserCourses([]);
    setUserPayments([]);
    message.success("See you again.. :(", 0.5);
  };

  const onGetMyCourses = async () => {
    const res = await orderService.getMyCourses();
    if (res?.data?.data) {
      const mapCourses = res?.data?.data?.orders;
      setUserCourses(mapCourses ?? []);
    }
  };

  const onGetMyPayments = async () => {
    const res = await orderService.getMyPayments();
    if (res?.data?.data) {
      const mapPayments = res?.data?.data?.orders;
      setUserPayments(mapPayments ?? []);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.token);
    if (!!accessToken) {
      onGetProfile();
      onGetMyCourses();
      onGetMyPayments();
    }
  }, []);

  return (
    <AuthenContext.Provider
      value={{
        isAuthenModalOpen,
        setProfileInfo,
        profileInfo,
        openAuthenModal,
        closeAuthenModal,
        onLogin,
        userCourses,
        setUserCourses,
        userPayments,
        setUserPayments,
        onRegister,
        renderForm,
        setRenderForm,
        onLogout,
        onGetMyCourses,
        onGetMyPayments,
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuthen = () => useContext(AuthenContext);
