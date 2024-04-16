import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

interface ImageLinkProps {
  imgNum: number;
  to: string;
  title: string;
}
function ImageLink(props: ImageLinkProps): React.JSX.Element {
  const { title, imgNum, to } = props;
  return (
    <Link to={to} className="image-link">
      <div className="img-container">
        <div className="centered-text">{title}</div>
        <img src={require(`../photography/assets/portugal/i${imgNum}.jpg`)} draggable={false} />
        <div className="overlay"></div>
      </div>
    </Link>
  );
}

export default function Home(): React.JSX.Element {
  document.title = "Tomas Ordonez";
  return (
    <div className="home-page">
      <h1>Tomas Ordonez Gonzalez</h1>
      <nav className="home-nav">
        <ImageLink to="/about" imgNum={1} title="About me" />
        <ImageLink to="/contact" imgNum={2} title="Contact" />
        <ImageLink to="/photography" imgNum={7} title="Photography" />
      </nav>
    </div>
  );
}
