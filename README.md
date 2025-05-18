# Full Stack Project - React & Node.js (Express)

This project is a full-stack web application consisting of a React frontend and a Node.js (Express) backend.

## 📁 Project Structure

```
project-root/
├── frontend/       # React application
└── backend/        # Express API server
```

## 🚀 Getting Started

To run the full project locally, follow these steps:

### 1. Clone the repository (if not already)

```bash
git clone https://your-repo-url.git
cd project-root
```

### 2. Install dependencies

Open **two terminals**: one for the frontend and one for the backend.

#### In the backend terminal:

```bash
cd backend
npm install
npm start
```

#### In the frontend terminal:

```bash
cd frontend
npm install
npm start
```

By default:
- The **backend** runs at [http://localhost:5000](http://localhost:5000)
- The **frontend** runs at [http://localhost:3000](http://localhost:3000)

> ⚠️ Make sure both ports are available and not blocked by other processes.

## 🛠 Technologies Used

### Frontend
- React (Create React App)
- JavaScript
- Axios (for HTTP requests)

### Backend
- Node.js
- Express.js
- dotenv (for environment configuration)
- (Optionally) MongoDB / Mongoose

## 🔐 Environment Variables

Create a `.env` file in the `backend` folder with the following example:

```
PORT=5000
DB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your-secret
```

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)