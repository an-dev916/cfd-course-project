import React from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { validate } from "../../utils/validate";
import { useAuthen } from "../AuthenContext";
import Input from "../Input";

const Form = styled.form`
  Input {
    margin-bottom: 20px;
  }
  label {
    margin-bottom: 10px;
  }
  .error {
    margin-top: -20px;
  }
`;

const LoginForm = forwardRef((props, ref) => {
  const { onLogin, renderForm, setRenderForm, closeAuthenModal } = useAuthen();
  const [form, setForm] = useState({});
  let [errors, setErrors] = useState({});

  const rules = {
    email: [
      { required: true, message: "Vui lòng nhập email!" },
      {
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "Vui lòng nhập đúng email!",
      },
    ],
    password: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
  };
  useEffect(() => {
    setErrors({});
  }, [closeAuthenModal]);
  const register = (field) => {
    return {
      error: errors[field],
      value: `${form[field] || ""}`,
      onChange: (ev) => setForm({ ...form, [field]: ev.target.value }),
    };
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const errObj = validate(rules, form);
    setErrors(errObj);
    // Check Error
    if (Object.keys(errObj)?.length === 0) {
      onLogin?.(form);
      setForm({});
    }
  };
  return (
    <div
      className={`modal__wrapper-content mdlogin ${
        renderForm === "login" ? "active" : ""
      }`}
    >
      <h3 className="title --t3">Đăng nhập</h3>
      {/* <div className="social">
        <a className="btn btn--google" href="#">
          <i>
            <img src="/img/icon-google.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
        <a className="btn btn--facebook" href="#">
          <i>
            <img src="/img/icon-facebook-v2.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
      </div>
      <span className="line">Hoặc</span> */}
      <Form onSubmit={onSubmit} className="form">
        <Input
          ref={ref}
          label="Email"
          required
          placeholder="Nhập email..."
          {...register("email")}
        />
        <Input
          label="Password"
          required
          placeholder="Nhập mật khẩu..."
          type="password"
          {...register("password")}
        />
        <div className="form__bottom">
          <p>
            Bạn chưa có tài khoản?
            <span
              style={{ paddingLeft: "10px" }}
              className="color--primary btnmodal"
              onClick={() => {
                setErrors({});
                setRenderForm("register");
              }}
            >
              Đăng ký
            </span>
          </p>
          {/* <a className="color--primary" href="#">
            Quên mật khẩu?
          </a> */}
        </div>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </button>
      </Form>
    </div>
  );
});

export default LoginForm;
