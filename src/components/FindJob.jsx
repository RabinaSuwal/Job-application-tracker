import { useState } from "react";
import JobForm from "./JobForm";

const FindJob = ({ jobs, updateJob }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories for filtering jobs
  const categories = ["All", "Frontend", "Backend", "QA", "Project Manager"];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory === "All"
    ? jobs
    : jobs.filter((job) => job.position === selectedCategory);

  return (
    <div className="find-job-container">
      <h2>Find Jobs</h2>

      {/* Category buttons */}
      <div className="job-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${category === selectedCategory ? "selected" : ""}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display job list filtered by selected category */}
      <JobForm jobs={filteredJobs} updateJob={updateJob} />
    </div>
  );
};

export default FindJob;
