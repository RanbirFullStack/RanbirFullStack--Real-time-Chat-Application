# Real-time Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for real-time communication.

## Features

- User authentication (register/login)
- Real-time messaging
- Chat rooms
- Message history
- Modern UI with Material-UI
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-application
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-secret-key
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile (requires authentication)

### Messages
- GET /api/messages/room/:roomId - Get messages for a specific room
- POST /api/messages - Send a new message
- PATCH /api/messages/:messageId/read - Mark message as read

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Socket.io-client
  - Axios
  - React Router

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Socket.io
  - JWT for authentication
  - bcryptjs for password hashing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 