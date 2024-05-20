/** @jsxImportSource @emotion/react */
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { addCurrentPlayingSong } from "./currentPlayingSlice";
import Header from "./Home/Header";
import Sidebar from "./Home/Sidebar";
import "pure-react-carousel/dist/react-carousel.es.css";
import "react-jinke-music-player/assets/index.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { useEffect, useRef, useState } from "react";

export default function MyFavorite() {
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);
  const currentPlayingTitle = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo.name
  );
  const breakpoints = [500, 768, 890];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const minuteFormater = (length) => {
    const hour = Math.floor(length / 60);
    var minutes = length % 60;
    return `${hour} : ${minutes}`;
  };

  const handleDispatch = (currentSongInfo) => {
    dispatch(addCurrentPlayingSong(currentSongInfo));
  };

  function truncateTrackName(name, maxLength) {
    if (name?.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    } else {
      return name;
    }
  }

  useEffect(() => {
    const element = document.getElementsByClassName(
      "react-jinke-music-player-main"
    )[0];

    if (element && !isPlaying) {
      element.style.visibility = "hidden";
    } else if (element && isPlaying) {
      element.style.visibility = "visible";
      console.log("ppppppppppppppppp");
    }
  }, [isPlaying]);

  const audioInstance = useRef(null);
  useEffect(() => {
    if (audioInstance.current) {
      if (isPlaying) {
        audioInstance.current.play();
      } else {
        audioInstance.current.pause();
      }
    }
    isPlaying ? setIsPlayClicked(true) : console.log("Player started showing");
  }, [isPlaying]);

  const currentSongInfo = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo
  );

  const handleAudioPlay = () => {
    dispatch(addCurrentPlayingSong(true));
  };

  const handleAudioPause = () => {
    dispatch(addCurrentPlayingSong(false));
  };

  const options = {
    onAudioPause: handleAudioPause,
    onAudioPlay: handleAudioPlay,
  };

  const favoriteSongsCont = css`
    justify-content: flex-start;
    gap: 1rem;
    margin-top: 1rem;
    padding-bottom: 3rem !important;
    flex-direction: column;
    flex: 60%;
    display: flex;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    flex: 40%;
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  `;

  const favorite = css`
    display: flex;
    flex-direction: row-reverse;
    > :nth-of-type(1) {
      flex: 75%;
      > :nth-of-type(1) {
        padding: 1.5rem 1rem;
      }
      > :nth-of-type(2) {
        padding: 0 1rem;
      }
    }
    > :nth-of-type(2) {
      flex: 15%;
    }
  `;

  const favoriteTrack = css`
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
    background: #000000de;
    color: white;
    padding: 10px 30px 10px 20px;
    border-radius: 9px;
    ${mq[0]} {
      gap: 10px;
    }
    > :nth-of-type(1) {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 40%;
      padding: 0 10px;
      ${mq[0]} {
        gap: 10px;
      }
      p {
        ${mq[0]} {
          display: none;
        }
      }
      h3 {
        ${mq[0]} {
          font-size: 10px;
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

      p:nth-of-type(2) {
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
  const favoriteSongs = useSelector((state) => state.favoriteList.favoriteList);


  const noFavSongCont = css`
    height: 100px;
    background-color: #d3d3d342;
    padding: 1rem;
    font-size: 1.4rem;
    color: #760606;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0;
    }
  `;

  return (
    <div css={favorite} className="favorite">
      <div>
        <Header />
        <div css={favoriteSongsCont}>
          <h1>My Favorite Songs</h1>
          {favoriteSongs.length === 0 ? (
            <div css={noFavSongCont}>
              <p>No songs are added!!</p>
            </div>
          ) : (
            favoriteSongs.map((favoriteSong, index) => (
              <div css={favoriteTrack} key={index}>
                <div>
                  <p>0{index + 1}</p>
                  <img src={favoriteSong.cover} alt={`Album cover`} />
                  <div
                    onClick={() =>
                      handleDispatch({
                        name: favoriteSong.name,
                        singer: favoriteSong.singer,
                        albumName: favoriteSong.albumName,
                        cover: favoriteSong.cover,
                        musicSrc: favoriteSong.musicSrc,
                        duration: favoriteSong.duration,
                      })
                    }
                  >
                    {currentPlayingTitle === favoriteSong.name && isPlaying ? (
                      <i className="fa-solid fa-pause"></i>
                    ) : (
                      <i className="fa-solid fa-play"></i>
                    )}
                  </div>
                  <h3>{truncateTrackName(favoriteSong.name, 20)}</h3>
                </div>
                <div>
                  <p>{favoriteSong.singer}</p>
                  <p>{minuteFormater(favoriteSong.duration)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Sidebar />
      {isPlayClicked ? (
        <>
          <ReactJkMusicPlayer
            theme={"light"}
            className={"audioPlayer"}
            getAudioInstance={(instance) => {
              audioInstance.current = instance;
            }}
            duration={30}
            audioLists={[currentSongInfo]}
            defaultPosition={{ bottom: 0 }}
            clearPriorAudioLists
            spaceBar
            {...options}
            toggleMode={false}
            mode={"full"}
            showDestroy={false}
          />
        </>
      ) : null}
    </div>
  );
}
