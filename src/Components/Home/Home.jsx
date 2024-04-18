import Header from "./Header";
import Sidebar from "./Sidebar";
import TopAlbum from "./TopAlbum";
import TrendingAlumsSongs from "./TrendingAlumsSongs";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-main">
        <Header />
        <TopAlbum />
        <TrendingAlumsSongs />
      </div>
    </div>
  );
}
