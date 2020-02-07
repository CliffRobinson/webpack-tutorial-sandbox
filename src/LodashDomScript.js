import _ from "lodash";
import "./style.css";
import galliaImg from "./images/Gallia-of-the-Endless-Dance-Theros-Beyond-Death-Art.jpg";

export function addLodashEl() {
  const element = document.createElement("div");

  element.innerHTML = _.join(
    ["whaddup", "chumps", "we", "packin", "webs", "nauuuu"],
    "---"
  );

  return element;
}

export function addGallia() {
  const gallia = new Image();
  gallia.src = galliaImg;

  const frame = document.createElement("div");
  frame.classList.add("frame");
  frame.innerHTML = gallia;
  return gallia;
}
