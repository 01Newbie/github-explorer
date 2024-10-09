// Import necessary modules using ES module syntax
import express from "express";
import helmet from "helmet";
import cors from "cors";
import axios from "axios";

// Create an instance of the Express app
const app = express();

// Middleware for security, CORS, and JSON parsing
app.use(helmet());
app.use(cors());
app.use(express.json());

// Define a route to fetch GitHub user and repository information
app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch GitHub user data using GitHub's public API
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const userData = userResponse.data;

    // Fetch user's public repositories from GitHub
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = reposResponse.data;

    // Fetch the last 5 commits for each repository
    const repoDetailsPromises = repos.map(async (repo) => {
      try {
        // Fetch commits for each repository
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/commits`
        );
        return {
          ...repo, // Include the repository's original details
          lastCommitDate:
            commitsResponse.data[0]?.commit.committer.date || "No commits", // Date of the last commit
          last5Commits: commitsResponse.data
            .slice(0, 5)
            .map((commit) => commit.commit.message), // List of the last 5 commit messages
        };
      } catch (error) {
        // If there's an error fetching the commits, return default data
        console.error(
          `Error fetching commits for ${repo.name}:`,
          error.message
        );
        return {
          ...repo,
          lastCommitDate: "No commits available",
          last5Commits: [],
        };
      }
    });

    // Wait for all promises to resolve (fetch commit data for all repos)
    const repoDetails = await Promise.all(repoDetailsPromises);

    // Send the user data and repository details as JSON response
    res.json({
      userData,
      repoDetails,
    });
  } catch (error) {
    // Handle errors gracefully by responding with appropriate status and message
    if (error.response) {
      // If GitHub API responds with an error, log details and return status
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
      res
        .status(error.response.status)
        .json({
          message:
            error.response.data.message ||
            "Failed to fetch user or repositories",
        });
    } else {
      // Handle unexpected errors (e.g., network issues)
      console.error("Error message:", error.message);
      res.status(500).json({ message: "Failed to fetch user or repositories" });
    }
  }
});

// Start the server on a specified port (default: 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app instance for testing or use in other files
export default app;
