# 🚗 Uber Clone Frontend (React + Vite)

This is the **frontend** for the Uber Clone project, built with **React** and **Vite**.  
It provides a modern, responsive user interface for both riders (users) and captains (drivers), featuring authentication, protected routes, and a smooth booking experience.

---

## 🌟 Features

- **User & Captain Authentication (Login/Signup)**
- **Protected Routes for Users and Captains**
- **Animated Panels for Trip Search and Vehicle Selection**
- **Location Search Panel with Sample Data**
- **Role-based Dashboards**
- **API Integration with Backend**
- **Responsive Design**
- **Modern UI with Tailwind CSS and Remix Icons**

---

## 🗂️ Project Structure

```
Frontend/
│
├── src/
│   ├── components/
│   │   └── LocationSearchPanel.jsx
│   ├── context/
│   │   ├── userContext.jsx
│   │   └── CaptainContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Start.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserSignup.jsx
│   │   ├── UserLogout.jsx
│   │   ├── CaptainLogin.jsx
│   │   ├── CaptainSignup.jsx
│   │   ├── CaptainHome.jsx
│   │   ├── UserProtectedWrapper.jsx
│   │   └── CaptainProtectWrapper.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── .env
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd Frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `Frontend` directory:

```
VITE_BASE_URL=http://localhost:8000/api/v1
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## 📚 Main Pages & Components

### Routing (`src/App.jsx`)

- `/` – Start page
- `/login` & `/signup` – User authentication
- `/home` – User dashboard (protected)
- `/user-logout` – User logout (protected)
- `/captain-login` & `/captain-signup` – Captain authentication
- `/captain-home` – Captain dashboard (protected)

### Authentication & Context

- `src/context/userContext.jsx` – User context provider
- `src/context/CaptainContext.jsx` – Captain context provider

### Protected Routes

- `UserProtectedWrapper.jsx` – Protects user routes, redirects to `/login` if not authenticated
- `CaptainProtectWrapper.jsx` – Protects captain routes, redirects to `/captain-login` if not authenticated

### Home Page (`src/pages/Home.jsx`)

- **Trip Search:** Enter pickup and destination locations.
- **Animated Panels:** GSAP-powered transitions for location and vehicle selection.
- **Vehicle Selection:** Choose from UberGo, Moto, or Auto with estimated prices and times.

### Location Search Panel (`src/components/LocationSearchPanel.jsx`)

- **Sample Locations:** Clickable list for demo purposes.
- **Panel Control:** Selecting a location opens the vehicle selection panel.

---

## 🛠️ Tech Stack

- **React** (with Vite)
- **React Router** for navigation
- **Axios** for API requests
- **Tailwind CSS** for styling
- **Remix Icons** for UI icons
- **GSAP** for animations

---

## 🔒 Authentication Flow

- **Login/Signup:** Calls backend API, stores access token in localStorage, and sets user/captain context.
- **Protected Routes:** If no access token, redirects to login page.
- **Logout:** Calls backend API, removes token, and redirects to login.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For any questions, suggestions, or collaboration opportunities, feel free to reach out:

**Email:** [kishansisodiya.work@gmail.com](mailto:kishansisodiya.work@gmail.com)

---

> **Note:** This is the frontend part of the Uber Clone MERN project.  
> For the backend, see the `Backend` folder or repository.