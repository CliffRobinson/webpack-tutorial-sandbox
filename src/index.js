import { addEl } from "./DOMscript";
import { addLodashEl, addGallia } from "./LodashDomScript";
import { addButton } from "./print"

document.body.appendChild(addEl());
document.body.appendChild(addLodashEl());
document.body.appendChild(addGallia());
document.body.appendChild(addButton())