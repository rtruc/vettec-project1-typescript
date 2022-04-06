// scrollButton = document.getElementById("active");

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

function buildNavBar() {
    let pageTitle = document.getElementById('title').textContent;
    let navbar = document.getElementById('navbar');

    let entries = [["nav-item", "./index.html", "Home"],
                    ["nav-item", "./about-me.html", "About Me"],
                    ["nav-item", "./journey.html", "My Journey"]];

    // Build NavBar Entries
    for(entry of entries){
        // Build div based on current entry
        let menuItem = document.createElement('div');
        menuItem.classList.add(entry[0]);

        let menuLink = document.createElement('a');

        if(pageTitle == entry[2]) {
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

    buildNavBar();

    topButton = document.getElementById('active');
    topButton.addEventListener('click', scrollToTop);
})