import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDetails({ match }) {
  const { username } = match.params; // Get the username from the URL
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${username}`);
        setUser(response.data.userData);
      } catch (err) {
        setError("User not found");
      }
    };
    fetchUserData();
  }, [username]);

  return (
    <div>
      {error && <p>{error}</p>}
      {user && (
        <>
          <h2>{user.login}</h2>
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="100" />
          <p>{user.bio || "No bio available"}</p>
          <p>Public Repos: {user.public_repos}</p>
        </>
      )}
    </div>
  );
}

export default UserDetails;
