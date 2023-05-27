import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type }) {
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
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
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
