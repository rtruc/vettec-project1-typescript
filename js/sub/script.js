let topButton;
let images;
let currentlyZoomedImage;

function scrollToTop() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    console.log('Hey!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// function zoomImage() {
//     // If image that was clicked on is already zoomed, unzoom and return
//     if (currentlyZoomedImage == this) {
//         currentlyZoomedImage.classList.remove("zoom");
//         currentlyZoomedImage = null;
//         return;
//     }

//     // If a different image is zoomed, unzoom that image and then zoom
//     // the image that was clicked on
//     if (currentlyZoomedImage) {
//         currentlyZoomedImage.classList.remove("zoom");
//     }
//     this.classList.add("zoom");
//     currentlyZoomedImage = this;

//     // How to center image?
// }






// window.addEventListener('DOMContentLoaded', () => {
    
// })

window.addEventListener('load', () => {
    // images = document.getElementsByClassName("gallery-img");
    // for (let i = 0; i < images.length; i++) {
    //     images[i] = images[i].addEventListener('click', zoomImage);
    // }
    topButton = document.getElementById('active');
    // console.log(topButton);
    topButton.addEventListener('click', scrollToTop);
})