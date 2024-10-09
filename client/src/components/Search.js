import React, { useState } from "react";

function Search({ onSearch }) {
  // State to store the GitHub username input
  const [username, setUsername] = useState("");

  // Function to handle the search operation when the button is clicked
  const handleSearch = async () => {
    await onSearch(username);
    setUsername("");
  };

  return (
    <div>
      {/* Input field for entering the GitHub username */}
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Button to trigger the search */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
