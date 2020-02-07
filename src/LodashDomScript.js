import _ from "lodash";
import "./style.css";
import galliaImg from "./images/Gallia-of-the-Endless-Dance-Theros-Beyond-Death-Art.jpg";
import data from "./data/data.xml";

export function addLodashEl() {
  const element = document.createElement("div");

  element.innerHTML = _.join(
    ["whaddup", "chumps", "we", "packin", "webs", "nauuuu"],
    "---"
  );
  console.log(data);
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
