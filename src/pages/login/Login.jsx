import { useContext, useState } from "react";
import "./login.scss";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {dispatch,user}=useContext(AuthContext)
  const [loader,setLoader]=useState(false)
  const navigate =useNavigate()

  const handleLogin=(e)=>{
    if(email,password){
      setLoader(true)
      e.preventDefault()
      login({email,password},dispatch)
    }else{
      alert("Please enter your credential !")
    }

    }

  function handleRegister(){
    navigate('/register')
  }
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <button className="loginButton" onClick={handleLogin}>{loader? "Loading...":"Sign in"}</button>
          <span  onClick={handleRegister}>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
