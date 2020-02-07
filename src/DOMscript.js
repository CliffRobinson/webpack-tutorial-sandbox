export function addEl() {
  const element = document.createElement("div");
  element.classList.add('myClass');
  element.innerHTML = "I was made by a script in the public file.";

  return element;
}


