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

    for(entry of entries){
        console.log(entry);
        // Build div based on entry
        let menuItem = document.createElement('div');
        menuItem.classList.add("nav-item");
        console.log(menuItem);
        
        // Attach div to navbar

    }


    // console.log(pageTitle);
    // console.log(navbar);


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