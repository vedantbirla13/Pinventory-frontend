import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { SET_LOGIN } from '../redux/features/auth/authSlice'
import { getLoginStatus } from '../services/authService'
import { toast } from "react-toastify"

// Logout the user as soon as the session(cookie) expires
const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectloggedOutUser = async() => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if(!isLoggedIn){
                toast.info("Session expired, Please login again");
                navigate(path)
                return 
            }
        }; 

        redirectloggedOutUser();
    }, [navigate, path, dispatch])
    
}

export default useRedirectLoggedOutUser