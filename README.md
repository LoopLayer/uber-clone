# 🚗 Uber Clone (MERN Stack)

Welcome to the **Uber Clone** project! This repository demonstrates a full-stack ride-hailing platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It features robust authentication, user and captain (driver) management, and a modern frontend UI.

---

## 🌟 Features

- **User & Captain (Driver) Registration/Login**
- **JWT Authentication with Secure HTTP-only Cookies**
- **Profile Management for Users and Captains**
- **Password Hashing & Validation**
- **RESTful API Structure**
- **MongoDB Integration with Mongoose**
- **Modern React Frontend**
- **CORS & Cookie Management for Seamless Integration**
- **Error Handling & Standardized API Responses**

---

## 🗂️ Project Structure

```
uber-clone/
│
├── Backend/                  # Express.js + MongoDB API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── db/
│   ├── app.js
│   ├── server.js
│   └── .env
│
└── Frontend/                 # React.js client
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api/
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── package.json
    └── .env
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone
```

### 2. Setup Backend

```bash
cd Backend
npm install
# Create a .env file (see sample below)
npm start
```

**Sample `.env` for Backend:**
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=uber_clone
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### 3. Setup Frontend

```bash
cd ../Frontend
npm install
# Create a .env file (see sample below)
npm start
```

**Sample `.env` for Frontend:**
```
REACT_APP_API_URL=http://localhost:8000/api/v1
```

---

## 📚 API Overview

### User Endpoints

| Method | Endpoint                   | Description                |
|--------|----------------------------|----------------------------|
| POST   | `/api/v1/users/register`   | Register a new user        |
| POST   | `/api/v1/users/login`      | Login as a user            |
| GET    | `/api/v1/users/profile`    | Get user profile           |
| POST   | `/api/v1/users/logout`     | Logout user                |

### Captain (Driver) Endpoints

| Method | Endpoint                      | Description                   |
|--------|-------------------------------|-------------------------------|
| POST   | `/api/v1/captains/register`   | Register a new captain        |
| POST   | `/api/v1/captains/login`      | Login as a captain            |
| GET    | `/api/v1/captains/profile`    | Get captain profile           |
| POST   | `/api/v1/captains/logout`     | Logout captain                |

---

## 🖥️ Frontend Preview

- **Modern React UI** for registration, login, and profile management.
- **Role-based dashboards** for users and captains.
- **API integration** with backend for authentication and data.
- **Responsive design** for desktop and mobile.

> **Note:** For a quick start, run both backend and frontend as described above.  
> The frontend will be available at `http://localhost:3000` (or your configured port).

---

## 🔒 Authentication & Security

- **JWT-based authentication** for both users and captains.
- **Access tokens** (short-lived) and **refresh tokens** (long-lived) are stored as HTTP-only, secure cookies.
- **Password hashing** with bcrypt.
- **CORS** configured for frontend-backend communication.

---

## 🛠️ Tech Stack

- **MongoDB** – Database
- **Express.js** – Backend API
- **React.js** – Frontend SPA
- **Node.js** – Server runtime

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Inspired by Uber's real-world ride-hailing platform.
- Built with the MERN stack for learning and demonstration purposes.

---

## 📬 Contact

For any questions, suggestions, or collaboration opportunities, feel free to reach out:

## 👨‍💻 Author

**Kishan Sisodiya**  
📧 Contact: kishansisodiya.work@gmail.com

---
