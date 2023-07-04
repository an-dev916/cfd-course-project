import { message } from "antd";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Accordion from "../../components/Accordion";
import CourseItem from "../../components/CourseItem";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { PATHS } from "../../constants/pathnames";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { formatCurrency } from "../../utils/format";
import { useAuthen } from "../../components/AuthenContext";
import { localTime } from "../../utils/localTime";

const ContentTag = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
  text-decoration: underline;
  transition: 0.3s;
  &:hover {
    text-decoration: underline rgba(255, 255, 255, 0);
    opacity: 0.8;
  }
`;

const CourseDetail = () => {
  const { openAuthenModal } = useAuthen();
  const { slug } = useParams();
  // Get Detail Course
  const {
    data: courseDetail,
    loading,
    error,
  } = useQuery(() => courseService.getCourseBySlug(slug), [slug]);

  // Get All Courses
  const { data: coursesData } = useQuery(() => courseService.getCourses());
  const courses = coursesData?.courses;
  // useRef
  const contentRef = useRef(null);
  const scrollToSection = () => {
    // contentRef.current.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: contentRef.current.offsetTop + window.innerHeight - 100,
      behavior: "smooth",
    });
  };

  const { duration, tags, image, description, schedule, name, title, price } =
    courseDetail || {};
  // const startDate =
  //   schedule?.startDate &&
  //   moment(new Date(schedule?.startDate).toLocaleDateString()).calendar();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [courseDetail]);

  const token = localStorage.getItem(LOCAL_STORAGE.token);

  const handleRegister = () => {
    if (!token) {
      openAuthenModal();
    }
  };

  useEffect(() => {
    if (error) {
      message.config({
        top: 60,
      });
      message.error("Vui lòng tải lại trang!");
    }
  }, [error]);

  return (
    <main className="mainwrapper coursedetailpage">
      <section className="hero herodetail">
        <div className="hero__content">
          <div className="container">
            <h3 className="category label --white">frontend</h3>
            <h2 className="title --white">{title}</h2>
            <div className="infor">
              <div className="infor__item">
                <label className="label --white">Khai giảng</label>
                <p className="title --t3 --white">
                  {localTime(schedule?.startDate) || ""}
                </p>
              </div>
              <div className="infor__item">
                <label className="label --white">Thời lượng</label>
                <p className="title --t3 --white">{duration} buổi</p>
              </div>
              <div className="infor__item">
                <label className="label --white">Hình thức</label>
                <p className="title --t3 --white">{tags?.join(" | ")}</p>
              </div>
            </div>
            {/* Chưa đăng ký */}
            {token ? (
              <Link
                to={`${PATHS.COURSE_ORDER}/${slug}`}
                className="btn btn--primary btn-regcourse"
              >
                Đăng ký
              </Link>
            ) : (
              <div
                onClick={handleRegister}
                className="btn btn--primary btn-regcourse"
              >
                Đăng ký
              </div>
            )}

            {/* Đã đăng ký */}
            {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
            {/* Nút scroll đến nội dung */}
            <ContentTag className="btny" onClick={scrollToSection}>
              Nội dung khóa học
            </ContentTag>
          </div>
        </div>
        <div className="hero__bottom">
          <div className="container-fluid">
            <a href className="user">
              <div className="user__img">
                <img
                  src="https://cfdcircle.vn/files/avatars/480x480/VAOXpQdhq3yNvBMQlDItAYKU29ZO0gsxPTxdryL5.jpg"
                  alt="Avatar teacher"
                />
              </div>
              <p className="user__name --white">Trần Nghĩa</p>
            </a>
            <div className="pricebox">
              <p className="title --t3 --white">{formatCurrency(price)} VND</p>
            </div>
            <a
              href="https://www.facebook.com/sharer/sharer.php?sdk=joey&u=https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-master-30&display=popup&ref=plugin&src=share_button"
              onClick={() =>
                !window.open(this.href, "Facebook", "width=640,height=580")
              }
              className="sharebox s--white"
            >
              Chia sẻ
              <i>
                <img
                  src="https://cfdcircle.vn/img/iconshare.svg"
                  alt="CFD Circle"
                />
              </i>
            </a>
          </div>
        </div>
        <div className="hero__background">
          <img
            className="hero__background-img"
            src="https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
            alt="CFD Circle"
          />
        </div>
      </section>
      <section className="contentdetail">
        <div className="content">
          <div className="container">
            <div className="contentrow ctintro">
              <h3 className="contentrow__title title --t3">Giới thiệu</h3>
              <div className="contenteditor">
                <h2
                  style={{
                    fontSize: "inherit",
                    margin: "inherit",
                    fontFamily: "inherit",
                    lineHeight: "inherit",
                  }}
                >
                  Khoá học LẬP TRÌNH{" "}
                  <span style={{ textTransform: "uppercase" }}>{name}</span> này
                  phù hợp với những bạn đang là sinh viên ngành IT hoặc trái
                  ngành muốn trở thành Lập Trình Viên Front-end Chuyên Nghiệp để
                  đi làm tại các công ty nhưng không thể tự học hoặc tự học
                  nhưng chưa thể ứng dụng và hoàn thiện dự án thực tế một cách
                  tốt nhất. Khoá học FRONT-END MASTER chính là lựa chọn phù hợp
                  nhất với bạn. Đội ngũ CFD Circle sẽ giúp bạn có đầy đủ kiến
                  thức, kinh nghiệm kỷ năng cần thiết bằng việc giảng dạy giúp
                  bạn hoàn thành được ít nhất 5-6 dự án thực tế. Ngoài những
                  kiến thức thì bạn sẽ tích luỹ được rất nhiều kinh nghiệm thực
                  tế trong quá trình học và làm dự án để dễ dàng ứng tuyển thành
                  công.
                </h2>
                <h3>
                  <strong>
                    Khoá học FRONTEND MASTER được chia làm 3 giai đoạn chính:
                  </strong>
                </h3>
                <p>
                  - <strong>FRONTEND NEWBIE</strong>:{" "}
                  <strong>Thời lượng</strong> 6 tuần (2 buổi/tuần).{" "}
                  <strong>Thời gian học</strong> 18h45 - 21h45 thứ 3, 7
                </p>
                <p>
                  - <strong>WEB RESPONSIVE</strong>:<strong>Thời lượng</strong>{" "}
                  5 tuần (3 buổi/tuần).
                  <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
                </p>
                <p>
                  - <strong>REACTJS MASTER:</strong> <strong>Thời lượng</strong>{" "}
                  6 tuần (3 buổi/tuần).
                  <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
                </p>
                <p>
                  <strong>HÌNH THỨC HỌC: </strong>OFFLINE HOẶC ONLINE GOOGLE
                  MEET CÙNG VỚI LỚP OFFLINE
                </p>
                <p>
                  <strong>SỐ LƯỢNG HỌC VIÊN: </strong>15-20 học viên
                </p>
                <p style={{ color: "#00afab" }}>
                  KHOÁ HỌC NÀY ĐANG CÓ ƯU ĐÃI{" "}
                  <strong style={{ fontSize: "22px" }}>GIẢM GIÁ</strong> TỪ
                  <strong style={{ fontSize: "22px" }}>
                    {" "}
                    15.400.000 VND
                  </strong>{" "}
                  CHỈ CÒN{" "}
                  <strong style={{ fontSize: "22px" }}>14.700.000 VND.</strong>
                </p>
                <p style={{ color: "#00afab" }}>
                  <strong style={{ fontSize: "22px" }}>GIẢM 200K</strong> CHO
                  MỖI HỌC VIÊN HỌC THEO{" "}
                  <strong style={{ fontSize: "22px" }}>NHÓM 2 NGƯỜI.</strong>
                </p>
                <p style={{ color: "#00afab" }}>
                  <strong style={{ fontSize: "22px" }}>GIẢM 300K</strong> CHO
                  MỖI HỌC VIÊN HỌC THEO{" "}
                  <strong style={{ fontSize: "22px" }}>NHÓM TỪ 3 NGƯỜI</strong>{" "}
                  TRỞ LÊN.
                </p>
                <div className="videowrap">
                  <iframe
                    title="YouTube video player"
                    src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                    width={560}
                    height={315}
                    frameBorder={0}
                    allowFullScreen="allowfullscreen"
                  />
                </div>
              </div>
            </div>
            <div className="contentrow ctschedule">
              <h3 className="contentrow__title title --t3">Lịch học</h3>
              <div className="ctschedule__box">
                <div className="info">
                  <div className="labeltext">
                    <span className="label --blue">Khai giảng</span>
                    <p className="title --t3">
                      {localTime(schedule?.startDate) || ""}
                    </p>
                  </div>
                  <div className="labeltext">
                    <span className="label --blue">Ngày học</span>
                    <p className="title --t3">{schedule?.days}</p>
                  </div>
                  <div className="labeltext">
                    <span className="label --blue">Thời gian</span>
                    <p className="title --t3">{schedule?.time}</p>
                  </div>
                  <div className="labeltext">
                    <span className="label --blue">Địa điểm</span>
                    <p className="title --t3">{schedule?.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contentrow ctlession" ref={contentRef}>
              <h3 className="contentrow__title title --t3">
                Nội dung khoá học
              </h3>
              {/* Accordion */}
              <Accordion />
            </div>
            <div className="contentrow ctrequest">
              <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
              <div className="ctrequest__content">
                <p>Có laptop cá nhân, cài đặt phần mềm Photoshop, VSCode.</p>
                <p>
                  Đã tìm hiểu về lộ trình học frontend và biết cơ bản HTML, CSS
                  là một lợi thế
                </p>
                <p>Hạn chế tối đa nghỉ học và hoàn thành bài tập được giao.</p>
                <p>
                  Thành viên CFD Circle phải có tinh thần trách nhiệm, chủ động
                  cao trong việc học, cũng như tự học và làm thêm tại nhà.
                </p>
              </div>
            </div>
            <div className="contentrow ctteacher">
              <h3 className="contentrow__title title --t3">Giảng viên</h3>
              <div className="ctteacher__content">
                <div className="itemteacher">
                  <div className="itemteacher__avatar">
                    <img
                      src="https://cfdcircle.vn/files/avatars/VAOXpQdhq3yNvBMQlDItAYKU29ZO0gsxPTxdryL5.jpg"
                      alt="CFD Circle"
                    />
                  </div>
                  <div className="itemteacher__info">
                    <div className="itemteacher__info-name">
                      <p className="title --t3">Trần Nghĩa</p>
                      <span className="label badge --teacher">Teacher</span>
                    </div>
                    <h5 className="itemteacher__info-pos label">Founder</h5>
                    <p className="itemteacher__info-des">
                      Xin chào! Tôi là Trần Nghĩa - Creative Frontend Developer,
                      người sáng lập CFD Circle và CFD Studio. Trong hơn 7 năm
                      kinh nghiệm trong nghề, tôi luôn tạo ra những sản phẩm
                      chất lượng cao, sáng tạo, tinh tế và phù hợp cho khách
                      hàng trong và ngoài nước, cũng như mong muốn truyền đạt
                      lại cho các bạn trẻ có đam mê và định hướng theo nghề
                      Front-End Developer.
                    </p>
                  </div>
                </div>
                <div className="itemteacher">
                  <div className="itemteacher__avatar">
                    <img
                      src="https://cfdcircle.vn/files/avatars/clnqEpgnMNYKIqNbxoOHi4QPCiDhH3Fklnyz2239.jpg"
                      alt="CFD Circle"
                    />
                  </div>
                  <div className="itemteacher__info">
                    <div className="itemteacher__info-name">
                      <p className="title --t3">Đức Huy</p>
                      <span className="label badge --mentor">Mentor</span>
                    </div>
                    <h5 className="itemteacher__info-pos label">
                      Fullstack Developer
                    </h5>
                    <p className="itemteacher__info-des">
                      Xin chào! Tôi là Huy Nguyễn - Fullstack Developer, người
                      đồng sáng lập CFD Circle &amp; CFD Studio. Với mong muốn
                      truyền đạt những kinh nghiệm thực tế có được trong hơn 5
                      năm đi làm cho các bạn trẻ có đam mê với lập trình
                      front-end, cũng như back-end. Hi vọng tôi sẽ giúp cho các
                      bạn có cái đầy đủ kiến thức và kỹ năng để ứng tuyển vào vị
                      trí mà bạn hướng đến.
                    </p>
                  </div>
                </div>
                <div className="itemteacher">
                  <div className="itemteacher__avatar">
                    <img
                      src="https://cfdcircle.vn/files/avatars/3QNIeOtW3IMj0cy1OWfCAB6s8vNpMus4sOatVm20.jpg"
                      alt="CFD Circle"
                    />
                  </div>
                  <div className="itemteacher__info">
                    <div className="itemteacher__info-name">
                      <p className="title --t3">Huỳnh Anh Kiệt</p>
                      <div className="label badge --mentor">Mentor</div>
                    </div>
                    <h5 className="itemteacher__info-pos label">
                      Front-end Developer
                    </h5>
                    <p className="itemteacher__info-des">
                      Chào bạn, nếu bạn đọc những dòng này hẳn là bạn rất quan
                      tâm đến việc trở thành một developer, nhất là Front-end
                      Developer. Vì vậy, mình là Huỳnh Anh Kiệt - hiện đang làm
                      việc với vị trí Software Engineer - chapter Front-End tại
                      Kyanon Digital và CFD Studio, đồng thời, là cựu học viên
                      của CFD Circle sẽ đồng hành cùng bạn trong hành trình
                      chinh phục mong ước đó. Sau thời gian dài học tập và làm
                      việc, mình đã tích lũy được một số kinh nghiệm để có thể
                      giúp đỡ những bạn có niềm đam mê với Front-end.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured">
        <img src="/img/icon-cfd.svg" alt="" className="featured__c" />
        <div className="container">
          <div className="featured__title">
            <h2 className="title --t2 --white">
              <span>Ưu điểm</span>
              <br />
              của khoá học
            </h2>
          </div>
          <div className="featured__content">
            <div className="featured__content-item">
              <h3 className="title --t3 --white">
                Hình thức học offline hoặc online.
              </h3>
              <p>
                Học viên có thể học offline hoặc online cùng với lớp offline
                thông qua Google Meet. Trải nghiệm học và được hỗ trợ như học
                offline.
              </p>
            </div>
            <div className="featured__content-item">
              <h3 className="title --t3 --white">Hỗ trợ từng học viên 24/7</h3>
              <p>
                Ngoài những buổi học trên lớp thì khi về nhà các bạn cũng sẽ
                được hỗ trợ để hoàn thành bài tập và dự án liên tục xuyên suốt
                khoá học thông qua google meet.
              </p>
            </div>
            <div className="featured__content-item">
              <h3 className="title --t3 --white">Buổi học được quay video</h3>
              <p>
                Mỗi buổi học được quay video lại để học viên có thể xem lại khi
                cần thiết. Cũng như khi bạn nghỉ thì cũng có thể học lại thông
                qua video buổi học đó.
              </p>
            </div>
            <div className="featured__content-item">
              <h3 className="title --t3 --white">
                Được học lại miễn phí nếu hoàn thành ít nhất 42 buổi học
              </h3>
              <p>
                Khi bạn đã hoàn thành ít nhất 42/48 buổi nhưng cảm thấy chưa
                vững thì sẽ được học lại miễn phí vào khoá tiếp theo.
              </p>
            </div>
            <div className="featured__content-item">
              <h3 className="title --t3 --white">
                Hoàn thành 5-6 dự án &amp; có đủ kỹ năng ứng tuyển vị trí
                Front-end Dev
              </h3>
              <p>
                Với hình thức học thực chiến liên tục trên dự án, sau khoá học
                bạn có thể hoàn thành ít nhất 5-6 dự án website responsive và
                React Js theo bản thiết kế và có kiến thức vững chắc để ứng
                tuyển vị trí chính thức Front-end Dev tại các công ty.
              </p>
            </div>
            <div className="featured__content-item">
              <h3 className="title --t3 --white">
                Tham gia tiệc cuối khoá miễn phí
              </h3>
              <p>
                Sau mỗi khoá học, CFD Circle sẽ tổ chức tiệc cuối khoá không
                tính phí để cùng ngồi lại với nhau và chia sẻ nhằm tạo sự gắn
                kết cho tất cả học viên.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="faq --scpadding">
        <div className="container">
          <div className="faq__inner">
            <div className="heading --noline --center">
              <h2 className="heading__title title --t2">
                Câu hỏi <span className="color--primary">thường gặp</span>
              </h2>
            </div>
            <div className="faq__list">
              <div className="accordion">
                <h3 className="accordion__title label">Thông tin chung</h3>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>
                        Muốn đặt câu hỏi với giảng viên, thì phải làm sao?
                      </strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    I'd like to demonstrate a powerful little pattern called
                    “Server-Fetched Partials” that offers some tangible benefits
                    over alternatives like VueJS for simple page interactions.
                  </div>
                </div>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>Thành viên sáng lập CFD gồm những ai?</strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    Đối với hình thức học Offline hoặc Online cùng lớp offline
                    thông qua Google Meet thì học viên có thể hỏi trực tiếp
                    trong lúc học, cũng như là hỏi trên nhóm chat Facebook của
                    lớp bạn đang học, giảng viên và mentor sẽ hỗ trợ 24/7.{" "}
                    <br />
                    <br />
                    Đối với hình thức học Video Mentor, học viên có thể đặt câu
                    hỏi trong các buổi dạy online của giảng viên, cũng như là
                    hỏi trên nhóm chat Telegram của lớp bạn đang học, giảng viên
                    và mentor sẽ hỗ trợ 24/7. <br />
                    <br />
                    Đối với hình thức học Video, học viên có thể đặt câu hỏi
                    thông qua nhóm chat Facebook hỗ trợ học viên của đội ngũ
                    giảng viên và mentor CFD Circle.
                  </div>
                </div>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>
                        Học tại CFD Circle xong có đi làm hay thực tập được
                        không?
                      </strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    Khóa học thực chiến tại CFD Circle giúp học viên trải nghiệm
                    dự án, quy trình làm việc và kỹ năng thực tế cần có để không
                    chỉ xin thực tập mà còn có thể ứng tuyển các vị trí chính
                    thức cao hơn như ở các công ty.
                  </div>
                </div>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>
                        CFD Circle có cam kết đầu ra và cấp chứng chỉ không?
                      </strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    Hiện tại, CFD Circle không quảng cáo bằng cách cam kết đầu
                    ra 100% để thu hút học viên, vì thế, CFD không cam kết đầu
                    ra và chứng chỉ, điều chúng tôi làm là cố gắng hết sức để
                    truyền đạt và giúp cho tất cả học viên có thể làm được việc
                    và các kỹ năng thực tế cần có sau khóa học và ứng tuyển ít
                    nhất là vị trí fresher cho các công ty.
                  </div>
                </div>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>Học tại CFD Circle sao cho hiệu quả nhất?</strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    Học viên cần chuẩn bị đủ thời gian để học Offline hoặc
                    Online, cũng như thời gian để hoàn thành bài tập, tự học tại
                    nhà.
                    <br />
                    <br /> Tự tin vào bản thân, kiên trì, cố gắng và sức chiến
                    đấu cao không lùi bước, chủ động hỏi những vấn đề chưa rõ để
                    được giải đáp và hỗ trợ. <br />
                    <br /> Hạn chế tối đa việc nghỉ học, nếu có nghỉ thì phải
                    xin và xem lại video được ghi lại trong lúc học để hoàn
                    thành bài tập và kiến thức ngày hôm đó.
                  </div>
                </div>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>
                        Sau mỗi buổi học có quay video để xem lại không?
                      </strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    CFD Circle sẽ quay lại video buổi học offline để các bạn
                    không tham gia được có thể xem lại bằng cách đăng nhập vào
                    website CFD, chọn mục Khóa Học Của Tôi, chọn Khóa Đang Học
                    và xem lại video.
                    <br />
                    <br />
                    Bản quyền video thuộc về CFD Circle, nên nếu học viên tìm
                    cách tải video về và chia sẻ thì sẽ bị khóa tài khoản vĩnh
                    viễn.
                  </div>
                </div>
              </div>
              <div className="accordion">
                <h3 className="accordion__title label">Đăng ký, thanh toán</h3>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>
                        Đăng ký khóa học tại CFD Circle như thế nào?
                      </strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    Bạn đăng ký tài khoản, chọn khóa học muốn học, điền đầy đủ
                    thông tin và bấm đăng ký học.
                    <br />
                    <br />
                    Đối với khoá học Offline: Bạn có thể thanh toán bằng chuyển
                    khoản ngân hàng, ví điện tử Momo hoặc đóng tiền mặt tại văn
                    phòng CFD Circle. Đội ngũ CFD Circle sẽ gửi email cho bạn để
                    xác nhận khi bạn đăng ký khoá học thành công.
                    <br />
                    <br />
                    Đối với khoá học Online hoặc Video: Bạn có thể thanh toán
                    bằng chuyển khoản ngân hàng hoặc ví điện tử Momo.
                    <br />
                    <br />
                    Thông tin chuyển khoản sẽ được gửi đến email của bạn ngay
                    khi bạn đăng ký khoá học, khoá học sẽ được kích hoạt khi bạn
                    thanh toán thành công.
                  </div>
                </div>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>Làm sao để được giảm giá khoá học?</strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    Đối với khoá học Offline hoặc Online cùng lớp Offline:
                    <br />
                    - Giảm giá cho mỗi học viên khi học theo nhóm 2 người trở
                    lên (áp dụng trên từng khoá học cụ thể).
                    <br />
                    Đối với khoá học video:
                    <br />- Chương trình giảm giá tuỳ từng mỗi khoá học khác
                    nhau.
                  </div>
                </div>
                <div className="accordion__content">
                  <div className="accordion__content-title">
                    <h4>
                      <strong>
                        Làm sao để đăng ký làm giảng viên/đối tác hoặc mentor
                        tại CFD Circle
                      </strong>
                    </h4>
                  </div>
                  <div className="accordion__content-text">
                    Đối với giảng viên/đối tác:
                    <br />
                    Bạn có thể đăng ký trở thành giảng viên/đối tác nội dung cho
                    CFD Circle thì vui lòng bấm{" "}
                    <a
                      href="https://cfdcircle.vn/dang-ky-giang-vien"
                      target="_blank"
                    >
                      <strong>đăng ký giảng viên</strong>
                    </a>
                    . <br />
                    <br />
                    Đối với mentor:
                    <br />
                    CFD Circle sẽ thông báo tuyển dụng mentor rộng rãi thông qua
                    website và nhóm Cộng đồng CFD Circle để các bạn có thể ứng
                    tuyển.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="courses">
        <div className="container">
          <div className="heading --center --noline">
            <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
          </div>
          <div className="courses__list">
            {courses?.length > 0 &&
              courses.map((course, index) => {
                const { id } = course;
                console.log("id", id);
                if (id !== courseDetail?.id) {
                  return (
                    <>
                      <CourseItem key={id || index} {...course} />
                      {/* <div className="courses__list-item" key={index}>
                      <div className="img">
                        <a href="course-detail.html">
                          <img
                            src={image || ""}
                            alt="Khóa học CFD"
                            className="course__thumbnail"
                          />
                          <span className="course__img-badge badge">
                            {tags?.join(" | ")}
                          </span>
                        </a>
                      </div>
                      <div className="content">
                        <p className="label">Frontend</p>
                        <h3 className="title --t3">
                          <a href="https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-newbie-28">
                            {title || ""}
                          </a>
                        </h3>
                        <div className="content__info">
                          <div className="user">
                            <div className="user__img">
                              <img
                                src="https://cfdcircle.vn/files/avatars/480x480/VAOXpQdhq3yNvBMQlDItAYKU29ZO0gsxPTxdryL5.jpg"
                                alt="Avatar teacher"
                              />
                            </div>
                            <p className="user__name">Trần Nghĩa</p>
                          </div>
                          <div className="price">
                            <strong className="price__discount">
                              {formatCurrency(price) || ""} đ
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    </>
                  );
                }
                return;
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
