import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type,setGenre }) {
  const [content,setContent]=useState({})

  useEffect(async()=>{
    const headers = { 'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}` };

    const getRendomContent =async()=>{
      try{
        const res = await axios.get(`movies/random?type?=${type}`,{headers}) 
        setContent(res?.data[0])
  
      }catch(err){
        console.log("feture rendom err",err);
      }
    }
    getRendomContent()
  },[type])

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="Adventure">Adventure</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Western">Western</option>
            <option value="Drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={content?.img || "https://www.shutterstock.com/image-photo/san-francisco-california-usa-11112020-260nw-1852495360.jpg"}
        alt=""
      />
      <div className="info">
        {/* <img
          src={content?.imgtitle}
          alt=""
        /> */}
        <span className="desc">
          {content?.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
