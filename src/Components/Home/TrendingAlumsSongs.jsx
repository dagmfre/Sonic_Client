/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import AudioPlayer from "react-modern-audio-player";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addCurrentPlayingSong } from "../currentPlayingSlice";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

export default function TrendingAlumsSongs() {
  const [topTracks, setTopTracks] = useState([]);
  const dispatch = useDispatch();
  const [totalSlides, setTotalSlides] = useState(10);

  const recentSongs = useSelector(
    (state) => state.currentPlayingSong.recentSongs
  );

  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);
  const currentPlayingTitle = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo.name
  );
  const currentPlayingInfo = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo 
  );

  const handleDispatch = (currentSongInfo) => {
    dispatch(addCurrentPlayingSong(currentSongInfo));
  };

  const breakpoints = [576, 768, 992, 1200];

  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const songsAlbumsCont = css`
    display: flex;
    margin-top: 0;
    justify-content: space-between;
    padding: 0 2rem;
    gap: 2rem;
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    ${mq[3]} {
      flex-direction: column-reverse;
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
    }
    img {
      border-radius: 7px;
      max-width: 50px;
    }
    i {
      font-size: 1.5rem;
    }
  `;

  const trendAlbum = css`
    display: flex;
    gap: 2rem;
  `;

  const topAlbumTrackCont = css`
    flex: 65%;
    display: none;
    ${mq[3]} {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 0;
      > *:nth-last-child(-n + 6) {
        display: none;
      }
    }
    img {
      max-width: 350px ${mq[3]} {
        max-width: inherit;
      }
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
    }
    img {
      border-radius: 7px;
      max-width: 50px;
    }
    i {
      font-size: 1.5rem;
    }
  `;

  const topAlbumImgCont = css`
    ${mq[3]} {
      display: none;
    }
    display: grid;
    flex: 35%;
    img {
      grid-area: 1 / 1;
      z-index: 1;
      border-radius: 1rem;
      width: 100%;
    }
    i {
      cursor: pointer;
      grid-area: 1 / 1;
      z-index: 10;
      font-size: 1.7rem;
      align-self: center;
      justify-self: center;
      background-color: white;
      border-radius: 50%;
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
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
    // Function to update totalSlides based on window width
    const handleResize = () => {
      const isMobile = window.innerWidth < 1200;
      setTotalSlides(isMobile ? 1 : 10);
    };

    // Initial call to set totalSlides based on current window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api-tracks");
  
        // Determine how many tracks to show based on window width
        const shouldSlice = window.innerWidth < 1200;
  
        if (shouldSlice) {
          // Show only the first track if window width is less than 1200px
          setTopTracks(response.data?.slice(0, 1));
        } else {
          // Show all tracks if window width is 1200px or more
          setTopTracks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    // Fetch album tracks when component mounts
    fetchAlbumTracks();
  
    const handleResize = () => {
      // Re-run the logic based on the new window width
      fetchAlbumTracks();
    };
  
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
  
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs only on mount and cleanup  

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
                      <p>{recentSong.duration}</p>
                      <i class="fa-regular fa-heart"></i>
                    </div>
                  </div>
                ) : (
                  <p key={index}>No Recent Song is Played</p>
                )
              )}
          </div>
        </div>
        <div css={trendAlbumCont}>
          <h1>Trending Albums</h1>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={totalSlides}
            interval={5000}
            // isPlaying
            classNameAnimation
          >
            <Slider>
              {topTracks &&
                topTracks.map((topTrack, index) => (
                  <Slide>
                    <div css={trendAlbum} key={index} index={index}>
                      {topTrack.data &&
                      topTrack.data.length > 1 &&
                      topTrack.data[0].album ? (
                        <div css={topAlbumImgCont}>
                          <i class="fa-solid fa-play"></i>
                          <img
                            src={topTrack.data[0].album.cover_medium}
                            alt=""
                          /> 
                        </div>
                      ) : (
                        <p>No album data available for this artist</p>
                      )}

                      <div css={topAlbumTrackCont}>
                        {topTrack.data?.map((tracks, index) => (
                          <div css={topAlbum}>
                            <div>
                              <p>0{index + 1}</p>
                              <img src={tracks.album.cover_medium} alt="" />
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
                                {currentPlayingTitle === tracks.title &&
                                isPlaying ? (
                                  <i className="fa-solid fa-pause"></i>
                                ) : (
                                  <i className="fa-solid fa-play"></i>
                                )}
                              </div>
                              <h3>{truncateTrackName(tracks.title, 20)}</h3>
                            </div>
                            <div>
                              <p>{tracks.artist.name}</p>
                              <p>{tracks.duration}</p>
                              <i class="fa-regular fa-heart"></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Slide>
                ))}
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    </>
  );
}
