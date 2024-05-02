/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Sidebar() {
  const sidebar = css`
    display: flex;
    flex-direction: column;
    z-index: 1000;
    height: 100vh;
    flex: 15%;
    background-color: #f8f9fa;
    padding: 1.5rem 0 0 3rem;
    position: sticky;
    top: 0;
  `;

  const logoCont = css`
    display: flex;
    gap: 10px;
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

    div {
      display: flex;
      cursor: pointer;
      align-items: center;
      gap: 1rem;
      padding: 5px 60px 5px 20px;
      border-radius: 5px;
      max-width: max-content;
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

  return (
    <div css={sidebar} className="sidebar">
      <div css={logoCont} className="logo-cont">
        <img src="logo.svg" alt="" />
        <h1>SONIC</h1>
      </div>
      <div css={sidebarMenu}>
        <h1 className="sidebar-menu-topic">Discover</h1>
        <div>
          <i class="fa-solid fa-house"></i>
          <h1>Home</h1>
        </div>
        <div>
          <i className="fa-solid fa-user"></i>
          <h1>Artists</h1>
        </div>
        <div>
          <i className="fa-regular fa-circle-play"></i>
          <h1>Tracks</h1>
        </div>
        <div>
          <i className="fa-regular fa-folder"></i>
          <h1>Albums</h1>
        </div>
      </div>
      <div css={[sidebarMenu, libraryCont]} className="library-cont">
        <h1 className="sidebar-menu-topic">Library</h1>
        <div>
          <i class="fa-regular fa-clock"></i>
          <h1>Recent</h1>
        </div>
        <div>
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <h1>My list</h1>
        </div>
      </div>
    </div>
  );
}
