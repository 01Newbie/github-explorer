import React from "react";

function UserDetails({ user }) {
  return (
    <div>
      {/* Render the user's login name */}
      <h2>{user.login}</h2>
      {/* Display the user's avatar with an alt text */}
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="100" />
      {/* Render the user's bio or a default message if not available */}
      <p>{user.bio || "No bio available"}</p>
      {/* Display the count of public repositories */}
      <p>Public Repos: {user.public_repos}</p>
    </div>
  );
}

export default UserDetails;
