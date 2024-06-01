/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { toggleMenuClick } from "../menuClickSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const breakpoints = [400, 500, 768, 890];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

  const isMenuClicked = useSelector(
    (state) => state.menuClickedStatus.isMenuClicked
  );

  const sidebar = css`
    display: flex;
    flex-direction: column;
    z-index: 1000;
    height: 100vh;
    flex: 15%;
    background-color: #f8f9fa;
    padding: 1.5rem 0 0 3rem;
    position: sticky;
    height: 100%;
    min-height: 100vh;
    top: 0;
    ${mq[2]} {
      display: none;
    }
  `;

  const sidebarPro = css`
    visibility: hidden;
    opacity: 0;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.26) -1px 0px 5px;
    height: 100%;
    z-index: 10;
    background-color: white;
    ${mq[2]} {
      visibility: inherit;
      opacity: 1;
    }
  `;

  const logoCont = css`
    display: flex;
    gap: 10px;
    text-decoration: none;
    color: #303538;
    text-decoration: none;
    color: rgb(48, 53, 56);
    img {
      max-width: 35px;
    }
    h1 {
      margin: 0;
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-style: normal;
    }
  `;
  const sidebarMenu = css`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    gap: 1rem;

    a {
      display: flex;
      cursor: pointer;
      align-items: center;
      gap: 1rem;
      padding: 5px 60px 5px 20px;
      border-radius: 5px;
      max-width: max-content;
      text-decoration: none;
      &:hover {
        background: #4d85fe;
        transition: 0.3s;
        color: white;
        > * {
          color: white;
        }
      }
    }

    i {
      color: #000000bf;
    }

    h1 {
      margin: 0;
      color: #000000bf;
      font-size: 1.5rem;
    }

    h1:nth-child(1) {
      margin: 0 0 6px 0;
      font-size: 1.4rem;
      opacity: 0.6;
    }
  `;

  const libraryCont = css`
    margin-top: 4rem;
  `;

  const searchCont = css`
    display: flex;
    align-items: center;
    max-width: 390px;
    width: 100%;
    flex: 1;
    border: 1px solid #484848a3;
    padding: revert-layer;
    padding-left: 10px;
    gap: 10px;
    display: none;
    margin: 0;
    ${mq[1]} {
      display: inherit;
    }
    p {
      margin: 10px 0;
      font-size: 1rem;
    }
  `;

  const uploadCont = css`
    display: flex;
    align-items: center;
    max-width: 390px;
    width: 100%;
    text-decoration: none;
    color: rgb(48, 53, 56);
    border: 1px solid #484848a3;
    padding: 0 10px;
    gap: 10px;
    max-width: max-content;
    cursor: pointer;
    display: none;
    margin: 0;
    p {
      margin: 10px 0;
      font-size: 1rem;
    }
    ${mq[0]} {
      display: inherit;
    }
  `;

  const menu = css`
    display: none;
    margin: 0 auto;
    ${mq[2]} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    i {
      font-size: 1.8rem;
    }
  `;

  return (
    <>
      <div css={sidebar} className="sidebar">
        <Link css={logoCont} to="/">
          <img src="logo.svg" alt="" />
          <h1>SONIC</h1>
        </Link>
        <div css={sidebarMenu}>
          <h1 className="sidebar-menu-topic">Discover</h1>
          <a href={location.pathname === "/" ? "#" : "/"}>
            <i class="fa-solid fa-house"></i>
            <h1>Home</h1>
          </a>
          <a href={location.pathname === "/" ? "#artists" : "/#artists"}>
            <i className="fa-solid fa-user"></i>
            <h1>Artists</h1>
          </a>
          <a href={location.pathname === "/" ? "#tracks" : "/#tracks"}>
            <i className="fa-regular fa-circle-play"></i>
            <h1>Tracks</h1>
          </a>
        </div>
        <div css={[sidebarMenu, libraryCont]} className="library-cont">
          <h1 className="sidebar-menu-topic">Library</h1>
          <Link to="/favorites">
            <i class="fa-regular fa-clock"></i>
            <h1>My favorite</h1>
          </Link>
          <Link to={"/upload"}>
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <h1>My list</h1>
          </Link>
        </div>
      </div>
      <div
        style={{
          left: isMenuClicked ? "initial" : "100%",
          right: isMenuClicked ? "0" : "initial",
          display: isMenuClicked ? "initial" : "none",
        }}
        css={sidebarPro}
      >
        <Sidebar>
          <Menu>
            <MenuItem>
              <Link css={logoCont} to="/" className="logo-cont">
                <img src="logo.svg" alt="" />
                <h1>SONIC</h1>
                <div css={menu} onClick={() => dispatch(toggleMenuClick())}>
                  {isMenuClicked ? (
                    <i class="fa-solid fa-x"></i>
                  ) : (
                    <i class="fa-solid fa-bars"></i>
                  )}
                </div>
              </Link>
            </MenuItem>
            <MenuItem>
              <div css={searchCont}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <p>Search Songs ...</p>
              </div>
            </MenuItem>
            <MenuItem>
              <Link to="/upload" css={uploadCont}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <p>Upload Your Song</p>
              </Link>
            </MenuItem>
            <MenuItem>
              <h3>Discover</h3>
            </MenuItem>
            <MenuItem>
              <a href={location.pathname === "/" ? "#" : "/"}>
                <i class="fa-solid fa-house"></i>
                <h1>Home</h1>
              </a>
            </MenuItem>
            <MenuItem>
              <a href={location.pathname === "/" ? "#artists" : "/#artists"}>
                <i className="fa-solid fa-user"></i>
                <h1>Artists</h1>
              </a>
            </MenuItem>
            <MenuItem>
              <a href={location.pathname === "/" ? "#tracks" : "/#tracks"}>
                <i className="fa-regular fa-circle-play"></i>
                <h1>Tracks</h1>
              </a>
            </MenuItem>
            <MenuItem>
              <h3>Library</h3>
            </MenuItem>
            <MenuItem>
              <Link to="/favorites">
                <i class="fa-regular fa-clock"></i>
                <h1>My favorite</h1>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/upload"}>
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <h1>My list</h1>
              </Link>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      ;
    </>
  );
}
