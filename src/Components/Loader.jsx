import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    width={300}
    height={70}
    speed={2}
    viewBox="0 0 300 70"
    {...props}
  >
    <rect
      className="cls-2"
      x=".23"
      y=".23"
      width="85.03"
      height="70.73"
      rx="17.07"
      ry="17.07"
    />
    <rect className="cls-2" x="99.18" y="25.81" width="95.94" height="19.57" />
    <rect className="cls-1" x="99.18" y="8.51" width="205.8" height="7.53" />
    <rect className="cls-2" x="99.18" y="49.52" width="95.94" height="19.57" />
    <rect className="cls-2" x="209.04" y="25.81" width="95.94" height="19.57" />
    <rect className="cls-2" x="209.04" y="49.52" width="95.94" height="19.57" />
  </ContentLoader>
);

export default MyLoader;
