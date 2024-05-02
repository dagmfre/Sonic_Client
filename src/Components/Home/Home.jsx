/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TopAlbum from "./TopAlbum";
import TrendingAlumsSongs from "./TrendingAlumsSongs";
import { useSelector, useDispatch } from "react-redux";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { addCurrentPlayingSong } from "../currentPlayingSlice";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);

  const audioInstance = useRef(null);
  // audioPlayerStateSlice
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
  `;

  const mainSection = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
      <Sidebar />
      <div css={mainSection}>
        <Header />
        <TopAlbum />
        <TrendingAlumsSongs />
        {isPlayClicked ? (
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
            showDestroy={true}
            mode={"full"}
          />
        ) : null}
      </div>
    </div>
  );
}
