import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
const navigate = useNavigate();
  const logoutHandler = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, { withCredentials: true });
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <h1>User Logout</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default UserLogout