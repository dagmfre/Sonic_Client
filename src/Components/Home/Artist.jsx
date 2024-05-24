/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import ArtistLoader from "../ArtistLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistRequest } from "../artistSlice";
export default function Artist() {
  const dispatch = useDispatch();
  const { artists, loading, error } = useSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtistRequest());
  }, [dispatch]);

  const artistsCont = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 2rem;
    padding-top: 5rem;
    position: relative;
    h1 {
      position: absolute;
      top: 0;
      font-size: 2rem;
    }
    div {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }
  `;

  const artistImg = css`
    border-radius: 50%;
    width: 100%;
  `;

  const loaderCont = css`
    padding: 0 2rem;
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  return (
    <div id="artists">
      {loading && (
        <div css={loaderCont}>
          <ArtistLoader />
        </div>
      )}

      {error && <p>Error: {error}</p>}

      {artists && artists.length !== 0 && (
        <div css={artistsCont}>
          <h1>Top Artists</h1>
          {artists.map((artist) => (
            <div css={artist} key={artist.id}>
              <h2>{artist.name}</h2>
              <img
                css={artistImg}
                src={artist.picture_medium}
                alt={artist.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
