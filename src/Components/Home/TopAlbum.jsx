/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
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

export default function TopAlbum() {
  const dispatch = useDispatch();
  const [topArtists, setTopArtists] = useState([]);

  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);
  const currentPlayingTitle = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo.name
  );

  const handleDispatch = (currentSongInfo) => {
    dispatch(addCurrentPlayingSong(currentSongInfo));
  };

  function truncateTrackName(name, maxLength) {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    } else {
      return name;
    }
  }

  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const topAlbumCont = css`
    display: flex;
    gap: 2rem;
    margin: 0 2rem;
    color: black;
  `;

  const bigAlbumImage = css`
    width: 100%;
    max-width: 300px;
    height: 100%;
    ${mq[3]} {
      display: none;
    }
  `;

  const smallAlbumImage = css`
    display: none;
    ${mq[3]} {
      display: inherit;
    }
  `;

  const albumHeaderCont = css`
    display: flex;
    align-items: center;
    gap: 2rem;
    img {
      max-width: 100px;
    }
    > :nth-child(2) {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      width: 100%;
    }
  `;

  const albumTracksCont = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    h3 {
      margin: 0 0 1rem;
      font-size: 2.5rem;
    }
    justify-content: space-between;
  `;

  const listenersCont = css`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    > :nth-of-type(1) {
      display: flex;
      gap: 1rem;
      > :not(:nth-child(3)) {
        font-size: 23px;
      }
      > *:nth-child(3) {
        opacity: 0.8;
        align-self: center;
      }
    }
    > :nth-of-type(2) {
      display: flex;
      gap: 2rem;
      i {
        font-size: 1.3rem;
        cursor: pointer;
      }
      button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        outline: inherit;
      }
    }
  `;

  const albumTracks = css`
    gap: 1rem;
    display: flex;
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    padding: 30px 0 0 0;
    audio {
      width: 100%;
    }
  `;

  const trackCont = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #edeffa;
    padding-right: 1rem;
    > :nth-of-type(1) {
      display: flex;
      gap: 2rem;
      height: 100%;
      p:first-child {
        margin: 0;
        align-self: stretch;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #edeffa;
      }
      div:nth-of-type(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 10px 0;
        > * {
          margin: 0;
        }
        h1 {
          font-size: 20px;
        }
        p {
          font-size: 13px;
        }
      }
    }
    > :nth-of-type(2) {
      display: flex;
      gap: 1rem;
      i {
        font-size: 1.8rem;
        cursor: pointer;
      }
      i:first-child {
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
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
        if (response.data && Array.isArray(response.data)) {
          setTopArtists(response.data.reverse());
        } else {
          console.error("Invalid data received from server");
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };
    fetchArtistsIds();
  }, []);
  console.log(topArtists)
  return (
    <>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={10}
        classNameAnimation
      >
        <Slider>
          {topArtists &&
            topArtists.map((artist, artistIndex) => (
              <Slide>
                <div key={artistIndex} css={topAlbumCont}>
                  {artist.data &&
                  artist.data.length > 0 &&
                  artist.data[0].album ? (
                    <>
                      <img
                        css={bigAlbumImage}
                        src={artist.data[0].album.cover_medium}
                        alt=""
                      />
                      <div css={albumTracksCont}>
                        <div css={albumHeaderCont}>
                          <img
                            css={smallAlbumImage}
                            src={artist.data[0].album.cover_medium}
                            alt=""
                          />
                          <div>
                            <h3>{artist.data[0].album.title}</h3>
                            <div css={listenersCont}>
                              <div>
                                <i className="fa-solid fa-headphones"></i>
                                <span>{artist.data[0].rank}</span>
                                <span>Active listeners</span>
                              </div>
                              <div>
                                <ButtonBack>
                                  <i className="fa-solid fa-chevron-left"></i>
                                </ButtonBack>
                                <ButtonNext>
                                  <i className="fa-solid fa-chevron-right"></i>
                                </ButtonNext>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div css={albumTracks}>
                          {artist.data
                            .slice(0, 4)
                            .map((artistTrack, trackIndex) => (
                              <div css={trackCont} key={trackIndex}>
                                <div>
                                  <p css={["trackIndex"]}>0{trackIndex + 1}</p>
                                  <div>
                                    <h1>
                                      {truncateTrackName(artistTrack.title, 12)}
                                    </h1>
                                    <p>{`${
                                      minuteFormater(artistTrack.duration)[0]
                                    }h : ${
                                      minuteFormater(artistTrack.duration)[1]
                                    }m`}</p>
                                  </div>
                                </div>
                                <div key={trackIndex}>
                                  <i class="fa-regular fa-heart"></i>
                                  <div
                                    onClick={() =>
                                      handleDispatch({
                                        name: artistTrack.title,
                                        singer: artistTrack.artist.name,
                                        artistName: artistTrack.artist.title,
                                        albumName: artistTrack.album.title,
                                        cover: artistTrack.album.cover_small,
                                        musicSrc: artistTrack.preview,
                                        duration: artistTrack.duration,
                                      })
                                    }
                                  >
                                    {currentPlayingTitle ===
                                      artistTrack.title && isPlaying ? (
                                      <i className="fa-solid fa-pause-circle"></i>
                                    ) : (
                                      <i className="fa-solid fa-play-circle"></i>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>No album data available for this artist</p>
                  )}
                </div>
              </Slide>
            ))}
        </Slider>
      </CarouselProvider>
    </>
  );
}
