# GitHub User and Repository Fetcher

## Description

This project is a simple Express-based API that fetches GitHub user information and their public repositories. It also retrieves the last 5 commit messages for each repository. The server uses **Helmet** for security and **Axios** for making HTTP requests to the GitHub API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetch user details from GitHub.
- List public repositories for the user.
- Display the last 5 commits for each repository.
- Secure API with Helmet middleware.
- CORS enabled for cross-origin requests.

## Technologies Used

- **Backend**:

  - Node.js
  - Express
  - Axios
  - Helmet
  - CORS

- **Testing**:
  - Jest
  - Supertest

## Installation

Clone the repository: git clone https://github.com/01Newbie/github-explorer
Navigate to the project directory: cd github-explorer
Install the dependencies: npm install
Start the server: node server.js
Open Postman to test the API.

### API Endpoints

#### Get User and Repository Data

- **Endpoint**: `/api/users/:username`
- **Method**: `GET`
- **Parameters**:
  - **username**: GitHub username to fetch data for.
- **Response**:
  - **userData**: An object containing GitHub user information.
  - **repoDetails**: An array of objects containing repository details and the last 5 commit messages.

### Testing

- **To run the tests**: npm test

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.