import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import { formatCurrency } from "../../utils/format";

const CourseItem = ({ id, slug, tags, name, price, image, title, teams }) => {
  const teacher = teams?.find((el) => el.tags.includes("Teacher"));
  const mentor = teams?.find((el) => el.tags.includes("Mentor"));
  return (
    <div className="courses__list-item" key={id}>
      <div className="img">
        <Link to={`${PATHS.COURSES}/${slug}`}>
          <img src={image} alt={slug} className="course__thumbnail" />
          {tags && (
            <span className="course__img-badge badge">
              {tags.join(" | ") || ""}
            </span>
          )}
        </Link>
      </div>
      <div className="content">
        <p className="label">{title}</p>
        <h3 className="title --t3">
          <Link to={`${PATHS.COURSES}/${slug}`}>{name}</Link>
        </h3>
        <div className="content__info">
          <div className="user">
            <div className="user__img">
              <img src={teacher.image || mentor.image} alt="Avatar teacher" />
            </div>
            <p className="user__name">{teacher.name || mentor.name}</p>
          </div>
          <div className="price">
            <strong>{formatCurrency(price)} đ</strong>
          </div>
        </div>
        <div className="content__action">
          <Link
            to={`${PATHS.COURSE_ORDER}/${slug}`}
            className="btn btn--primary"
          >
            Đăng ký ngay
          </Link>
          <Link
            to={`${PATHS.COURSE_ORDER}/${slug}`}
            className="btn btn--default"
          >
            <img src="/img/icon-paper.svg" alt="icon paper" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
