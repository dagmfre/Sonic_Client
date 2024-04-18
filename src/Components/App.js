import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import { Global, css } from "@emotion/react";

// Define global styles
const globalStyles = css`
  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    color: #303538;
  }
`;

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
