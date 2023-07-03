import React from "react";
import { useEffect } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthen } from "../components/AuthenContext";
import { LOCAL_STORAGE } from "../constants/localStorage";
import { PATHS } from "../constants/pathnames";
import orderService from "../services/orderService";

const ProfileLayout = () => {
  const { profileInfo, setUserCourses, setUserPayments } = useAuthen();
  const { image, firstName, introduce, email, phone, website } =
    profileInfo || {};
  const token = localStorage.getItem(LOCAL_STORAGE.token);

  // if (!token) {
  //   return <Navigate to={PATHS.HOME} />;
  // }

  // const onGetMyCourses = async (token) => {
  //   const res = await orderService.getMyCourses(token);
  //   if (res?.data?.data) {
  //     const mapCourses = res?.data?.data.orders.map((course) => course?.course);
  //     setUserCourses(mapCourses ?? []);
  //   }
  // };
  // const onGetMyPayments = async (token) => {
  //   const res = await orderService.getMyPayments(token);
  //   if (res?.data?.data) {
  //     const mapPayments = res?.data?.data.orders;
  //     setUserPayments(mapPayments ?? []);
  //   }
  // };

  // useEffect(() => {
  //     onGetMyCourses(token);
  //     onGetMyPayments(token);
  //   }, []);

  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img
                      src={
                        image ||
                        "https://i.pinimg.com/originals/25/2a/4b/252a4be3b54fbd94bca717bb8bba74e7.jpg"
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
                <h3 className="title --t3">{firstName}</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">{introduce}</p>
              <ul>
                <li>
                  <img src="/img/icon-mail-outline.svg" alt="icon" />
                  <span>{email}</span>
                </li>
                <li>
                  <img src="/img/icon-phone-outline.svg" alt="icon" />
                  <span>{phone}</span>
                </li>
                <li>
                  <img src="/img/icon-link.svg" alt="icon" />
                  <a href="#" target="_blank">
                    {website}
                  </a>
                </li>
              </ul>
              <div className="social">
                <a href="#">
                  <img src="/img/icon-facebook-dark.svg" alt="" />
                </a>
                <a href="#">
                  <img src="/img/icon-linkedin-dark.svg" alt="" />
                </a>
                <a href="#">
                  <img src="/img/icon-youtube-dark.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink end to={PATHS.PROFILE.INDEX}>
                  Thông tin cá nhân
                </NavLink>
                <NavLink to={PATHS.PROFILE.COURSES}>Khóa học của tôi</NavLink>
                <NavLink to={PATHS.PROFILE.PAYMENT}>Lịch sử thanh toán</NavLink>
              </div>
              <div className="tab__content">
                {/* Outlet */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
