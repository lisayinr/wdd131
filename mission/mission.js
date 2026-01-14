let selectElem = document.querySelector('#theme-select');
let pageContent = document.querySelector('body');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current === 'light') {
        document.body.style.backgroundColor = "white";
        pageContent.style.color = "black";

        const image = document.querySelector('img');
        image.setAttribute('src', 'byui-logo-blue.webp');
    }
    else if (current === 'dark') {
        document.body.style.backgroundColor = "black";
        pageContent.style.color = "white";

        const image = document.querySelector('img');
        image.setAttribute('src', 'byui-logo-white.png');
    }
    else {
        //default
        document.body.style.backgroundColor = "white";
        pageContent.style.color = "black";

        const image = document.querySelector('img');
        image.setAttribute('src', 'byui-logo-blue.webp');
    }
}