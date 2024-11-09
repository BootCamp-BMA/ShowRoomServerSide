# ShowRoomServerSide

This is the server-side project for managing the showroom application. The project uses Node.js, MongoDB, and Pug templating. The purpose of this repository is to serve APIs and render pages for the showroom application.

## Table of Contents
- [ShowRoomServerSide](#showroomserverside)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Development Server](#development-server)
    - [Production Deployment](#production-deployment)
  - [Scripts](#scripts)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
    - [Folder Descriptions:](#folder-descriptions)
  - [Deployment](#deployment)
  - [License](#license)

## Installation

To get started with this project, clone the repository and install the dependencies using npm.

```bash
git clone https://github.com/BootCamp-BMA/ShowRoomServerSide.git
cd ShowRoomServerSide
npm install
```

## Usage

### Development Server

To start the development server, run:

```bash
npm run dev
```

The application will run locally at [http://localhost:5000](http://localhost:5000).

### Production Deployment

The application is also hosted on Heroku and can be accessed at:

[https://show-room-server-979c93442bc5.herokuapp.com/](https://show-room-server-979c93442bc5.herokuapp.com/)

## Scripts

- `npm install` - Install dependencies
- `npm run dev` - Start the application in development mode

## Technologies Used

- **Node.js**: JavaScript runtime
- **MongoDB**: NoSQL database
- **Pug**: Templating engine for rendering views
- **Express.js**: Web framework for Node.js

## Project Structure

The project structure is as follows:

```plaintext
ShowRoomServerSide/
├── .env                # Environment variables
├── .gitignore          # Files and directories to be ignored by Git
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Lockfile for dependencies
├── Procfile            # File for Heroku deployment
├── public              # Static files (images, styles, and scripts)
│   ├── css             # Stylesheets for the application
│   ├── images          # Image files used in the app
│   └── js              # JavaScript files for the client-side
├── README.md           # Project documentation
└── src                 # Main source code
    ├── app.js          # Entry point for the application
    ├── config          # Configuration files (e.g., database, environment settings)
    ├── controllers     # Logic to handle requests and interact with the database
    ├── doc             # API documentation
    ├── middleware      # Middleware functions for request handling (e.g., authentication)
    ├── models          # Database models/schemas for MongoDB
    ├── routes          # Route definitions for handling API endpoints
    ├── services        # Business logic (e.g., services to interact with models)
    ├── utils           # Utility functions used across the app
    └── views           # Pug templates for rendering HTML pages
```

### Folder Descriptions:

- **.env**: Stores environment-specific variables such as database credentials, API keys, and other sensitive data. Make sure this file is not pushed to public repositories.

- **.gitignore**: Lists files and directories that Git should ignore (e.g., `node_modules`, `.env`).

- **package.json**: Contains metadata about the project and its dependencies.

- **package-lock.json**: Ensures that the same dependencies are installed across all environments.

- **Procfile**: Used by Heroku to define the command to run the app.

- **public**: Contains static files that are directly served to clients, such as images, stylesheets, and JavaScript files.
  - **css**: Stylesheets for the application.
  - **images**: Image files for the frontend.
  - **js**: JavaScript files for client-side functionality.

- **src**: Contains the application's main source code.
  - **app.js**: The entry point to the application, where the Express server is initialized.
  - **config**: Contains configuration files such as database settings or environment configurations.
  - **controllers**: Contains logic to handle incoming requests and send responses.
  - **doc**: API documentation files, possibly including Swagger or other formats.
  - **middleware**: Functions that execute during the request-response cycle, such as for authentication, logging, or error handling.
  - **models**: Contains MongoDB database schemas and models used to interact with data.
  - **routes**: Defines the application's routes and maps them to controllers.
  - **services**: Contains business logic, services that interact with the models, and perform operations.
  - **utils**: Utility functions and helpers that are used across various parts of the app.
  - **views**: Pug templates used to render HTML views.

## Deployment

This application is deployed on Heroku. To deploy updates, push changes to the Heroku remote repository.

## License

This project does not specify a license.
