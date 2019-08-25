let coop_elm;
document.addEventListener("DOMContentLoaded", initCoOpEml);

function initCoOpEml() {
    coop_elm = document.getElementById("co-op");
    coop_elm.addEventListener("click", coopClickHandle);
}

function coopClickHandle(event) {
    switchToInput(this); //FYI: this == event.target == coop_elm

}

function switchToInput(elm) {
    let new_elm = document.createElement('form');
    new_elm.setAttribute("action", '/co-op.html');
    new_elm.innerHTML = 'Name: <input type="text" name="name"><br><input type="submit" value="Submit">'
    elm.parentNode.replaceChild(new_elm, elm);
}