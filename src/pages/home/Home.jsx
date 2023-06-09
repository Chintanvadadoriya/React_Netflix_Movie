import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import Login from "../login/Login";
import Register from "../register/Register";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({type}) => {
  const token = JSON.parse(localStorage.getItem("user")).accessToken

  const [lists,setLists]=useState([])
  const [genre,setGenre]=useState(null)

  useEffect(()=>{
  const token = JSON.parse(localStorage.getItem("user")).accessToken
    const headers = { 'Authorization': `Bearer ${token}`};

    const getRandomList= async()=>{
     try{
      const res =await axios.get(`${process.env.REACT_APP_URL}lists${type? "?type="+ type:""}${genre ? "&genre="+genre :""}`,{headers})
      setLists(res?.data)
     }catch(err){
      console.log("getRandomList Home",err);
     }
    }
    getRandomList()
  },[type,genre])
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {
        lists.map((list)=>{
          return(
            <List list={list}/>
          )
        })
      }
    </div>
  );
};

export default Home;
