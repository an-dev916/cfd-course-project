import React from "react";

const AboutBenefit = () => {
  return (
    <section className="aboutbenifit --scpadding">
      <div className="container">
        <h2 className="aboutbenifit__title title --t2">
          Chúng ta sẽ{" "}
          <span className="color--primary">đồng hành cùng nhau</span> <br />
          trên con đường tạo ra những giá trị cho cộng đồng và chính mình.
        </h2>
        <div className="aboutbenifit__list">
          <div className="item">
            <div className="number title --t1">1</div>
            <div className="content">
              <h3 className="title --t3">Chương trình đào tạo thực chiến</h3>
              <p className="text">
                Tất cả khoá học tại CFD Circle luôn được kiểm duyệt rất chặt
                chẽ, đảm bảo chất lượng với nhiều cấp độ khác nhau. Cùng phương
                châm luôn hướng tới một lộ trình học sát với thực tế, học viên
                có thể ứng dụng vào công việc ngày sau khoá học.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="number title --t1">2</div>
            <div className="content">
              <h3 className="title --t3">Luôn đặt học viên làm trọng tâm</h3>
              <p className="text">
                Với mong muốn đào tạo đội ngũ nhân lực chất lượng trong lĩnh vực
                Front-End Dev và UX/UI Design, học viên tại CFD Circle luôn được
                theo sát và hỗ trợ nhiệt tình để giúp tất cả mọi người hoàn
                thành khoá học thật tốt và tạo ra những sản phẩm có giá trị cao.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="number title --t1">3</div>
            <div className="content">
              <h3 className="title --t3">
                Giảng viên giàu kinh nghiệm từ khắp mọi nơi.
              </h3>
              <p className="text">
                Với nền tảng đào tạo trực tuyến CFD Circle, giảng viên không chỉ
                dạy offline, mà còn có thể tạo ra những lớp học trực tuyến cho
                riêng mình thông qua chương trình đối tác nội dung của CFD
                Circle.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="number title --t1">4</div>
            <div className="content">
              <h3 className="title --t3">Cơ hội việc làm hấp dẫn</h3>
              <p className="text">
                Với nhu cầu rất lớn từ các doanh nghiệp trong và ngoài nước cùng
                những đối tác tuyển dụng của CFD Circle trong lĩnh vực Front-End
                Dev và UX/UI Design, học viên sẽ có cơ hội nhận được thông tin
                việc làm hấp dẫn, phù hợp với khả năng thông qua chương trình
                CFDers Talent. Ngoài ra, còn có thể trở thành mentor tại CFD
                Circle khi đáp ứng đủ yêu cầu về chuyên môn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBenefit;
