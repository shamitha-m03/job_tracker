// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/jobs/");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/jobs/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (response.ok) {
        fetchJobs();
        setShowForm(false);
        setNewJob({
          title: "",
          company: "",
          location: "",
          description: "",
          salary: "",
        });
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="app">
      <div className="wrapper">
        <div className="header">
          <h1>Job Listings</h1>
        </div>

        <div className="spacer">
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Post New Job"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="job-form">
          <h2>Post New Job</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={newJob.company}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={newJob.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={newJob.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Salary:</label>
              <input
                type="text"
                name="salary"
                value={newJob.salary}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Submit Job Listing</button>
          </form>
        </div>
      )}

      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h2>{job.title}</h2>
              <span className="salary">${job.salary}</span>
            </div>
            <h3>{job.company}</h3>
            <p className="location">📍 {job.location}</p>
            <p className="description">{job.description}</p>
            <p className="date">
              Posted: {new Date(job.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
