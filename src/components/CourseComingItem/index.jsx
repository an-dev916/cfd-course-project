import React from "react";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { PATHS } from "../../constants/pathnames";
import { localTime } from "../../utils/localTime";
import { useAuthen } from "../AuthenContext";

const CourseComingItem = ({
  slug,
  id,
  index,
  image,
  title,
  tags,
  schedule,
}) => {
  const { openAuthenModal } = useAuthen();
  const { startDate } = schedule || {};
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  return (
    <div className="coursecoming__item" key={id || index}>
      <div className="coursecoming__item-img">
        <Link to={`${PATHS.COURSES}/${slug}`}>
          <img
            src={
              image ||
              "https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
            }
            alt="Khóa học sắp ra mắt CFD"
          />
        </Link>
      </div>
      <div className="coursecoming__item-content">
        <p className="category label">Front-end</p>
        <h2 className="title --t2">
          <Link to={`${PATHS.COURSES}/${slug}`}>{title || ""}</Link>
        </h2>
        <div className="user">
          <div className="user__img">
            <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
          </div>
          <p className="user__name">Trần Nghĩa</p>
        </div>
        <div className="info">
          <div className="labeltext">
            <span className="label --blue">Ngày khai giảng</span>
            <p className="title --t2">{localTime(startDate) || ""}</p>
          </div>
          <div className="labeltext">
            <span className="label --blue">Hình thức học</span>
            <p className="title --t2">{tags?.join(" | ") || ""}</p>
          </div>
        </div>
        <div className="btnwrap">
          {!!token ? (
            <Link to={`register/${slug}`} className="btn btn--primary">
              Đăng Ký Học
            </Link>
          ) : (
            <a onClick={() => openAuthenModal()} className="btn btn--primary">
              Đăng Ký Học
            </a>
          )}

          <Link
            to={`${PATHS.COURSES}/${slug}`}
            className="btn btn--border --black"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseComingItem;
