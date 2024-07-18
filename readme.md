# GitHub to Gitea Mirror Tool

## Description
This tool automates the process of mirroring GitHub repositories to Gitea using Node.js. It fetches repositories from a specified GitHub organization, retrieves their clone URLs, and adds them as mirrored repositories in Gitea with a specified synchronization interval.

## Installation
Before running the tool, ensure you have Node.js and npm installed on your machine.

1. Clone the repository:
   ```
   git clone https://github.com/suenot/github_to_gitea
   cd github_to_gitea
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and define the following variables:
   ```
   GITHUB_TOKEN=your-github-token
   GITHUB_ORGANIZATION=your-github-organization
   GITEA_URL=your-gitea-url
   GITEA_TOKEN=your-gitea-token
   GITEA_ORGANIZATION=your-gitea-organization
   ```

## Configuration
- `GITHUB_TOKEN`: GitHub personal access token with `repo` scope.
- `GITHUB_ORGANIZATION`: GitHub organization name from which repositories will be mirrored.
- `GITEA_URL`: Base URL of your Gitea instance.
- `GITEA_TOKEN`: Gitea personal access token with `admin:repo` scope.
- `GITEA_ORGANIZATION`: Gitea organization or user under which repositories will be mirrored.

## Usage
To run the tool, execute:
```
npm start
```

Or for development with TypeScript:
```
npm run dev
```

## Scripts
- `npm run build`: Transpiles TypeScript to JavaScript for production.
- `npm start`: Starts the application from the transpiled JavaScript.
- `npm run dev`: Runs the application in development mode with TypeScript.
- `npm test`: Placeholder for testing scripts (currently not implemented).

## Dependencies
- `axios`: Promise-based HTTP client for making API requests.
- `dotenv`: Loads environment variables from a `.env` file.

## License
This project is licensed under the MIT License.