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

const RegisterForm = forwardRef((props, ref) => {
  const { onRegister, renderForm, setRenderForm, closeAuthenModal } =
    useAuthen();
  const [form, setForm] = useState({});
  let [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [closeAuthenModal]);

  const rules = {
    name: [{ required: true, message: "Vui lòng nhập họ tên!" }],
    email: [
      { required: true, message: "Vui lòng nhập email!" },
      {
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "Vui lòng nhập đúng email!",
      },
    ],
    password: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
  };
  const register = (field) => {
    return {
      error: errors[field],
      value: `${form[field] || ""}`,
      onChange: (ev) => setForm({ ...form, [field]: ev.target.value }),
    };
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log("form", form);
    const errObj = validate(rules, form);
    setErrors(errObj);

    // Check Error
    if (Object.keys(errObj)?.length === 0) {
      onRegister?.({
        firstName: form?.name || "",
        lastName: " ",
        email: form?.email || "",
        password: form?.password || "",
      });
      setForm({});
      console.log("form success", form);
    }
  };
  return (
    <div
      className={`modal__wrapper-content mdregister ${
        renderForm === "register" ? "active" : ""
      }`}
    >
      <h3 className="title --t3">Đăng ký tài khoản</h3>
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
          label="Họ và tên"
          ref={ref}
          required
          placeholder="Nhập họ và tên..."
          {...register("name")}
        />

        <Input
          label="Email"
          required
          placeholder="Nhập Email..."
          {...register("email")}
        />
        <Input
          label="Password"
          required
          type="password"
          placeholder="Nhập mật khẩu..."
          {...register("password")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <a className="color--primary" href="#">
            Chính Sách
          </a>{" "}
          &amp;
          <a className="color--primary" href="#">
            Điều Khoản
          </a>{" "}
          của CFD
        </p>
        <span
          className="color--primary btnmodal"
          onClick={() => {
            setErrors({});
            setRenderForm("login");
          }}
        >
          Bạn đã có tài khoản?
        </span>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng ký
        </button>
      </Form>
    </div>
  );
});

export default RegisterForm;
