import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Search from "./components/Search";
import axios from "axios";
import UserDetails from "./components/UserDetails";
import { ThreeDots } from "react-loading-icons";
import "./App.css";

// State hooks for managing user data, repositories, errors, loading status, and search history
const App = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle user search
  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${username}`
      );

      // Destructure user data and repository details from the response
      const { userData, repoDetails } = response.data;

      // Update state with the fetched user data and repositories
      setUser(userData);
      setRepos(repoDetails);
      setHistory((prev) => [...prev, username]);
      setSuccessMessage("User found!");
    } catch (error) {
      setError("User not found. Please check the username and try again.");
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app-container">
        {/* Main heading for the application */}
        <h1>GitHub User Search</h1>
        <Search onSearch={handleSearch} />

        {/* Loading indicator */}
        {loading && (
          <div className="loading-container">
            <ThreeDots fill="#00BFFF" width="150" height="150" />
            <p>Loading user data...</p>
          </div>
        )}

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Display success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <Routes>
          <Route
            path="/"
            element={
              <div className="results-container">
                {user && (
                  <div className="user-info">
                    <h2>{user.name}</h2>
                    <img src={user.avatar_url} alt={user.name} width="150" />
                    <p>{user.bio}</p>
                    <p>Public Repos: {user.public_repos}</p>
                    <p>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link"
                      >
                        View GitHub Profile
                      </a>
                    </p>
                  </div>
                )}
                {repos.length > 0 && (
                  <div className="repos-info">
                    <h2>Repositories:</h2>
                    <ul>
                      {repos.map((repo, index) => (
                        <li key={index} className="repo-item">
                          <Link to={`/user/${repo.owner.login}`}>
                            {repo.name}
                          </Link>
                          <p>
                            Description:{" "}
                            {repo.description || "No description available."}
                          </p>
                          <p>
                            Creation Date:{" "}
                            {new Date(repo.created_at).toLocaleDateString()}
                          </p>
                          <p>
                            Last Commit Date:{" "}
                            {repo.lastCommitDate
                              ? new Date(
                                  repo.lastCommitDate
                                ).toLocaleDateString()
                              : "No commits"}
                          </p>
                          <p>Last 5 Commits:</p>
                          <ul>
                            {repo.last5Commits.map((commit, commitIndex) => (
                              <li key={commitIndex}>{commit}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <h2>Search History</h2>
                <ul>
                  {history.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            }
          />
          <Route path="/user/:username" element={<UserDetails user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
