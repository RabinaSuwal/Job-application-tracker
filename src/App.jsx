import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Appheader from "./components/Appheader";
import FindJob from "./components/FindJob";
import Home from "./components/Home";
import JobForm from "./components/JobForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, notes: "" }]);
  };

  const updateJob = (updatedJob, changes) => {
    setJobs(jobs.map((job) => (job === updatedJob ? { ...job, ...changes } : job)));
  };

  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" />
      <BrowserRouter>
        <Appheader /> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Show JobForm only on "/postjob" route */}
          <Route path="/postjob" element={<JobForm addJob={addJob} jobs={jobs} updateJob={updateJob} />} />
          <Route path="/findjob" element={<FindJob jobs={jobs} updateJob={updateJob}/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
