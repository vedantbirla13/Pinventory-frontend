import React, { useState } from 'react'
import { MdPassword } from "react-icons/md"
import Card from '../../components/card/Card'
import { Link, useParams } from "react-router-dom"
import styles from "./auth.module.scss"
import { toast } from "react-toastify"
import { resetPassword } from '../../services/authService'


const Reset = () => {
  
  const initialState = {
    password: "",
    password2: "",
  }

  const { resetToken } = useParams()

  const [formData, setFormData] = useState(initialState)
    const { password, password2 } = formData

    const handleInputChange = (e) => {
      const { name,value } = e.target
      setFormData({ ...formData, [name]: value })
    }

    const reset = async(e) => {
      e.preventDefault();
      
      if(!password ||!password2){
        return toast.error("All fields are required")
      }
    
      if(password.length < 6){
          return toast.error("Password must be up to 6 characters")
      }

      if(password !== password2){
        return toast.error("Passwords do not match")
      }

      const userData = {
        password, password2
       };
       
       try {
          const data = await resetPassword(userData, resetToken)
          toast.success(data.message)
       } catch (error) {
          console.log(error.message)
       }


    }


  return (
    <div className={` container ${styles.auth}`}>
    <Card>
        <div className={styles.form}>
            <div className="--flex-center">
                <MdPassword size={35} color="#999" />
            </div>
            <h2>Reset password</h2>

            <form onSubmit={reset}>
                <input type="password" placeholder='New Password' name='password' value={password} onChange={handleInputChange}  required/>
                <input type="password" placeholder='Confirm New Password' name='password2'  value={password2} onChange={handleInputChange} required/>
          
                <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
                <div className={styles.links}>
                <Link to="/">- Home</Link>
                <Link to="/login">- Login</Link>
              </div>
            </form>
           
        </div>
    </Card>
</div>
  )
}

export default Reset