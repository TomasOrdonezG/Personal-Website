import React from "react";
import "./Photography.css";
import PhotographyWheel from "./components/PhotographyWheel/PhotographyWheel";

function Photography() {
  document.title = "Tomas Ordonez - Photography";
  return (
    <div className="photography-page">
      <PhotographyWheel collection="portugal" />
      <PhotographyWheel collection="flowers" />
    </div>
  );
}
export default Photography;
