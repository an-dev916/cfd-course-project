import { message } from "antd";
import Password from "antd/es/input/Password";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthen } from "../../components/AuthenContext";
import Input from "../../components/Input";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import authService from "../../services/authService";
import { validate } from "../../utils/validate";

const MyInfo = () => {
  const { profileInfo, setProfileInfo } = useAuthen();
  const [form, setForm] = useState({
    password: "******",
  });
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  const rules = {
    firstName: [{ required: true, message: "Vui lòng nhập họ và tên!" }],
    email: [
      { required: true, message: "Vui lòng nhập email!" },
      {
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      },
    ],
    phone: [
      { required: true, message: "Vui lòng nhập số điện thoại!" },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        message: "Vui lòng nhập đúng số điện thoại!",
      },
    ],
    password: [{ required: true, message: "Vui lòng nhập mật khẩu!" }],
  };

  const register = (field) => {
    return {
      error: errors[field],
      value: `${form[field] || ""}`,
      onChange: (ev) => setForm({ ...form, [field]: ev.target.value }),
    };
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const errObj = validate(rules, form);
      setErrors(errObj);

      // Check Error
      if (Object.keys(errObj)?.length === 0) {
        const res = await authService.updateProfile(
          {
            firstName: form?.firstName,
            lastName: "",
            facebookURL: form?.facebookURL || "",
            website: form?.website || "",
            phone: form?.phone,
            introduce: form?.introduce || "",
            image: "",
          },
          token
        );
        message.success("Cập nhật thành công");
        setProfileInfo(res?.data?.data);
      }
    } catch (err) {
      message.error("Cập nhật thất bại!");
    }
  };

  useEffect(() => {
    if (profileInfo) {
      setForm({ ...form, ...profileInfo });
    }
  }, [profileInfo]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form onSubmit={onSubmit} className="form">
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Họ và tên"
              required
              value={form.firstName}
              placeholder="Nhập họ và tên..."
              {...register("firstName")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Số điện thoại"
              required
              value={form?.firstName}
              placeholder="Nhập số điện thoại..."
              {...register("phone")}
            />
          </div>
        </div>
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Email"
              required
              disabled
              value={form?.email}
              placeholder="Nhập email..."
              {...register("email")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Mật khẩu"
              required
              disabled
              {...register("password")}
            />
          </div>
        </div>
        <div className="form-group">
          <Input label="Facebook URL" {...register("facebookURL")} />
        </div>
        <div className="form-group">
          <Input label="Website" {...register("website")} />
        </div>
        <div className="form-container textarea">
          <Input
            label="Giới thiệu bản thân"
            inputType="textarea"
            {...register("introduce")}
          />
        </div>
        {/* <p className="noti">Cập nhận thông tin thành công</p> */}
        <div className="form-group">
          <div className="btnsubmit">
            <button className="btn btn--primary">Lưu lại</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
