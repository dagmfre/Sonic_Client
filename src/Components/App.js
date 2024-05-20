import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import { Global, css } from "@emotion/react";
import MyFavorite from "./MyFavorite";
import Uploader from "./Uploader";

const globalStyles = css`
  body {
    font-family: cursive, sans-serif;
    margin: 0;
    padding: 0;
    color: #303538;
  }
  html {
    scroll-behavior: smooth;
  }
`;

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<MyFavorite />} />
        <Route path="/upload" element={<Uploader />} />
      </Routes>
    </>
  );
};

export default App;
