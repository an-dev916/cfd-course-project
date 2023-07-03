import React from "react";
import CallRegister from "../../components/CallRegister";
import AboutBenefit from "./AboutBenefit";
import AboutGallery from "./AboutGallery";
import AboutNumbers from "./AboutNumbers";
import AboutStory from "./AboutStory";
import AboutStudy from "./AboutStudy";
import AboutTeachers from "./AboutTeachers";
import HeroBanner from "./HeroBanner";

const About = () => {
  return (
    <main className="mainwrapper aboutpage">
      <HeroBanner />
      <AboutStory />
      <AboutBenefit />
      <AboutNumbers />
      <AboutStudy />
      <AboutGallery />
      <AboutTeachers />
      <CallRegister />
    </main>
  );
};

export default About;
