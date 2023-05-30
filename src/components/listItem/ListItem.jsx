import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListItem(props) {
  const token = JSON.parse(localStorage.getItem("user")).accessToken

  const { index, item } = props
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});


  useEffect(() => {
    const headers = { 'Authorization': `Bearer ${token}` };

    const getMovie = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}`+'movies/find/' + item, { headers })
        setMovie(res.data)

      } catch (err) {
        console.log("getmovie catch", err);
      }
    }
    getMovie()
  }, [item])

  return (
    <Link to="/watch" state={{ movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie?.img}
          alt="no"
        />
        {isHovered && (
          <>
            <video src={movie?.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className="desc">
                {movie?.title}
              </div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
