// This test suite is for testing the GitHub API routes in the Express application.
import request from "supertest";
import app from "../server.js";

// Define the test suite for GitHub API routes using 'describe'
describe("GitHub API Routes", () => {
  // First test case: It should return GitHub user data and repository details for a valid username
  it("should return GitHub user data and repo details for a valid username", async () => {
    // Send a GET request to the API endpoint with a valid GitHub username
    const response = await request(app).get("/api/users/octocat");

    // Expect the status code of the response to be 200 (success)
    expect(response.statusCode).toBe(200);

    // Expect the response body to have a 'userData' property
    expect(response.body).toHaveProperty("userData");

    // Check if the 'userData' object has a 'login' property with the value 'octocat'
    expect(response.body.userData).toHaveProperty("login", "octocat");

    // Expect the response body to have a 'repoDetails' property
    expect(response.body).toHaveProperty("repoDetails");

    // Ensure that 'repoDetails' is an array of repositories
    expect(Array.isArray(response.body.repoDetails)).toBe(true);
  });

  // Second test case: It should return a 404 status for an invalid GitHub username
  it("should return 404 for an invalid GitHub username", async () => {
    // Send a GET request to the API endpoint with a non-existent GitHub username
    const response = await request(app).get("/api/users/nonexistentuser1234");

    // Expect the status code of the response to be 404 (not found)
    expect(response.statusCode).toBe(404);
  });
});
