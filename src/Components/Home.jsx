import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function Home() {
  const [topArtists, setTopArtists] = useState([]);
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
    <div className="home">
      <Sidebar />
      <div className="home-main">
        <Header />
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
                <img key={index} src={artist.data[5].album.cover_medium} alt="" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
