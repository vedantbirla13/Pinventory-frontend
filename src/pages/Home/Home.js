import React from 'react'
import { TbBrandProducthunt } from "react-icons/tb"
import { Link } from "react-router-dom"
import "./Home.scss"
import heroImg from "../../assets/inv-img.png"
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/hiddenLinks'

const Home = () => {
  return (
    <div className='home'> 
        <nav className='container --flex-between'>
            <div className="logo">
                <TbBrandProducthunt size={35} />
            </div>
            <ul className="home-links">
                <ShowOnLogout>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>

                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/login">Login</Link>
                        </button>
                    </li>
                </ShowOnLogout>

                <ShowOnLogin>
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/dashboard">Dashboard</Link>
                        </button>
                    </li>
                </ShowOnLogin>
            </ul>
        </nav>

        {/* Hero section */}
        <section className='container hero'>
            <div className="hero-text">
            <h2>Inventory {"&"} Stock Management Solution</h2>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
                <div className="hero-buttons">
                        <button className="--btn --btn-secondary">
                                    <Link to="/dashboard">Free trial 1 month</Link>
                        </button>
                </div>
                <div className="--flex-start">
                    <NumberText num="14k" text="Brand owners" />
                    <NumberText num="23k" text="Active users" />
                    <NumberText num="500+" text="Partners" />
                </div>
            </div>

            <div className="hero-image">
                <img src={heroImg} alt="" />
            </div>
        </section>
    </div>
  )
};

const NumberText = ({ num, text }) => {
    return (
        <div className="--mr">
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
}

export default Home