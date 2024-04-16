import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function Home() {
  const [topArtists, setTopArtists] = useState([]);
  // const [topAlbumCoverImages, setTopArtistsTracks] = useState([]);

  useEffect(() => {
    const fetchArtistsIds = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api-artists");
        // console.log(response.data);
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
      </div>
    </div>
  );
}
