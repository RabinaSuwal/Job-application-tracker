import { useState } from "react";

const JobList = ({ jobs, updateJob, deleteJob }) => {
  return (
    <>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <JobRow key={index} job={job} updateJob={updateJob} deleteJob={deleteJob} />
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

const JobRow = ({ job, updateJob, deleteJob }) => {
  const [status, setStatus] = useState(job.status);
  const [notes, setNotes] = useState(job.notes || "");
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({ ...job });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    updateJob(job, { status: e.target.value });
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    updateJob(job, { notes: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMenuOpen(false);
  };

  const handleSaveClick = () => {
    updateJob(job, editedJob);
    setIsEditing(false);
    setMenuOpen(false);
  };

  const handleDeleteClick = () => {
    deleteJob(job);
    setMenuOpen(false);
  };

  const handleChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
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
      <td>
        {isEditing ? (
          <input type="text" name="company" value={editedJob.company} onChange={handleChange} />
        ) : (
          job.company
        )}
      </td>
      <td>
        {isEditing ? (
          <input type="text" name="position" value={editedJob.position} onChange={handleChange} />
        ) : (
          job.position
        )}
      </td>
      <td>
        {isEditing ? (
          <select name="status" value={editedJob.status} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        ) : (
          <select value={status} onChange={handleStatusChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        )}
      </td>
      <td>
        {isEditing ? (
          <input type="date" name="deadline" value={editedJob.deadline} onChange={handleChange} />
        ) : (
          job.deadline
        )}
      </td>
      <td>
        <input type="text" value={notes} onChange={handleNotesChange} placeholder="Add notes" />
      </td>
      <td>
        <button onClick={addToCalendar} className='add-calendar'>📅 Add to Calendar</button>
      </td>
      <td>
        <div className="menu-container">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>...</button>
          {menuOpen && (
            <div className="menu-dropdown">
              {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )}
              <button onClick={handleDeleteClick}>Delete</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default JobList;
