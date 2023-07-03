import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const BlogItem = ({ id, cateName, name, author, updatedAt, index, slug }) => {
  const editDate = moment(updatedAt).calendar().split("/");
  const uploadedDate = `${editDate[1]}/${editDate[0]}/${editDate[2]}`;
  return (
    <div className="blog__list-item" key={id || index}>
      <div className="img">
        <Link to={`${PATHS.BLOG}/${slug}`}>
          <img
            src="https://cfdcircle.vn/files/thumbnails/JuQE6Rd3DGuiHJOpgEb3Jg1KoLoa25OlLrl1pDQa.jpg"
            alt="Khóa học CFD"
            className="course__thumbnail"
          />
        </Link>
      </div>
      <div className="content">
        <p className="label">{cateName || ""}</p>
        <h2 className="title --t3">
          <Link to={`${PATHS.BLOG}/${slug}`}>{name || ""}</Link>
        </h2>
        <div className="content__info">
          <div className="user">
            <div className="user__img">
              <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
            </div>
            <p className="user__name">{author || ""}</p>
          </div>
          <div className="date">{uploadedDate || ""}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
