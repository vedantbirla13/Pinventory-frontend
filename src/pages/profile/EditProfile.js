import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Loader from '../../components/loader/Loader'
import { selectUser } from '../../redux/features/auth/authSlice'
import Card from '../../components/card/Card'
import { toast } from "react-toastify"
import "./Profile.scss"
import { updateUser } from '../../services/authService'
import ChangePassword from '../../components/changePassword/ChangePassword'

const EditProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectUser)

    const { email } = user;

    useEffect(() => {
      if(!email) {
        navigate("/profile")
      }
    }, [email, navigate])


    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo
    }
    const [profile, setprofile] = useState(initialState)
    const [profileImage, setprofileImage] = useState("")

    const handleInputChange = (e) => {
        const { name,value } = e.target
        setprofile({ ...profile, [name]: value })
    }

    const handleImageChange = (e) => {
        setprofileImage(e.target.files[0])
    }

    const saveProfile = async(e) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            // Handle image upload
            let imageURL;
            if(
                profileImage && (
                    profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/png" 
                )
            ) {
                const image = new FormData()
                image.append("file", profileImage)
                image.append("cloud_name", "djeosksj0")
                image.append("upload_preset", "rhnkwutt" )

                // Save image to cloudinary
                const response = await fetch("https://api.cloudinary.com/v1_1/djeosksj0/image/upload", {
                    method: "post" , body: image
                })

                const imgData = await response.json();
                imageURL = imgData.url.toString();
            }
                // save profile
                const formData = {
                    name: profile.name,
                    phone: profile.phone,
                    bio: profile.bio,
                    photo: profileImage ? imageURL : profile.photo,
                }

                const data = await updateUser(formData)
                console.log(data);
                toast.success("Profile updated")
                navigate("/profile");
                setIsLoading(false);
            } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error.message)
        }
    }


  return (
    <div className='profile --my2'>
        { isLoading && <Loader /> }

        <Card cardClass={"card --flex-dir-column"}>
                    <span className='profile-photo'>
                        <img src={user?.photo} alt="ProfilePic" />
                    </span>
                <form className='--form-control --m ' onSubmit={saveProfile}>
                    <span className="profile-data">
                        <p>
                            <label>Name:</label>
                            <input type="text" name="name" value={profile?.name} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Name:</label>
                            <input type="text" name="email" value={profile?.email} disabled  />
                            <br />
                            <code>Email cannot be changed.</code>
                        </p>
                        <p>
                            <label>Phone:</label>
                            <input type="text" name="phone" value={profile?.phone} onChange={handleInputChange} />
                        </p>
                        <p >
                            <label>Bio:</label>
                            <textarea name="bio" value={profile?.bio} id="" cols="30" rows="10" onChange={handleInputChange}></textarea>
                        </p>

                        <p>
                            <label>Photo:</label>
                            <input type="file" name="image"  onChange={handleImageChange} />

                        </p>
                        <div>
                                <button className='--btn --btn-primary'>
                                    Edit profile 
                                </button>
                        </div>
                    </span>
                </form>
                </Card>
                <br />
                <ChangePassword />
    </div>
    
  )
}

export default EditProfile