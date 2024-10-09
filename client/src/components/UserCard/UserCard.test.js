import React from "react";
import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";

describe("UserCard", () => {
  // Test for rendering user name and email
  test("renders user name and email", () => {
    // Create a mock user object with name and email
    const user = { name: "John Doe", email: "john.doe@example.com" };

    // Render the UserCard component with the mock user
    render(<UserCard user={user} />);

    // Assert that the user name and email are present in the document
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
  });

  // Test for rendering repository details
  test("renders repository details", () => {
    // Create a mock user object with repository details
    const user = {
      name: "John Doe",
      email: "john.doe@example.com",
      repos: [
        {
          name: "Repo1",
          description: "First repo",
          creationDate: "2024-01-01",
          lastCommitDate: "2024-01-10",
          lastCommits: ["Initial commit", "Updated README", "Fixed bugs"],
        },
      ],
    };

    // Render the UserCard component with the mock user
    render(<UserCard user={user} />);

    // Assert that the repository details are present in the document
    expect(screen.getByText(/repo1/i)).toBeInTheDocument();
    expect(screen.getByText(/first repo/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-10/i)).toBeInTheDocument();
  });

  // Snapshot test for UserCard
  test("UserCard snapshot", () => {
    // Create a mock user object with repository details for the snapshot
    const user = {
      name: "John Doe",
      email: "john.doe@example.com",
      repos: [
        {
          name: "Repo1",
          description: "First repo",
          creationDate: "2024-01-01",
          lastCommitDate: "2024-01-10",
          lastCommits: ["Initial commit", "Updated README", "Fixed bugs"],
        },
      ],
    };

    // Render the UserCard component and capture the rendered output
    const { asFragment } = render(<UserCard user={user} />);

    // Assert that the rendered output matches the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
