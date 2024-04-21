/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const header = css`
  display: flex;
  padding: 1.5rem 2rem;
  justify-content: space-between;
  p {
    margin: 0;
  }
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
`;

const uploadCont = css`
  display: flex;
  align-items: center;
  max-width: 390px;
  width: 100%;
  border: 1px solid #484848a3;
    padding: 0 10px;
    gap: 10px;
    max-width: max-content;
`;

const accountCont = css`
  display: flex;
  align-items: center;
`;

const userPic = css`
  padding: 10px;
  border-radius: 50%;
  border: 1px solid;
`;

const userNameCont = css`
  margin: 0 1rem 0 1rem;
  P:nth-child(1) {
    font-size: 1.1rem;
    font-weight: 600;
  }
  P:nth-child(2) {
    font-size: 0.8rem;
    margin-top: 4px;
  }
`;

const arrowIcon = css`
  font-size: 1.1rem;
`;

export default function Header() {
  return (
    <div css={header}>
      <div css={searchCont}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>Search Songs, Artists, Albums ...</p>
      </div>
      <div css={uploadCont}>
        <i className="fa-solid fa-cloud-arrow-up"></i>
        <p>Upload Your Song</p>
      </div>
      <div css={accountCont}>
        <i css={userPic} className="fa-solid fa-user"></i>
        <div css={userNameCont}>
          <p>Dagmfre</p>
          <p>Premium</p>
        </div>
        <i css={arrowIcon} className="fa-solid fa-circle-chevron-down"></i>
      </div>
    </div>
  );
}
