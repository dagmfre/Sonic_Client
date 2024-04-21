/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import Carousel from "../Carousel";
import { useSelector, useDispatch } from "react-redux";
import { addCurrentPlayingSong, togglePlayPause } from "../currentPlayingSlice";

export default function TopAlbum() {
  const dispatch = useDispatch();
  const [topArtists, setTopArtists] = useState([]);
  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);
  const currentPlayingId = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo.id
  );

  const handleDispatch = (currentSongInfo) => {
    dispatch(addCurrentPlayingSong(currentSongInfo));
    dispatch(togglePlayPause());
  };

  const topAlbumCont = css`
    display: flex;
    gap: 3rem;
  `;

  const albumImage = css`
    height: 100%;
  `;

  const albumTracksCont = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    h3 {
      margin: 0 0 1rem;
      font-size: 2.5rem;
    }
  `;

  const listenersCont = css`
    display: flex;
    gap: 1rem;
    > :not(:nth-child(3)) {
      font-size: 23px;
    }
    > *:nth-child(3) {
      opacity: 0.8;
    }
  `;

  const albumTracks = css`
    gap: 1rem;
    display: flex;
    display: grid;
    grid-template: repeat(4, 1fr) / repeat(2, 1fr);
    padding: 30px 0 0 0;
    audio {
      width: 100%;
    }
  `;

  const minuteFormater = (length) => {
    const hour = Math.floor(length / 60);
    var minutes = length % 60;
    return [hour, minutes];
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
    <div>
      <Carousel>
        {topArtists &&
          topArtists.map((artist, artistIndex) => (
            <div key={artistIndex} css={topAlbumCont}>
              <img
                css={albumImage}
                src={artist.data[0].album.cover_medium}
                alt=""
                className="top-album-image"
              />
              <div css={albumTracksCont} className="top-album-track-cont">
                <h3>{artist.data[0].album.title}</h3>
                <div css={listenersCont}>
                  <i className="fa-solid fa-headphones"></i>
                  <span>{artist.data[0].rank}</span>
                  <span>Active listeners</span>
                </div>
                <div css={albumTracks}>
                  {artist.data.slice(0, 6).map((artistTrack, trackIndex) => (
                    <div key={trackIndex}>
                      <div className="trackInfo">
                        <h1>{artistTrack.title}</h1>
                        <p>{`${minuteFormater(artistTrack.duration)[0]}h : ${
                          minuteFormater(artistTrack.duration)[1]
                        }m`}</p>
                      </div>
                      <button
                        key={trackIndex}
                        onClick={() =>
                          handleDispatch({
                            // Wrap handleDispatch in an arrow function
                            id: trackIndex,
                            title: artistTrack.title,
                            artistName: artistTrack.artist.name,
                            albumName: artistTrack.album.title,
                            image: artistTrack.album.cover_medium,
                            audioSrc: artistTrack.preview,
                          })
                        }
                      >
                        {currentPlayingId === trackIndex && isPlaying ? (
                          <i className="fa-solid fa-pause-circle"></i>
                        ) : (
                          <i className="fa-solid fa-play-circle"></i>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}
