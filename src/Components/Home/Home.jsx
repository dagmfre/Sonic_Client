/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TopAlbum from "./TopAlbum";
import TrendingAlumsSongs from "./TrendingAlumsSongs";

export default function Home() {
  const sidebarBackground = css`
    height: 100vh;
    max-width: 278px;
    width: 100%;
  `;

  const home = css`
    display: flex;
  `;

  return (
    <div css={home}>
      <Sidebar />
      <div css={sidebarBackground}></div>
      <div>
        <Header />
        <TopAlbum />
        <TrendingAlumsSongs />
      </div>
    </div>
  );
}
