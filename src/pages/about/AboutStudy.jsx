import React from "react";

const AboutStudy = () => {
  return (
    <section className="aboutstudy --scpadding">
      <div className="container">
        <h2 className="aboutstudy__title title --t2">
          <span className="color--primary">Hình thức học</span> đa dạng
        </h2>
        <div className="aboutstudy__item">
          <div className="aboutstudy__item-img">
            <img src="/img/cfd-circle-offline.jpg" alt="" />
          </div>
          <div className="aboutstudy__item-content">
            <h4 className="title --t3">Học offline tại văn phòng</h4>
            <div className="text">
              Với trang thiết bị hiện đại, đội ngũ giảng viên &amp; mentor sẽ
              sát cánh cùng bạn trong khoá học offline tại học viện CFD Circle ở
              số 11b, Phan Kế Bính, Đa Kao, Quận 1, TP Hồ Chí Minh.
            </div>
            <a href="courses.html" className="btn btn--primary">
              Khám phá
            </a>
          </div>
        </div>
        <div className="aboutstudy__item">
          <div className="aboutstudy__item-img">
            <img src="/img/cfd-circle-online.jpg" alt="" />
          </div>
          <div className="aboutstudy__item-content">
            <h4 className="title --t3">Học online với lớp offline.</h4>
            <div className="text">
              Nếu bạn muốn học trực tiếp với giảng viên nhưng ở xa không thể đến
              lớp offline được thì có thể học online thông qua Google Meet, gọi
              video chia sẻ màn hình và được giảng viên, mentor hỗ trợ như khi
              bạn học offline.
            </div>
            <a href="courses.html" className="btn btn--primary">
              Khám phá
            </a>
          </div>
        </div>
        <div className="aboutstudy__item">
          <div className="aboutstudy__item-img">
            <img src="/img/cfd-circle-video.jpg" alt="" />
          </div>
          <div className="aboutstudy__item-content">
            <h4 className="title --t3">Học qua video &amp; live hỗ trợ 24/7</h4>
            <div className="text">
              Nền tảng học online của CFD Circle có rất nhiều khoá học video,
              bạn có thể học bất kỳ khi nào mình muốn. Đặc biệt, bạn sẽ được hỗ
              trợ từ giảng viên thông qua Google Meet hoặc đội ngũ mentor của
              CFD Circle.
            </div>
            <a href="courses.html" className="btn btn--primary">
              Khám phá
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStudy;
