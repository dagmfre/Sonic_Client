import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function TrendingAlumsSongs() {
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
    <div className="trending-tracks-albums">
      <div className="trend-songs">
        <h1>Trending Songs</h1>
        {topArtists &&
          topArtists.slice(6).map((artist, index) => (
            <div key={index} className="trending-tracks">
              <audio controls src={artist.data[0].preview}></audio>
            </div>
          ))}
      </div>
      <div className="trend-albums">
        <h1>Trending Albums</h1>
        {topArtists &&
          topArtists.map((artist, index) => (
            <img key={index} src={artist.data[1].album.cover_medium} alt="" />
          ))}
      </div>
    </div>
  );
}
