import React from "react";

const AccordionText = () => {
  return (
    <div
      className="accordion__content-text --transparent"
      style={{ display: "none" }}
    >
      <div className="item --lock">
        <p>
          <i>
            <img src="https://cfdcircle.vn/img/iconlock.svg" alt="CFD Circle" />
          </i>
          <span>Thiết lập Photoshop cho Front-end Dev</span>
        </p>
      </div>
      <div className="item --lock">
        <p>
          <i>
            <img src="https://cfdcircle.vn/img/iconlock.svg" alt="CFD Circle" />
          </i>
          <span>Giới thiệu các công cụ thao tác với bản thiết kế</span>
        </p>
      </div>
      <div className="item --lock">
        <p>
          <i>
            <img src="https://cfdcircle.vn/img/iconlock.svg" alt="CFD Circle" />
          </i>
          <span>
            Đo đạc text, size, màu sắc, font chữ, resize, crop, export hình từ
            Photoshop &amp; Figma
          </span>
        </p>
      </div>
      <div className="item --lock">
        <p>
          <i>
            <img src="https://cfdcircle.vn/img/iconlock.svg" alt="CFD Circle" />
          </i>
          <span>Kiến thức tổng quan thiết kế giao diện website</span>
        </p>
      </div>
      <div className="item --lock">
        <p>
          <i>
            <img src="https://cfdcircle.vn/img/iconlock.svg" alt="CFD Circle" />
          </i>
          <span>Chrome Dev Tool</span>
        </p>
      </div>
    </div>
  );
};

export default AccordionText;
