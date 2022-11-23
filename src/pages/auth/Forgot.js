import React, { useState } from 'react'
import { AiOutlineMail } from "react-icons/ai"
import Card from '../../components/card/Card'
import { Link } from "react-router-dom"
import styles from "./auth.module.scss"
import { forgotPassword, validateEmail } from '../../services/authService'
import { toast } from "react-toastify"

const Forgot = () => {

    const [email, setEmail] = useState("")

    const forgot = async(e) => {
      e.preventDefault();
      if(!email){
          return toast.error("Email is required")
      }

      if(!validateEmail(email)){
        return toast.error("Please enter a valid email")
       }

      const userData = {
        email
      }

       await forgotPassword(userData);
       setEmail("")
    }
  return (
    <div className={` container ${styles.auth}`}>
    <Card>
        <div className={styles.form}>
            <div className="--flex-center">
                <AiOutlineMail size={35} color="#999" />
            </div>
            <h2>Forgot password</h2>

            <form onSubmit={forgot}>
                <input type="email" placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          
                <button type='submit' className='--btn --btn-primary --btn-block'>Get Reset Email</button>
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

export default Forgot