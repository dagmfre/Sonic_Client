/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addCurrentPlayingSong } from "../currentPlayingSlice";
import { addRemoveFavoriteSong } from "../favoriteListSlice";
import "pure-react-carousel/dist/react-carousel.es.css";
import "react-jinke-music-player/assets/index.css";
import Artist from "./Artist";
import TracksLoader from "../TracksLoader";

export default function Tracks() {
  const [topTracks, setTopTracks] = useState([]);
  const dispatch = useDispatch();
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleTracks, setVisibleTracks] = useState(3);

  const recentSongs = useSelector(
    (state) => state.currentPlayingSong.recentSongs
  );

  const minuteFormater = (length) => {
    const hour = Math.floor(length / 60);
    var minutes = length % 60;
    return `${hour} : ${minutes}`;
  };

  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);
  const breakpoints = [500, 768, 890];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const currentPlayingTitle = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo.name
  );

  const handleDispatch = (currentSongInfo) => {
    dispatch(addCurrentPlayingSong(currentSongInfo));
  };

  const handleFavoriteSongDispatch = (favoriteSong) => {
    dispatch(addRemoveFavoriteSong(favoriteSong));
  };

  const songsAlbumsCont = css`
    display: flex;
    margin-top: 0;
    justify-content: space-between;
    padding: 0 2rem;
    gap: 4rem;
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    flex-direction: column;
    ${mq[1]} {
      padding: 0 10px;
    }
  `;

  const recentSongsCont = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    gap: 1rem;
  `;
  const trendAlbumCont = css`
    justify-content: flex-start;
    gap: 1rem;
    margin-top: 1rem;
    flex-direction: column;
    flex: 60%;
    display: flex;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    flex: 40%;
    button {
      margin: 3rem auto 1rem;
      max-width: 260px;
      width: 100%;
      font-size: 1.1rem;
      padding: 10px 0;
      font-family: cursive;
      cursor: pointer;
      outline: none;
      border: none;
      border-left: 1px solid rgb(24 49 83 / 18%);
      border-top: 1px solid rgb(24 49 83 / 18%);
      border-right: 1px solid rgb(24 49 83 / 18%);
      box-shadow: 0 0.25em 0 rgb(99 102 116);
      color: rgb(24, 49, 83);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      p {
        margin: 0;
      }
      transition: 0.3s;
      &:hover {
        background-color: #4d85fe;
        color: white;
      }
    }
  `;

  const recentSongsInfoCont = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 0;
  `;
  const recentTracks = css`
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
    background: #f8f8f8;
    padding: 10px 30px 10px 20px;
    border-radius: 9px;
    > :nth-of-type(1) {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 40%;
      p {
        ${mq[0]} {
          display: none;
        }
      }
      i {
        margin: 0 10px;
        cursor: pointer;
      }
    }
    > :nth-of-type(2) {
      display: flex;
      align-items: center;
      flex: 50%;
      justify-content: space-between;
      ${mq[0]} {
        justify-content: flex-end;
      }
      p {
        ${mq[0]} {
          display: none;
        }
      }
    }
    img {
      border-radius: 7px;
      max-width: 50px;
    }
    i {
      font-size: 1.5rem;
    }
  `;

  const topAlbum = css`
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
    background: #000000de;
    color: white;
    padding: 10px 30px 10px 20px;
    border-radius: 9px;
    > :nth-of-type(1) {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 40%;
      p {
        ${mq[0]} {
          display: none;
        }
      }
      i {
        margin: 0 10px;
        cursor: pointer;
      }
    }
    > :nth-of-type(2) {
      display: flex;
      align-items: center;
      flex: 50%;
      justify-content: space-between;
      ${mq[0]} {
        justify-content: flex-end;
      }
      p {
        ${mq[0]} {
          display: none;
        }
      }
    }
    img {
      border-radius: 7px;
      max-width: 50px;
    }
    i {
      font-size: 1.5rem;
    }
  `;

  const loaderCont = css`
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  function truncateTrackName(name, maxLength) {
    if (name?.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    } else {
      return name;
    }
  }

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      try {
        const response = await axios.get("https://sonic-server.vercel.app/api/tracks");
        // Show all tracks if window width is 1200px or more
        setTopTracks(response.data?.reverse());
        setIsLoading1(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbumTracks();
  }, []);

  const loadMoreTracks = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 1);
      setIsLoading(false);
    }, 3000);
  };

  const [songFavorites, setSongFavorites] = useState({});

  const toggleFavorite = (songTitle) => {
    setSongFavorites((prevFavorites) => ({
      ...prevFavorites,
      [songTitle]: !prevFavorites[songTitle],
    }));
  };

  return (
    <>
      <div css={songsAlbumsCont}>
        <div css={recentSongsCont}>
          <h1>Recently Played</h1>
          <div css={recentSongsInfoCont}>
            {recentSongs &&
              recentSongs.map((recentSong, index) =>
                recentSongs.length > 0 ? (
                  <div css={recentTracks} key={index}>
                    <div>
                      <p>0{index + 1}</p>
                      <img src={recentSong.cover} alt="" />
                      <div
                        onClick={() =>
                          handleDispatch({
                            name: recentSong.name,
                            singer: recentSong.singer,
                            artistName: recentSong.artistName,
                            albumName: recentSong.albumName,
                            cover: recentSong.cover,
                            musicSrc: recentSong.musicSrc,
                            duration: recentSong.duration,
                          })
                        }
                      >
                        {currentPlayingTitle === recentSong.name &&
                        isPlaying ? (
                          <i className="fa-solid fa-pause"></i>
                        ) : (
                          <i className="fa-solid fa-play"></i>
                        )}
                      </div>
                      <h3>{truncateTrackName(recentSong.name, 20)}</h3>
                    </div>
                    <div>
                      <p>{recentSong.singer}</p>
                      <p>{minuteFormater(recentSong.duration)}</p>
                      <div
                        onClick={() => {
                          handleFavoriteSongDispatch({
                            name: recentSong.name,
                            singer: recentSong.singer,
                            artistName: recentSong.singer,
                            albumName: recentSong.albumName,
                            cover: recentSong.cover,
                            musicSrc: recentSong.musicSrc,
                            duration: recentSong.duration,
                          });
                          toggleFavorite(recentSong.name);
                        }}
                      >
                        <i
                          className={`fa ${
                            songFavorites[recentSong.name]
                              ? "fa-solid"
                              : "fa-regular"
                          } fa-heart`}
                          style={{
                            color: songFavorites[recentSong.name]
                              ? "#cf3b3b"
                              : "black",
                            cursor: "pointer",
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p key={index}>No Recent Song is Played</p>
                )
              )}
          </div>
        </div>
        <Artist />
        <div id="tracks" css={trendAlbumCont}>
          <h1>Trending Songs</h1>

          {isLoading1 ? (
            <div css={loaderCont}>
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
            </div>
          ) : (
            topTracks &&
            topTracks.slice(0, visibleTracks).map((topTrack, index) => (
              <>
                {topTrack.data
                  ?.slice(0, visibleTracks)
                  .map((tracks, innerIndex) => (
                    <div key={innerIndex} css={topAlbum}>
                      <div>
                        <p>0{innerIndex + 1}</p>
                        <img
                          src={tracks.album.cover_medium}
                          alt={`Album cover for ${tracks.album.title}`}
                        />
                        <div
                          onClick={() =>
                            handleDispatch({
                              name: tracks.title,
                              singer: tracks.artist.name,
                              artistName: tracks.artist.name,
                              albumName: tracks.album.title,
                              cover: tracks.album.cover_medium,
                              musicSrc: tracks.preview,
                              duration: tracks.duration,
                            })
                          }
                        >
                          {currentPlayingTitle === tracks.title && isPlaying ? (
                            <i className="fa-solid fa-pause"></i>
                          ) : (
                            <i className="fa-solid fa-play"></i>
                          )}
                        </div>
                        <h3>{truncateTrackName(tracks.title, 20)}</h3>
                      </div>
                      <div>
                        <p>{tracks.artist.name}</p>
                        <p>{minuteFormater(tracks.duration)}</p>

                        <div
                          onClick={() => {
                            handleFavoriteSongDispatch({
                              name: tracks.title,
                              singer: tracks.artist.name,
                              artistName: tracks.artist.name,
                              albumName: tracks.album.title,
                              cover: tracks.album.cover_medium,
                              musicSrc: tracks.preview,
                              duration: tracks.duration,
                            });
                            toggleFavorite(tracks.title);
                          }}
                        >
                          <i
                            className={`fa ${
                              songFavorites[tracks.title]
                                ? "fa-solid"
                                : "fa-regular"
                            } fa-heart`}
                            style={{
                              color: songFavorites[tracks.title]
                                ? "#cf3b3b"
                                : "white",
                              cursor: "pointer",
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ))
          )}

          {isLoading && (
            <div css={loaderCont}>
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
              <TracksLoader />
            </div>
          )}
          {!isLoading && visibleTracks < topTracks.length && (
            <button onClick={loadMoreTracks}>
              <p>Load More Tracks </p>
              <i class="fa-solid fa-angles-down"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
