let topButton;
let images;
let currentlyZoomedImage;

function scrollToTop() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function zoomImage() {
    // If image that was clicked on is already zoomed, unzoom and return
    if (currentlyZoomedImage == this) {
        currentlyZoomedImage.classList.remove("zoom");
        currentlyZoomedImage = null;
        return;
    }

    // If a different image is zoomed, unzoom that image and then zoom
    // the image that was clicked on
    if (currentlyZoomedImage) {
        currentlyZoomedImage.classList.remove("zoom");
    }
    this.classList.add("zoom");
    currentlyZoomedImage = this;

    // How to center image?
}

class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        let pageTitle = document.getElementById('title').textContent;

        let entries = [["nav-item", "./index.html", "Home"],
            ["nav-item", "./about-me.html", "About Me"],
            ["nav-item", "./journey.html", "My Journey"]];

        for (let entry of entries) {
            if (entry[2] != pageTitle) {
                this.innerHTML += `<div class="${entry[0]}"><a href="${entry[1]}">${entry[2]}</a></div>`;
            } else {
                this.innerHTML += `<div class="${entry[0]}"><a id="active">${entry[2]}</a></div>`;
            }
        }

        this.innerHTML +=
        `<form class="search-form" action="https://google.com/search" method="get">
            <input type="hidden" name="sitesearch" value="https://github.com/rtruc/vettec-project1" />
            <input class="search-field" type="text"id="search" name="q" autocomplete="off" placeholder="search" />
        </form>`;

    }
}

customElements.define('nav-bar', NavBar);



function buildNavBar_TemplateStrings() {
    let pageTitle = document.getElementById('title').textContent;
    let navbar = document.getElementById('navbar');

    let entries = [["nav-item", "./index.html", "Home"],
            ["nav-item", "./about-me.html", "About Me"],
            ["nav-item", "./journey.html", "My Journey"]];

    for (entry of entries) {
        let newDiv;
        if (entry[2] != pageTitle) {
            newDiv = `<div class="${entry[0]}"><a href="${entry[1]}">${entry[2]}</a></div>`;
        } else {
            newDiv = `<div class="${entry[0]}"><a id="active">${entry[2]}</a></div>`
        }
        console.log(newDiv);
        navbar.innerHTML += newDiv;
    }

    let searchDiv = 
    `<form class="search-form" action="https://google.com/search" method="get">
        <input type="hidden" name="sitesearch" value="https://github.com/rtruc/vettec-project1" />
        <input class="search-field" type="text"id="search" name="q" autocomplete="off" placeholder="search" />
    </form>`;
    navbar.innerHTML += searchDiv;


}

function buildNavBar_Programmatically() {
    let pageTitle = document.getElementById('title').textContent;
    let navbar = document.getElementById('navbar');

    let entries = [["nav-item", "./index.html", "Home"],
                   ["nav-item", "./about-me.html", "About Me"],
                   ["nav-item", "./journey.html", "My Journey"]];

    // Build NavBar Entries
    for (entry of entries) {
        // Build div based on current entry
        let menuItem = document.createElement('div');
        menuItem.classList.add(entry[0]);

        let menuLink = document.createElement('a');

        if (pageTitle == entry[2]) {
            menuLink.id = "active";
        } else {
            menuLink.href = entry[1];
        }

        menuLink.text = entry[2];

        menuItem.appendChild(menuLink);

        // Attach div to navbar
        navbar.appendChild(menuItem);

    }


    // Build search bar
    let searchBar = document.createElement('form');
    searchBar.classList.add("search-form");
    searchBar.action = "https://google.com/search";
    searchBar.method = "get";

    let input1 = document.createElement('input');
    input1.type = "hidden";
    input1.name = "sitesearch";
    input1.value = "https://rtruc.github.io";
    searchBar.appendChild(input1);

    let input2 = document.createElement('input');
    input2.classList.add("search-field");
    input2.type = "text";
    input2.id = "search";
    input2.name = "q";
    input2.autocomplete = "off";
    input2.placeholder = "search;"
    searchBar.appendChild(input2);

    navbar.appendChild(searchBar);
}



window.addEventListener('DOMContentLoaded', () => {
    images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
        images[i] = images[i].addEventListener('click', zoomImage);
    }

    // buildNavBar_Programmatically();
    // buildNavBar_TemplateStrings();

    topButton = document.getElementById('active');
    topButton.addEventListener('click', scrollToTop);
})