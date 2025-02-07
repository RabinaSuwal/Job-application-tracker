import { useState } from "react";
import JobList from "./JobList";

const FindJob = ({ jobs, updateJob }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Frontend", "Backend", "QA", "Project Manager"];

  const filteredJobs =
    selectedCategory === "All"
      ? jobs
      : jobs.filter((job) =>
          job.position.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="find-job-container">
      <h2>Recommended Jobs</h2>

      <div className="job-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${category === selectedCategory ? "selected" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ✅ Show only if there are jobs */}
      {filteredJobs.length > 0 ? (
        <JobList jobs={filteredJobs} updateJob={updateJob} />
      ) : (
        <p>No recommended jobs available.</p>
      )}
    </div>
  );
};

export default FindJob;
