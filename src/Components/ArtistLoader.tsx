import ContentLoader from "react-content-loader";

const ArtistLoader = (props) => (
  <ContentLoader
    width={308}
    height={117}
    speed={2}
    viewBox="0 0 308 117"
    {...props}
  >
    <circle className="cls-1" cx="26.54" cy="26.54" r="26.44" />
    <circle className="cls-1" cx="90.39" cy="26.54" r="26.44" />
    <circle className="cls-1" cx="154.25" cy="26.54" r="26.44" />
    <circle className="cls-1" cx="218.1" cy="26.54" r="26.44" />
    <circle className="cls-1" cx="281.95" cy="26.54" r="26.44" />
    <circle className="cls-1" cx="26.54" cy="91.13" r="26.44" />
    <circle className="cls-1" cx="90.39" cy="91.13" r="26.44" />
    <circle className="cls-1" cx="154.25" cy="91.13" r="26.44" />
    <circle className="cls-1" cx="218.1" cy="91.13" r="26.44" />
    <circle className="cls-1" cx="281.95" cy="91.13" r="26.44" />
  </ContentLoader>
);

export default ArtistLoader;
