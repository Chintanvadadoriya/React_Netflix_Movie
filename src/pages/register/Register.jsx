import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate =useNavigate()

    function handleClick(){
      console.log("object");
    navigate('/login')
  };

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async(e) => {
    e.preventDefault()
    setPassword(passwordRef.current.value);
    try{
      await axios.post('auth/register',{email,password})
      navigate('/login')

    }catch(err){
      console.log("err Signup",err);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <div>
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          </div>
          {/* <button className="loginButton">Sign In</button> */}
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
           
           <button className="registerButton signin"onClick={handleClick}>Sign In</button>

          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
