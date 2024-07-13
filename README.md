# Task Manager Application

## Description
This is a full-stack Task Manager application built with Node.js, Express, MongoDB, and React. It allows users to create, read, update, and delete tasks, as well as manage their user profiles.

## Features
- User authentication (register, login, logout)
- Task management (create, read, update, delete)
- User profile management
- Task filtering and sorting
- Responsive design

## Technologies Used
- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js, Axios
- Authentication: JSON Web Tokens (JWT)
- Additional libraries: bcryptjs, mongoose

## Prerequisites
- Node.js (v14 or later)
- MongoDB

## Installation

### Backend Setup
1. Clone the repository:git clone https://github.com/your-username/task-manager.git
cd task-manager/backend
2. Install dependencies:
npm install
3. Create a `.env` file in the backend root directory with the following variables:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
4. Start the server:
npm start

### Frontend Setup
1. Navigate to the frontend directory:
cd ../frontend
2. Install dependencies:
npm install
3. Create a `.env` file in the frontend root directory with the following variable:
REACT_APP_API_URL=http://localhost:5000
4. Start the React development server:
npm start

## Usage
- Register a new account or login with existing credentials
- Create, view, update, and delete tasks
- Update your user profile
- Filter and sort tasks based on status and due date

## API Endpoints

### User Routes
- POST /api/users/register - Register a new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile
- PATCH /api/users/profile - Update user profile

### Task Routes
- GET /api/tasks - Get all tasks for the authenticated user
- POST /api/tasks - Create a new task
- GET /api/tasks/:id - Get a specific task
- PATCH /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Assumptions and Design Decisions

1. Authentication: We use JWT for authentication, assuming that it provides sufficient security for this application. Tokens are stored in localStorage, which may not be suitable for high-security applications.

2. Database: We assume MongoDB is suitable for this application due to its flexibility with document structures. This may need to be reconsidered if complex relationships between data emerge in future development.

3. User Avatars: The current implementation assumes a simple string URL for avatars. A more robust file upload and storage system may be needed for production.

4. Task Due Dates: We assume that task due dates are optional. The application allows tasks without due dates.

5. Task Statuses: We've implemented three static statuses: "To Do", "In Progress", and "Done". This may need to be made more flexible if different workflow statuses are required.

6. Frontend State Management: We use React's Context API for state management, assuming the application's complexity doesn't warrant more robust solutions like Redux.

7. Error Handling: We've implemented basic error handling, assuming that more detailed error messages aren't required for end-users. This may need to be expanded for debugging in production.

8. Scalability: The current implementation assumes a relatively small user base. Additional optimizations may be necessary for larger scale deployments.

