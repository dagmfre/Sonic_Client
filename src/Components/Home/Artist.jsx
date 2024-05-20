/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import ArtistLoader from "../ArtistLoader";
import axios from "axios";

export default function Artist() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const artistsCont = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 2rem;
    padding-top: 5rem;
    position: relative;
    h1 {
      position: absolute;
      top: 0;
      font-size: 2rem;
    }
    div {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }
  `;

  const artistImg = css`
    border-radius: 50%;
    width: 100%;
  `;

  const loaderCont = css`
    padding: 0 2rem;
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("https://sonic-api.onrender.com/api/artists");
        setArtists(response.data.reverse());
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div id="artists">
      {isLoading ? (
        <div css={loaderCont}>
          <ArtistLoader />
        </div>
      ) : (
        <div css={artistsCont}>
          <h1>Top Artists</h1>
          {artists.map((artist) => (
            <div css={artist} key={artist.id}>
              <h2>{artist.name}</h2>
              <img
                css={artistImg}
                src={artist.picture_medium}
                alt={artist.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
