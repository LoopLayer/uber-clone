import React,{useContext,useEffect} from 'react'
import { CaptainDataContext} from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainProtectedWrapper = ({children}) => {

    const accessToken= localStorage.getItem('accessToken')
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate("/captain-login");
        }
    }, [accessToken, navigate]);

    return (
        <>
          {children}
        </>
    )
}

export default CaptainProtectedWrapper