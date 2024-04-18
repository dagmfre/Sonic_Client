/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { css } from '@emotion/react'
import axios from "axios";

export default function TopAlbum() {
  const [topArtists, setTopArtists] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  useEffect(() => {
    const fetchArtistsIds = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api-artists");
        setTopArtists(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtistsIds();
  }, []);
  return (
    <div className="top-album-cont">
      {topArtists &&
        topArtists.map((artist, index) => (
          <div className="top-album" key={index}>
            <img
              src={`${artist.data[0].album.cover_medium}`}
              alt=""
              className="top-album-image"
            />
            {artist.data.map((artistTrack) => (
              <div className="top-album-track-cont">
                <audio controls src={artistTrack.preview}></audio>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
