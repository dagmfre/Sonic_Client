/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios"; // For API calls
import Header from "./Home/Header";
import Sidebar from "./Home/Sidebar";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentPlayingSong } from "./currentPlayingSlice";
import "react-jinke-music-player/assets/index.css";
import ReactJkMusicPlayer from "react-jinke-music-player";

const Uploader = () => {
  const [title, setTitle] = useState("");
  const [singer, setSinger] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [successfulMsg, setSuccessfulMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const dispatch = useDispatch();
  const breakpoints = [1000];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);
  const [isPostClicked, setIsPostClicked] = useState(false);
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadCont = css`
    display: flex;
    flex-direction: row-reverse;
    > :nth-of-type(1) {
      flex: 75%;
      padding-bottom: 3rem;
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

  const inputCont = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > * {
      max-width: 100%;
      > * {
        width: 100%;
      }
    }
  `;

  const form = css`
    display: grid;
    grid-template: auto / minmax(0, 800px) 1fr;

    > :nth-child(2) {
      grid-area: 1/1/5/2;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-right: 2rem;
      border: 4px dashed #00000026;
      border-radius: 16px;
      background-color: aliceblue;
      padding: 0 2rem;
      flex-direction: column;
      text-align: center;
      ${mq[0]} {
        margin-right: 0;
        padding: 2rem;
      }
      h3 {
        margin-top: 1rem;
        margin-bottom: 0;
        font-size: 1.2rem;
        background-color: #faebd7a1;
        color: #000000ad;
      }
      input {
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
      }
      img {
        width: 100%;
        max-width: 300px;
        margin: 0 2rem;
        opacity: 0.6;
      }
    }
    > :nth-child(3) {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      border: 4px dashed #00000026;
      border-radius: 16px;
      background-color: aliceblue;
      padding: 0 2rem;
      flex-direction: column;
      text-align: center;
      padding: 2rem;
      position: relative;
      ${mq[0]} {
        margin: 0;
      }
      input {
        position: absolute;
        opacity: 0;
      }
      h3 {
        margin-top: 1rem;
        margin-bottom: 0;
        font-size: 1.2rem;
        color: #000000ad;
        background-color: #faebd7a1;
      }
      img {
        width: 100%;
        max-width: 150px;
        margin: 0 2rem;
        opacity: 0.6;
      }
    }
    > :nth-child(5) {
      grid-column: 2;
      max-width: 340px;
      margin: 0 auto;
      width: 100%;
      align-self: end;
    }
    ${mq[0]} {
      grid-template: inherit;
      gap: 1rem;
    }
    > :nth-child(4) {
      font-size: 1.2rem;
      font-family: cursive;
      margin-top: 1rem;
    }
  `;

  const successMsgCont = css`
    display: flex;
    align-items: center;
    background-color: #c3fabe;
    max-width: 100%;
    padding: 5px;
    font-size: 1.1rem;
    gap: 10px;
    p {
      margin: 0;
    }
    img {
      width: 40px;
    }
  `;

  const errMsgCont = css`
    display: flex;
    align-items: center;
    max-width: 100%;
    gap: 10px;
    p {
      margin: 0;
    }
    background-color: #ff0000a6;
    padding: 10px 1rem;
    font-size: 1.3rem;
    font-weight: 700;
  `;

  function cutFirstSevenCharacters(str) {
    return str.slice(8);
  }

  const [myLists, setMyLists] = useState([]);
  const [fetchedImage, setFetchedImage] = useState(false);

  const fetchSongData = async () => {
    try {
      const response = await fetch("https://sonic-api.onrender.com/api/songs");
      const data = await response.json();
      setMyLists(data);
      setFetchedImage(true);
    } catch (error) {
      console.error("Error fetching the files list:", error);
    }
  };

  const handleDelete = async (title) => {
    try {
      const response = await axios.delete(
        `https://sonic-api.onrender.com/api/songs/${title}`
      );
      if (response.status === 200) {
        fetchSongData();
      }
    } catch (error) {
      console.error("There was an error deleting the song!", error);
    }
  };

  useEffect(() => {
    fetchSongData();
  }, []);

  useEffect(() => {
    if (!fetchedImage) return;

    const fetchImageFiles = async () => {
      try {
        const imageSrcs = await Promise.all(
          myLists.map(async (myList) => {
            const response = await fetch(
              `https://sonic-api.onrender.com/uploads/${cutFirstSevenCharacters(
                myList.imagePath
              )}`
            );
            const blob = await response.blob();
            return URL.createObjectURL(blob);
          })
        );

        const updatedLists = myLists.map((myList, index) => ({
          ...myList,
          imgSrc: imageSrcs[index],
        }));

        setMyLists(updatedLists);
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    fetchImageFiles();
  }, [fetchedImage]);

  const currentPlayingTitle = useSelector(
    (state) => state.currentPlayingSong.currentSongInfo.name
  );

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

  const isPlaying = useSelector((state) => state.currentPlayingSong.isPlaying);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSuccessTimeout = () => {
    setSuccessfulMsg("Song uploaded successfully");
    setIsPostClicked(false);
    setTimeout(() => {
      setSuccessfulMsg("");
    }, 3000);
  };

  const handleErrMsgTimeout = () => {
    setErrMsg("All Fields Are Required!!");
    setTimeout(() => {
      setErrMsg("");
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("singer", singer);
    formData.append("song", selectedFile);
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "https://sonic-api.onrender.com/api/songs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Song uploaded successfully:", response.data);
      fetchSongData();
      handleSuccessTimeout();
      setTitle("");
      setSinger("");
      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading song:", error);
      handleErrMsgTimeout();
    }
  };

  useEffect(() => {
    fetchSongData();
  }, []);

  const myListCont = css`
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
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  `;

  const myListTrack = css`
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
      ${mq[0]} {
        > p:nth-of-type(1) {
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

  const deleteCont = css`
    p:nth-of-type(1) {
      font-weight: 900;
      font-size: 2rem;
      margin: 0 0 1rem;
      cursor: pointer;
    }
    p:nth-of-type(2) {
      color: black;
      transition: 0.3s;
      padding: 10px 1rem;
      right: 0;
      background-color: #bdbdbd;
      border-radius: 7px;
      bottom: 40%;
      position: absolute;
      font-size: 1.1rem;
      cursor: pointer;
    }
    p:nth-of-type(2):hover {
      background-color: #a01414;
      color: white;
    }
    position: relative;
  `;

  const noSongCont = css`
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

  const handleDotMenuClick = (index) => {
    setOpenedMenuIndex(openedMenuIndex === index ? null : index);
  };

  const postClickHandler = () => {
    setIsPostClicked(true);
    if (successfulMsg !== "") {
      setIsPostClicked(false);
    }
  };

  return (
    <div css={uploadCont}>
      <div>
        <Header />
        {successfulMsg !== "" ? (
          <div css={successMsgCont}>
            <img src="check.png" alt="" />
            <p>{successfulMsg}</p>
          </div>
        ) : null}
        {errMsg !== "" ? (
          <div css={errMsgCont}>
            <i class="fa-solid fa-circle-xmark"></i>
            <p>{errMsg}</p>
          </div>
        ) : null}
        <form css={form} onSubmit={handleSubmit}>
          <div css={inputCont}>
            <label>
              <TextField
                id="filled-basic"
                label="Enter Title of the Song…"
                variant="filled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="filled-basic"
                label="Enter Artist Name…"
                variant="filled"
                value={singer}
                onChange={(e) => setSinger(e.target.value)}
              />
            </label>
          </div>
          <label>
            <img src="upload.svg" alt="" />
            <input type="file" accept=".mp3" onChange={handleFileChange} />
            <h3>Upload Your Audio File(.mp3)</h3>
            {selectedFile ? (
              <p>{truncateTrackName(selectedFile.name, 20)}</p>
            ) : null}
          </label>
          <label>
            <img src="upload2.svg" alt="" />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
            />
            <h3>Upload Song Cover Image(.jpg,.jpeg,.png)</h3>
            {selectedImage ? (
              <p>{truncateTrackName(selectedImage.name, 20)}</p>
            ) : null}
          </label>
          <Button onClick={postClickHandler} type="submit" variant="contained">
            {isPostClicked && (errMsg || successfulMsg) === "" ? (
              <p>loading...</p>
            ) : (
              "Post You Song"
            )}
          </Button>
        </form>
        <div css={myListCont}>
          <h1>My Favorite Songs</h1>
          {myLists && myLists.length > 0 ? (
            myLists.map((mySong, index) => (
              <div css={myListTrack} key={index}>
                <div>
                  <p>0{index + 1}</p>
                  <img
                    rel="preload"
                    src={`${
                      mySong.imgSrc ? mySong.imgSrc : "music-avatar.jpg"
                    }`}
                    alt={`Album cover`}
                  />
                  <div
                    onClick={() =>
                      handleDispatch({
                        name: mySong.title,
                        singer: mySong.singer,
                        albumName: "",
                        cover: `https://sonic-api.onrender.com/uploads/${cutFirstSevenCharacters(
                          mySong.imagePath
                        )}`,
                        musicSrc: `https://sonic-api.onrender.com/uploads/${cutFirstSevenCharacters(
                          mySong.songPath
                        )}`,
                        duration: "4:00",
                      })
                    }
                  >
                    {currentPlayingTitle === mySong.title && isPlaying ? (
                      <i className="fa-solid fa-pause"></i>
                    ) : (
                      <i className="fa-solid fa-play"></i>
                    )}
                  </div>
                  <h3>{truncateTrackName(mySong.title, 15)}</h3>
                </div>
                <div>
                  <p>{truncateTrackName(mySong.singer, 15)}</p>
                  <div css={deleteCont}>
                    <p onClick={() => handleDotMenuClick(index)}>...</p>
                    <p
                      onClick={() => {
                        handleDelete(mySong.title);
                      }}
                      style={{
                        display: openedMenuIndex === index ? "initial" : "none",
                      }}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div css={noSongCont}>
              <p>No songs are added yet!!</p>
            </div>
          )}
        </div>
      </div>
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
      <Sidebar />
    </div>
  );
};

export default Uploader;
