import { useState } from "react";

const JobList = ({ jobs, updateJob }) => {
  return (
    <>
      <h2>Job Listings</h2>
      <div className="job-list-container">
        {jobs.length > 0 ? (
          <table className="job-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <JobRow key={index} job={job} updateJob={updateJob} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No jobs added yet.</p>
        )}
      </div>
    </>
  );
};

const JobRow = ({ job, updateJob }) => {
  const [status, setStatus] = useState(job.status);
  const [notes, setNotes] = useState(job.notes || "");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    updateJob(job, { status: e.target.value });
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    updateJob(job, { notes: e.target.value });
  };

  const addToCalendar = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      job.position + " Interview"
    )}&dates=${job.deadline.replace(/-/g, "")}/${job.deadline.replace(/-/g, "")}&details=${encodeURIComponent(
      job.company
    )}`;
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <tr>
      <td>{job.company}</td>
      <td>{job.position}</td>
      <td>
        <select value={status} onChange={handleStatusChange}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td>{job.deadline}</td>
      <td>
        <input type="text" value={notes} onChange={handleNotesChange} placeholder="Add notes" />
      </td>
      <td>
        <button onClick={addToCalendar}>📅 Add to Calendar</button>
      </td>
    </tr>
  );
};

export default JobList;
