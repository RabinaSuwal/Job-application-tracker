import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Appheader from "./components/Appheader";
// import FindJob from "./components/FindJob";
import Home from "./components/Home";
import JobForm from "./components/JobForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/jobs")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched jobs:", data);
        setJobs(data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const addJob = (job) => {
    fetch("http://localhost:8000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
      .then((response) => response.json())
      .then((data) => setJobs((prevJobs) => [...prevJobs, data]))
      .catch((error) => console.error("Error adding job:", error));
  };

  const updateJob = (updatedJob, changes) => {
    fetch(`http://localhost:8000/jobs/${updatedJob.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    })
      .then(() =>
        setJobs((prevJobs) =>
          prevJobs.map((job) => (job.id === updatedJob.id ? { ...job, ...changes } : job))
        )
      )
      .catch((error) => console.error("Error updating job:", error));
  };

  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" />
      <BrowserRouter>
        <Appheader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/postjob" element={<JobForm addJob={addJob} />} />
          {/* <Route path="/findjob" element={<FindJob jobs={jobs} updateJob={updateJob} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
