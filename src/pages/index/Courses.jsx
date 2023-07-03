import { Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CourseItem from "../../components/CourseItem";
import { PATHS } from "../../constants/pathnames";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";

const Courses = ({ courseData, courseLoading }) => {
  const courses = courseData?.courses;

  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>
        <div className="courses__list">
          {courseLoading &&
            Array(4)
              .fill("")
              .map((_, index) => {
                return (
                  <div className="courses__list-item" key={index}>
                    <Skeleton
                      style={{ width: "521.14px", height: "629px" }}
                      active
                    />
                  </div>
                );
              })}
          {courses?.length > 0 &&
            !courseLoading &&
            courses.map((course, index) => {
              return <CourseItem key={course.id || index} {...course} />;
            })}
        </div>
        <div className="courses__btnall">
          <Link to={PATHS.COURSES} className="course__btn btn btn--grey">
            Tất cả khoá học
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
