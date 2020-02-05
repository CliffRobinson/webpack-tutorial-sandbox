import _ from "lodash";
import "./style.css";

function addLodashEl() {
  const element = document.createElement("div");

  element.innerHTML = _.join(
    ["whaddup", "chumps", "we", "packin", "webs", "nauuuu"],
    "---"
  );

  return element;
}
document.body.appendChild(addLodashEl());
