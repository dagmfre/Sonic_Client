import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import { Global, css } from "@emotion/react";
import MyFavorite from "./MyFavorite";
import Uploader from "./Uploader";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Home/Login.jsx";
import Signup from "./Home/Signup.jsx";
import { useDispatch } from "react-redux";
import { fetchUserRequest } from "./authSlice.js";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<MyFavorite />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Uploader />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
