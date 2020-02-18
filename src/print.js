function printStuff() {
    console.log("printy prunty print pruuuuuunt");
}

export function addButton() {
    const btn = document.createElement('button')
    btn.innerHTML = "Whatever this prints its probably genius."
    btn.onclick = printStuff

    return btn;
}