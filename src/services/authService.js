import axios from "axios"
import { toast } from "react-toastify"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,);
}

// Register user
export const registerUser = async(userData) => {
    try {
        // Here you have to use response only, if you use something like res, then it won't work
        const response = await axios.post(`${BACKEND_URL}/api/v1/users/register`, userData, {withCredentials: true})
        if(response.statusText === "OK"){
            toast.success("User Registered successfully")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Login user
export const loginUser = async(userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/users/login`, userData)
        if(response.statusText === "OK"){
            toast.success("Login successfully")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Logout user
export const logoutUser = async() => {
    try {
        await axios.get(`${BACKEND_URL}/api/v1/users/logout`)
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Forgot password
export const forgotPassword = async(userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/users/forgotpassword` , userData)
        if(response.statusText === "OK"){
            // In the backend controller we have send res.json({ message: "Reset email sent succesffuly " })
            // So here we can directly get that message from the response
            toast.success(response.data.message)
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Reset password
export const resetPassword = async(userData, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/v1/users/resetpassword/${resetToken}` , userData)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Get login status
export const getLoginStatus = async() => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/users/loggedin`)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Get user profile
export const getUser = async() => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/users/getuser`)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Update profile
export const updateUser = async(formData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/v1/users/updateuser`, formData)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

// Change password
export const changePassword = async(formData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/v1/users/changepassword`, formData)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && 
            error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}