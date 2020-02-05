function addEl() {
  const element = document.createElement("div");

  element.innerHTML = "I was made by a script in the public file.";

  return element;
}
document.body.appendChild(addEl());
