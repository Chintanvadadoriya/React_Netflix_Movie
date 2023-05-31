import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loader,setLoader]=useState(false)



  console.log("username",username);
  console.log("password",password);
  const emailRef = useRef();
  // const passwordRef = useRef();
  // const usernameRef =useRef()

  const navigate =useNavigate()

    function handleClick(){
    navigate('/login')
  };

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async(e) => {
    e.preventDefault()
    if(email,username,password){
      setLoader(true)
      try{
        console.log("email",email);
        console.log("username",username);
        console.log("password",password);
  
        await axios.post(`${process.env.REACT_APP_URL}auth/register`,{email,username,password})
        setLoader(false)
        navigate('/login')
  
      }catch(err){
        console.log("err Signup",err);
      }
    }else{
      alert("Plase fill require field")
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
            <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />

            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />

            <button className="registerButton" onClick={handleFinish}>
              {loader?"Loading...":"Sign up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
