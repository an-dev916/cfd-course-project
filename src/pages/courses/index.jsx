import { Empty, message, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import CourseItem from "../../components/CourseItem";
import Input from "../../components/Input";
import useDebounce from "../../hooks/useDebounce";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";

const Courses = () => {
  const { data, loading, error, refetch } = useQuery((query) =>
    courseService.getCourses(query)
  );
  const [searchKeys, setSearchKeys] = useState("");
  const debounceSearchKeysValue = useDebounce(searchKeys, 500);
  const courses = data?.courses || [];
  useEffect(() => {
    message.config({
      top: 60,
    });
    message.success("Tải trang thành công!", 1);

    if (error) {
      message.config({
        top: 60,
      });
      message.error("Vui lòng tải lại trang!");
    }
  }, [error]);

  useEffect(() => {
    if (typeof debounceSearchKeysValue === "string") {
      refetch(
        debounceSearchKeysValue ? `?search=${debounceSearchKeysValue}` : ""
      );
    }
  }, [debounceSearchKeysValue]);
  const handleSearch = (ev) => {
    setSearchKeys(ev.target.value);
  };
  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
            <Input
              label=""
              value={searchKeys || ""}
              onChange={handleSearch}
              placeholder="Tìm kiếm khóa học"
              style={{ width: "fit-content", margin: "0 auto" }}
            ></Input>
          </div>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty
              description="Không tìm thấy dữ liệu"
              style={{ margin: "0 auto" }}
            ></Empty>
          )}
          {loading &&
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
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course.id || index} {...course} />;
            })}
        </div>
      </div>
    </main>
  );
};

export default Courses;
