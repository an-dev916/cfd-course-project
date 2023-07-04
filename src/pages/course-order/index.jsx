import React, { useMemo, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthen } from "../../components/AuthenContext";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { formatCurrency } from "../../utils/format";
import { validate } from "../../utils/validate";
import Input from "../../components/Input";
import { message } from "antd";
import Radio from "../../components/RadioInput";
import orderService from "../../services/orderService";
import { PATHS } from "../../constants/pathnames";
import PageLoading from "../../components/PageLoading";
import useDebounce from "../../hooks/useDebounce";

const CourseOrder = () => {
  // Navigate
  const navigate = useNavigate();
  // Handle Payment Change
  const [paymentMethod, setPaymentMethod] = useState("atm");
  const onPaymentChange = (method) => setPaymentMethod(method);
  // Profile Info
  const { profileInfo, onGetMyCourses, onGetMyPayments, userCourses } =
    useAuthen();

  // Input Form & Errors
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  console.log("errors :>> ", errors);

  // Course Info
  const { slug } = useParams();
  const {
    data: courseDetail,
    loading: courseDetailLoading,
    error,
  } = useQuery(() => courseService.getCourseBySlug(slug), [slug]);
  const { image, title, price, teams, id, tags } = courseDetail || {};
  const teacher = useMemo(() => {
    return teams?.find((el) => el.tags.includes("Teacher"));
  }, [teams]);

  const typeOptions = useMemo(
    () =>
      tags?.map((tag) => {
        return {
          label: tag,
          value: tag?.toLowerCase(),
        };
      }) || [],
    [tags]
  );

  // Find Ordered Course
  const orderedCourse =
    userCourses?.find((course) => course?.course?.id === id) || [];

  // const orderedCourse = useMemo(() => {
  //   return userCourses?.find((course) => course?.course?.id === id) || [];
  // }, [userCourses]);

  const isAlreadyOrdered = !!orderedCourse?.id;
  const {
    image: orderedImage,
    title: orderedTitle,
    price: orderedPrice,
    teams: orderedTeams,
  } = orderedCourse?.course || {};

  const orderedTeacher = useMemo(() => {
    return orderedTeams?.find((el) => el.tags.includes("Teacher"));
  }, [orderedTeams]);

  // Handle Register
  const rules = {
    name: [{ required: true, message: "Vui lòng nhập họ và tên!" }],

    phone: [
      { required: true, message: "Vui lòng nhập số điện thoại!" },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        message: "Vui lòng nhập đúng số điện thoại!",
      },
    ],
    type: [{ required: true, message: "Vui lòng chọn hình thức!" }],
  };

  const register = (field) => {
    return {
      error: errors[field],
      value: `${form[field] || ""}`,
      onChange: (ev) => setForm({ ...form, [field]: ev.target.value }),
    };
  };

  const onSubmit = useCallback(async () => {
    console.log(1);
    if (!isAlreadyOrdered) {
      const errObj = validate(rules, form);
      setErrors(errObj);
      // Check Error
      if (Object.keys(errObj)?.length === 0) {
        if (id) {
          const payload = {
            name: form?.name,
            phone: form?.phone || "",
            course: id,
            type: form?.type,
            paymentMethod,
          };
          try {
            const res = await orderService.orderCourse(payload);

            if (res?.data?.data) {
              await onGetMyCourses();
              await onGetMyPayments();
              message.success("success!");
              setTimeout(() => {
                navigate(PATHS.PROFILE.COURSES);
              }, 700);
            }
          } catch (err) {
            console.log("err :>> ", err);
            message.error("err!");
          }
        }
      }
    } else {
      message.warning("Khóa học đã đăng ký");
    }
  }, [form, rules, paymentMethod, isAlreadyOrdered]);

  // useEffect
  useEffect(() => {
    if (profileInfo || orderedCourse) {
      setForm({
        name: orderedCourse?.name || profileInfo?.firstName,
        phone: orderedCourse?.phone || profileInfo?.phone,
        email: orderedCourse?.email || profileInfo?.email,
        type: orderedCourse?.type || typeOptions[0]?.value || "",
      });
      orderedCourse?.paymentMethod &&
        setPaymentMethod(orderedCourse?.paymentMethod);
    }
  }, [profileInfo, typeOptions, JSON.stringify(orderedCourse)]);

  const isPageLoading = useDebounce(courseDetailLoading, 500);
  if (isPageLoading) {
    return (
      <main className="mainwrapper --ptop">
        <PageLoading />
      </main>
    );
  }
  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          {/* Course Order */}
          <div className="itemorder infoorder">
            <h3 className="title --t3">Thông tin đơn hàng</h3>
            <div className="boxorder">
              <div className="boxorder__col">
                <label className="label">Tên khoá học</label>
                <div className="boxorder__col-course">
                  <div className="img">
                    <img src={orderedImage || image || ""} alt={slug} />
                  </div>
                  <div className="info">
                    <p className="name">
                      <strong>{orderedTitle || title}</strong>
                    </p>
                    <p>{orderedTeacher?.name || teacher?.name}</p>
                  </div>
                </div>
              </div>
              <div className="boxorder__col">
                <label className="label">Tạm tính</label>
                <p>{formatCurrency(orderedPrice || price)} đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">Giảm giá</label>
                <p>0đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">thành tiền</label>
                <p>
                  <strong>{formatCurrency(orderedPrice || price)}</strong>
                </p>
              </div>
            </div>
          </div>
          {/* Form Info */}
          <div className="itemorder formorder">
            <h3 className="title --t3">Thông tin cá nhân</h3>
            <div className="boxorder">
              <div className="form">
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      label="Họ và tên"
                      required
                      placeholder="Nhập họ và tên..."
                      {...register("name")}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Email"
                      placeholder="Nhập Email..."
                      required
                      disabled
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      label="Số điện thoại"
                      required
                      {...register("phone")}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      label="Hình thức học"
                      required
                      inputType="select"
                      options={typeOptions}
                      {...register("type")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Payment Type */}
          <div className="itemorder paymentorder">
            <h3 className="title --t3">Hình thức thanh toán</h3>
            <Radio
              disabled={isAlreadyOrdered}
              className="boxorder"
              defaultValue={paymentMethod}
              onChange={onPaymentChange}
            >
              <div className="boxorder__pay">
                <Radio.Option value="atm">
                  <img src="/img/icon-payment-method-atm.svg" alt="" />
                  Thành toán bằng chuyển khoản
                  <span className="checkmark" />
                </Radio.Option>
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
                  khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.
                </div>
              </div>
              <div className="boxorder__pay">
                <Radio.Option value="momo">
                  <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
                  Thanh toán bằng ví Momo
                  <span className="checkmark" />
                </Radio.Option>
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản
                  với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.
                </div>
              </div>
              {/* Khoá học video và video mentor thì không có thanh toán tiền mặt */}
              <div className="boxorder__pay">
                <Radio.Option value="cash">
                  <img src="/img/icon-payment-method-cod.svg" alt="" />
                  Thanh toán bằng tiền mặt
                  <span className="checkmark" />
                </Radio.Option>
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email
                  của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai
                  giảng để đóng học phí tại Lầu 2, số 666/46/29, đường Ba Tháng
                  Hai, phường 14, quận 10, TP HCM.
                </div>
              </div>
            </Radio>
          </div>
          {/* addclass --processing khi bấm đăng ký */}
          <div
            className={`btn ${isAlreadyOrdered ? "btn--grey" : "btn--primary"}`}
            onClick={onSubmit}
            style={isAlreadyOrdered ? { width: "100%" } : {}}
          >
            <span>{isAlreadyOrdered ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
            {/* <svg
                version="1.1"
                id="L9"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 0 0"
                xmlSpace="preserve"
              >
                <path
                  fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="1s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"
                  />
                </path>
              </svg> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseOrder;
