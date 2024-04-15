import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function Home() {
  const [bestArtistsIds, setBestArtistsIds] = useState([]);
  const [bestArtistsTracks, setBestArtistsTracks] = useState([]);

  useEffect(() => {
    const fetchArtistsIds = async () => {
      try {
        const response = await axios.get(
          "https://api.deezer.com/genre/0/artists"
        );
        response.data.map((artistData) => setBestArtistsIds(artistData.id));
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtistsIds();
  }, []);
  console.log(bestArtistsIds);
  return (
    <div className="home">
      <Sidebar />
      <div className="home-main">
        <Header />
        <div className="best-album">
          <img src="" alt="" className="best-album-image" />
          <div className="best-album-track-cont">
            {/* https://api.deezer.com/genre/0/artists */}
          </div>
        </div>
      </div>
    </div>
  );
}
