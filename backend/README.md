# Getting Started with Backend

This backend project is built with Node.js and Express.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies required to run the server.

### `npm start`

Runs the backend server in development mode.  
By default, it listens on [http://localhost:5000](http://localhost:5000) or the port defined in `.env`.

You should see logs in the terminal indicating the server is running.

### `npm run dev` *(if supported)*

Runs the server with auto-reloading using [nodemon](https://github.com/remy/nodemon).  
Useful for development, as it reloads the server on code changes.

## Environment Variables

To run the server properly, create a `.env` file in the root of the project with the following example contents:

```
PORT=5000
DB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your-secret
```

Make sure to adjust the variables to your setup.

## Project Structure

```
backend/
├── controllers/       # Logic for handling requests
├── models/            # Database models (e.g., Mongoose schemas)
├── routes/            # Route definitions
├── middleware/        # Express middleware (auth, error handling, etc.)
├── config/            # Configuration files
├── app.js             # Main app setup
├── server.js          # Entry point
└── package.json       # Project metadata and scripts
```

## Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [dotenv](https://github.com/motdotla/dotenv) for environment variable support