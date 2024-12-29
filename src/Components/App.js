import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import { Global, css } from "@emotion/react";
import MyFavorite from "./MyFavorite";
import Uploader from "./Uploader";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Home/Login.jsx";
import Signup from "./Home/Signup.jsx";

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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favorites" element={<MyFavorite />} />
        <Route path="/upload" element={<Uploader />} />
      </Routes>
    </>
  );
};

export default App;
