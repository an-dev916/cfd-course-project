import React, { useState } from "react";
import { useAuthen } from "../AuthenContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ReactDOM from "react-dom";
import { useRef } from "react";
import { useEffect } from "react";

const AuthenModal = () => {
  const { isAuthenModalOpen, closeAuthenModal, renderForm } = useAuthen();
  const firstInputRef = useRef();
  const loginRef = useRef();

  useEffect(() => {
    if (renderForm === "register") {
      firstInputRef?.current?.focus();
    } else {
      loginRef?.current?.focus();
    }
  }, [renderForm, closeAuthenModal]);

  return ReactDOM.createPortal(
    <div className={`modal modallogin ${isAuthenModalOpen ? "open" : ""}`}>
      <div className="modal__wrapper">
        <div className="modal__wrapper-close" onClick={closeAuthenModal}>
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>
        <LoginForm ref={loginRef} />
        <RegisterForm ref={firstInputRef} />
        {/* <div className="modal__wrapper-content mdconsult">
          <h3 className="title --t3">Đăng ký tư vấn</h3>
          <form action="#" className="form">
            <input
              type="text"
              className="form__input"
              name="name"
              placeholder="Họ và tên"
            />
            <input
              type="text"
              className="form__input"
              name="name"
              placeholder="Số điện thoại"
            />
            <input
              type="text"
              className="form__input"
              name="email"
              placeholder="Email"
            />
            <textarea
              name
              id
              cols={30}
              rows={4}
              className="form__input"
              placeholder="Nội dung cần tư vấn"
              defaultValue={""}
            />
            <button
              className="btn btn--primary form__btn-register"
              type="submit"
            >
              Gửi thông tin
            </button>
          </form>
        </div> */}
      </div>
      <div className="modal__overlay" onClick={closeAuthenModal} />
    </div>,
    document.body
  );
};

export default AuthenModal;
