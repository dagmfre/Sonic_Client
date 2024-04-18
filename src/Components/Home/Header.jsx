export default function Header() {
  return (
    <div className="header">
      <div className="search-cont">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>Search</p>
      </div>
      <div className="upload-cont">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        <p>Upload Your Song</p>
      </div>
      <div className="">
        <i class="fa-solid fa-user"></i>
        <div>
          <p>Dagmfre</p>
          <p>Premium</p>
        </div>
        <i class="fa-solid fa-circle-chevron-down"></i>
      </div>
    </div>
  );
}
