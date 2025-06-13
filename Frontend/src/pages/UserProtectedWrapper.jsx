import React,{useContext,useEffect} from 'react'
import {UserDataContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {

    const accessToken= localStorage.getItem('accessToken')
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken, navigate]);

    return (
        <>
          {children}
        </>
    )
}

export default UserProtectedWrapper