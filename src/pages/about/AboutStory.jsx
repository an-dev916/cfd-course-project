import React from "react";

const AboutStory = () => {
  return (
    <section className="aboutstory">
      <div className="container">
        <div className="aboutstory__img">
          <img src="/img/cfd-circle-team.jpg" alt="" />
        </div>
        <div className="aboutstory__content">
          <h1 className="title --t2">
            <span className="color--primary">Câu chuyện</span> CFD Circle
          </h1>
          <p className="text">
            Chúng tôi đã từng thắc mắc tại sao nhiều bạn đã học ở các trường đại
            học nhưng khi đi làm cho các doanh nghiệp thì phải đào tạo lại? Làm
            sao để giúp được cho những bạn trái ngành có thể học và đi làm trong
            thời gian ngắn nhất? Và làm thế nào để tạo ra nhiều sản phẩm website
            có trải nghiệm người dùng tốt nhất? <br />
            <br />
            Từ đó, CFD Circle ra đời để giải quyết tất cả những vấn đề trên với
            mong muốn tạo ra nhiều sản phẩm website chất lượng, tinh tế và có
            giá trị cao cho Việt Nam và thế giới.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
