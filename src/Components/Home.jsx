// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import Login from "./Login";

export default function Home() {
  return (
    <div className="home">
      <h1>fdgvdfvd</h1>
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/playlist/6Q5VCWX86yJeOOwBl539up?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: "360px" }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
      <Login />
    </div>
  );
}
