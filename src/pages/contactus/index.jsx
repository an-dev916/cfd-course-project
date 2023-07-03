import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { PATHS } from "../../constants/pathnames";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/subscribesService";
import { validate } from "../../utils/validate";

const Contactus = () => {
  // React Hooks
  const [form, setForm] = useState({});
  let [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {
    execute,
    data,
    error: subscribesError,
    loading,
  } = useMutation(subscribesService.subscribes);

  // Validate Rules
  const rules = {
    name: [{ required: true, message: "Vui lòng nhập họ và tên!" }],
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
    select: [{ required: true, message: "Vui lòng chọn chủ đề!" }],
    content: [{ required: true }],
  };

  const register = (field) => {
    return {
      error: errors[field],
      value: `${form[field] || ""}`,
      onChange: (ev) => setForm({ ...form, [field]: ev.target.value }),
    };
  };

  // Handle Submit And Check Error
  const onSubmit = () => {
    const errObj = validate(rules, form);
    setErrors(errObj);

    // Check Error
    if (Object.keys(errObj)?.length === 0) {
      const payload = {
        name: form?.name || "",
        title: "",
        email: form?.email || "",
        description: form?.content || "",
      };
      execute(payload);
      message.config({
        top: 60,
      });
      message.success("Đăng ký thành công!", 1);
      setTimeout(() => {
        // Trở về trang HOME khi Submit thành công
        navigate(PATHS.HOME);
      }, 1300);
    }
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <div className="textbox">
          <h2 className="title --t2">Liên hệ &amp; Hỗ trợ</h2>
          <p className="desc">
            Bạn có bất cứ thắc mắc nào thì đừng ngần ngại liên hệ để được hỗ
            trợ?
            <br />
            Chúng tôi luôn ở đây
          </p>
        </div>
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <div className="sidebar">
              <div className="sidebar__address infor">
                <div className="infor__item">
                  <label className="label">CFD Circle</label>
                  <p className="title --t4">
                    666/46/29 Ba Tháng Hai, phường 14, quận 10, TPHCM
                  </p>
                </div>
                <div className="infor__item">
                  <label className="label">Email</label>
                  <p className="title --t4">info@cfdcircle.vn</p>
                </div>
                <div className="infor__item">
                  <label className="label">Số điện thoại</label>
                  <p className="title --t4">098 9596 913</p>
                </div>
              </div>
              <div className="sidebar__business">
                <p>
                  Đối với yêu cầu kinh doanh xin vui lòng gửi cho chúng tôi tại:
                </p>
                <a href="#">business@cfdcircle.vn</a>
              </div>
              <a href="#" className="sidebar__messenger btn btn--primary">
                Trò chuyện trực tuyến
              </a>
            </div>
            <div className="form">
              <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
              <div className="form-group">
                <Input
                  label="Họ và tên"
                  required
                  placeholder="Nhập họ và tên..."
                  // name="name"
                  // error={errors.name}
                  // value={form.name}
                  // onChange={onInputChange}
                  {...register("name")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Email"
                  required
                  placeholder="Nhập email..."
                  // name="email"
                  // error={errors.email}
                  // value={form.email}
                  // onChange={onInputChange}
                  {...register("email")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Số điện thoại"
                  required
                  placeholder="Nhập số điện thoại..."
                  // name="phone"
                  // error={errors.phone}
                  // value={form.phone}
                  // onChange={onInputChange}
                  {...register("phone")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Chủ đề cần hỗ trợ"
                  required
                  options={[
                    { value: "", label: "--" },
                    { value: "res", label: "Web Responsive" },
                    { value: "react", label: "Reactjs Master" },
                  ]}
                  inputType="select"
                  // name="select"
                  // error={errors.select}
                  // value={form.select}
                  // onChange={onInputChange}
                  {...register("select")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Nội dung"
                  required
                  placeholder="Nhập nội dung..."
                  inputType="textarea"
                  // name="content"
                  // error={errors.content}
                  // value={form.content}
                  // onChange={onInputChange}
                  {...register("content")}
                />
              </div>
              <div className="btncontrol">
                <button className="btn btn--primary" onClick={onSubmit}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactus;
