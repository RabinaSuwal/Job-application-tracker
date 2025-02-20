import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobList from "./JobList";

const JobForm = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [newJob, setNewJob] = useState({ company: "", position: "", status: "", deadline: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    const updatedJobs = [...jobs, job];
    setJobs(updatedJobs);
  };

  const updateJob = (jobToUpdate, updatedFields) => {
    const updatedJobs = jobs.map((job) =>
      job === jobToUpdate ? { ...job, ...updatedFields } : job
    );
    setJobs(updatedJobs);
  };

  const deleteJob = (jobToDelete) => {
    const updatedJobs = jobs.filter((job) => job !== jobToDelete);
    setJobs(updatedJobs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newJob.company || !newJob.position || !newJob.status || !newJob.deadline) {
      alert("Please fill in all fields!");
      return;
    }

    fetch("http://localhost:8000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Job added:", data);
        addJob(data);
      })
      .catch((error) => console.error("Error adding job:", error));

    setNewJob({ company: "", position: "", status: "", deadline: "" });
    setIsFormVisible(false);
  };

  return (
    <div className="job-form-container">
      <button className="post-btn" onClick={() => setIsFormVisible(true)}>Post Job</button>

      {isFormVisible && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <button className="close-btn" onClick={() => setIsFormVisible(false)}>✖</button>
            <h2>Add Job</h2>
            <form onSubmit={handleSubmit} className="job-form">
              <input type="text" placeholder="Company" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
              <input type="text" placeholder="Position" value={newJob.position} onChange={(e) => setNewJob({ ...newJob, position: e.target.value })} />
              <select value={newJob.status} onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}>
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
              </select>
              <input type="date" value={newJob.deadline} onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })} />
              <button type="submit" className="post-btn">Add Job</button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Display Job List */}
      <JobList jobs={jobs} updateJob={updateJob} deleteJob={deleteJob} />
    </div>
  );
};

export default JobForm;
