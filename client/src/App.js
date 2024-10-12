import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import routing components
import Search from "./components/Search";
import axios from "axios";
import UserDetails from "./components/UserDetails"; // Import UserDetails component
import "./App.css";

const App = () => {
  // State to store the user information
  const [user, setUser] = useState(null);
  // State to store the repositories of the user
  const [repos, setRepos] = useState([]);
  // State to manage any error messages
  const [error, setError] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to store search history
  const [history, setHistory] = useState([]);

  // Function to handle the search operation
  const handleSearch = async (username) => {
    setLoading(true);
    try {
      // Make a single request to the backend API to fetch user data
      const response = await axios.get(
        `http://localhost:5000/api/users/${username}`
      );

      const { userData, repoDetails } = response.data;

      // Update states with the fetched data
      setUser(userData);
      setRepos(repoDetails);
      setError(null);
      setHistory((prev) => [...prev, username]);
    } catch (error) {
      // Handle errors that occur during the API request
      setError("User not found");
      setUser(null);
      setRepos([]);
    } finally {
      // Always executed after try/catch, even if there's an error
      setLoading(false);
    }
  };

  return (
    <Router>
      <div>
        <h1>GitHub User Search</h1>
        {/* Search component for inputting the username */}
        <Search onSearch={handleSearch} />
        {loading && <p>Loading...</p>}{" "}
        {/* Show loading text while fetching data */}
        {error && <p>{error}</p>} {/* Display error message if any */}
        
        {/* Main route to display search results */}
        <Routes>
          <Route path="/" element={
            <div>
              {user && (
                <div>
                  <h2>{user.name}</h2>
                  <img src={user.avatar_url} alt={user.name} width="150" />
                  <p>{user.bio}</p>
                  <p>Public Repos: {user.public_repos}</p>
                  {/* Link to the user's GitHub profile */}
                  <p>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                      View GitHub Profile
                    </a>
                  </p>
                </div>
              )}
              {repos.length > 0 && (
                <div>
                  <h2>Repositories:</h2>
                  <ul>
                    {repos.map((repo, index) => (
                      <li key={index}>
                        <Link to={`/user/${repo.owner.login}`}>{repo.name}</Link> {/* Link to the user details */}
                        <p>Description: {repo.description}</p>
                        <p>
                          Creation Date:{" "}
                          {new Date(repo.created_at).toLocaleDateString()}
                        </p>
                        <p>
                          Last Commit Date:{" "}
                          {repo.lastCommitDate
                            ? new Date(repo.lastCommitDate).toLocaleDateString()
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
          } />
          <Route path="/user/:username" element={<UserDetails user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
