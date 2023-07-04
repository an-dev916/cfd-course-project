import React from "react";
// import { flickitySlider } from "../../../public/dest/main";
import CallRegister from "../../components/CallRegister";
import PageLoading from "../../components/PageLoading";
import useDebounce from "../../hooks/useDebounce";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { teamsService } from "../../services/teamsService";
import Courses from "./Courses";
import CoursesComing from "./CoursesComing";
import FAQ from "./FAQ";
import Featured from "./Featured";
import Gallery from "./Gallery";
import HeroBanner from "./HeroBanner";
import Teams from "./Teams";
import Testimonial from "./Testimonial";

const HomePage = () => {
  const { data: teamsData, loading: teamsLoading } = useQuery(() =>
    teamsService.getTeams()
  );

  const { data: courseComingData, loading: courseComingLoading } = useQuery(
    () => courseService.getCourses()
  );

  const { data: courseData, loading: courseLoading } = useQuery(() =>
    courseService.getCourses()
  );

  const isLoading = useDebounce(
    teamsLoading || courseComingLoading || courseLoading,
    500
  );

  return (
    <main className="mainwrapper">
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <HeroBanner />
          <CoursesComing
            courseComingData={courseComingData}
            courseComingLoading={courseComingLoading}
          />
          <Courses courseData={courseData} courseLoading={courseLoading} />
          <Teams teamsLoading={teamsLoading} teamsData={teamsData} />
          <Featured />
          {/* --------------------------------Testimonial-------------------------------- */}
          <Testimonial />
          {/* --------------------------------faq-------------------------------- */}
          <FAQ />
          <Gallery />
          <CallRegister />
        </>
      )}
    </main>
  );
};

export default HomePage;
