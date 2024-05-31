/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header";
import SideBar from "./Sidebar";
import TopAlbum from "./TopAlbum";
import Tracks from "./Tracks";
import { useSelector, useDispatch } from "react-redux";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { addCurrentPlayingSong } from "../currentPlayingSlice";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);
  const { hash } = useLocation();

  useEffect(() => {
    const tracksComponent = document.getElementById("tracks");
    const artistsComponent = document.getElementById("artists");

    if (tracksComponent && hash === "#tracks") {
      tracksComponent.scrollIntoView({ behavior: "smooth" });
    } else if (artistsComponent && hash === "#artists") {
      artistsComponent.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  useEffect(() => {
    const element = document.getElementsByClassName(
      "react-jinke-music-player-main"
    )[0];
    const switchElement = document.getElementsByClassName("theme-switch")[0];

    if (element && !isPlaying) {
      element.style.visibility = "hidden";
      switchElement.style.display = "none";
    } else if (element && isPlaying) {
      element.style.visibility = "visible";
      switchElement.style.display = "initial";
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

  const home = css`
    display: flex;
    > :nth-of-type(2) {
      flex: 87%;
    }
    position: relative;
}
  `;

  const mainSection = css`
    max-width: 1450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 75%;
  `;

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

  return (
    <div css={home}>
      <SideBar />
      <div css={mainSection}>
        <Header />
        <TopAlbum />
        <div>
          <Tracks />
          {isPlayClicked ? (
            <div
              style={{
                display: `${isPlaying ? "none" : "flex"} `,
              }}
            >
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
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
