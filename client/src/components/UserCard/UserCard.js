import React from "react";

const UserCard = ({ user }) => {
  return (
    <div>
      {/* Render the user's name */}
      <h2>{user.name}</h2>
      {/* Display the user's email */}
      <p>{user.email}</p>

      {/* Check if the user has any repositories */}
      {user.repos && user.repos.length > 0 ? (
        <div>
          {/* Render the section header for repositories */}
          <h3>Repositories:</h3>
          {/* Iterate through each repository and display its details */}
          {user.repos.map((repo, index) => (
            <div key={index}>
              {/* Render the repository name */}
              <h4>{repo.name}</h4>
              {/* Display the repository description */}
              <p>{repo.description}</p>
              {/* Show the creation date of the repository */}
              <p>Created on: {repo.creationDate}</p>
              {/* Show the date of the last commit */}
              <p>Last commit: {repo.lastCommitDate}</p>
              {/* Display last commits if they exist */}
              {repo.lastCommits && repo.lastCommits.length > 0 && (
                <div>
                  {/* Render the section header for last commits */}
                  <h5>Last Commits:</h5>
                  <ul>
                    {/* Iterate through the last commits and display each one */}
                    {repo.lastCommits.map((commit, commitIndex) => (
                      <li key={commitIndex}>{commit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Optional message for no repositories available
        <p>No repositories available.</p>
      )}
    </div>
  );
};

export default UserCard;
