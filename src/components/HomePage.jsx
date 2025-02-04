import React from "react";
import { Route, Routes } from "react-router-dom";
import Appheader from "./Appheader";
import FindJob from "./FindJob";
import Home from "./Home";
import JobForm from "./JobForm";

const HomePage = ({ addJob, jobs, updateJob }) => {
  return (
    <div className="homepage-container">
      <div className="homepage-contents">
        <div className="left-contents">
          <Appheader />
        </div>
        <div className="right-contents">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/postjob" element={<JobForm addJob={addJob} jobs={jobs} updateJob={updateJob} />} />
            <Route path="/findjob" element={<FindJob jobs={jobs} updateJob={updateJob} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
