📚 School Management System
A modern, full-stack school management web application built with the MERN stack (MongoDB, Express, React, Node.js) and styled using Material-UI (MUI). It supports user roles such as Admin, Teacher, Student, and Parent.

🚀 Features
🔐 User Authentication & Authorization (JWT + bcrypt)

🎓 Role-based Dashboards (Admin, Teacher, Student, Parent)

📋 Student & Teacher Management

📝 Assignments & Grades Tracking

📅 Attendance Monitoring

💳 Fee Management

📊 Responsive UI using Material-UI (v5)

🛠 Tech Stack
Frontend:

React.js

Redux Toolkit

React Router

Material UI (MUI v5)

Backend:

Node.js

Express.js

MongoDB (via Mongoose)

JWT & bcrypt for auth

🔧 Installation
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/AmitGiri1281/schoolmangement.git
cd schoolmangement
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file inside backend/:

env
Copy
Edit
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/edumanagepro?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
Start the backend server:

bash
Copy
Edit
npm start
3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
Start the frontend development server:

bash
Copy
Edit
npm start
🌐 Deployment
🖥 Frontend on Vercel
Set root directory to /frontend

Build Command: npm run build

Output Directory: build

Environment Variable: REACT_APP_API_URL=http://localhost:5000/api (or your backend URL)

🛠 Backend on Render
Root Directory: /backend

Build Command: npm install

Start Command: node server.js

Add environment variables from .env

📁 Folder Structure
bash
Copy
Edit
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  └── server.js

/frontend
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   ├── redux/
  │   └── App.js
  └── public/# schoolmangement    


  THANK YOU (:
