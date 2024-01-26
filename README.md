# Imager (Frontend)

Imager is a simple web-application that allows users to browse and share places of interests.

## Background

This repository holds the frontend source-code.

Imager frontend is a ReactJS single-page application built with Vite. Page routes and navigation are made possible with React Router, while a few of the component transitions are made possible with React Transition Group. Google Maps Platform integration to facilitate display of map location for saved places. User authentication handled via JWT issued from backend.

## Features

- Non-registered visitors are able to see list of users and the number of places shared by each of them.
- Non-registered visitors are able to sign up for a new account, after which they take the role of registered users and can begin sharing places of interests.
- For each place, a place name, description and address must be provided.
- The address would be parsed in the backend to derive a pair of lat/lng coordinates that would facilitate display of map location.
- Registered users are provided with the means to update the title and description of their shared places, in addition to deleting records too.
- Registered users can also browse other users' collections, but can only update/remove items in their own collection.

## Setup

### Pre-requisite:

- Backend has been successfully set up and hosted, with a valid endpoint URL for the frontend to reach.
- A valid API key has been obtained from Google Maps Platform for usage within Imager frontend.

### Steps:

1. Clone this repository in terminal.

```bash
git clone git@github.com:eugeneyan84/imager-frontend.git
```

2. Navigate into the project folder in terminal, install all dependencies.

```bash
npm install
```

From this point on, there are 2 options to serving the frontend:

#### Option A: Serve directly from code server (e.g Visual Studio Code)

3. Rename `.env_template` file in project root directory to `.env`, and provide the necessary values as captured from the _Pre-requisite_ section. Ensure backend URL (e.g. http://localhost:8080) does not end with backslash.

```
# .env file
VITE_GOOGLE_MAPS_API_KEY=<google api key>
VITE_BACKEND_HOSTNAME=<backend url with port>
```

4. Navigate to project folder in terminal, run the project:

```bash
~/imager-frontend$ npm run dev
```

#### Option B: Serve as a Dockerized application

3. Navigate to project folder in terminal and use the following build command, while ensuring the 2 build arguments are provided correctly.

```bash
docker build -f Dockerfile.dev --build-arg VITE_GOOGLE_MAPS_API_KEY=<google api key> --build-arg VITE_BACKEND_HOSTNAME=<backend url with port> -t imager-frontend .
```

4. After verifying that Docker image has been successfully built, use the following run command in terminal to spin up a container in detached mode.

```bash
docker run -d -p 80:8080 imager-frontend
```

_Note: Edit the Docker commands accordingly if you choose to perform additional actions like tagging._

> Written with [StackEdit](https://stackedit.io/).
