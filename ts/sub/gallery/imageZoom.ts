let currentlyZoomedImage: any = null;
export const thumbnailQuality = "thumbnail";
const zoomQuality = "large";
let shadowBox: HTMLElement | null;


export function enableClickToZoomOnImages() {

    let galleryImg = Array.from( document.getElementsByClassName("gallery-img-2"));
    galleryImg = galleryImg.concat(Array.from( document.getElementsByClassName("gallery-img-1")))
    galleryImg = galleryImg.concat(Array.from( document.getElementsByClassName("gallery-img")))

    for(const img of galleryImg) {
        img.addEventListener('click', zoomImage);
    }

    shadowBox = document.getElementById('shadow-box');
}


function zoomImage(this: any, event: any) {

    // STOP CLICKS PROPAGATING TO WHITE SPACE AND CANCELING ZOOM
    event.stopPropagation();

    // IF CURRENTLY ZOOMED IMAGE WAS CLICKED, UN-ZOOM AND RETURN
    if (currentlyZoomedImage === this) {
        if (shadowBox) {
            shadowBox.style.background = 'rgba(0, 0, 0, 0.0)';
        }

        this.style.transform = null;

        // DELAY RESTING Z AXIS SO ZOOMED IMAGE DOESN'T 'POP' UNDERNEATH OTHER IMAGES
        setTimeout(() => this.style.zIndex = null, 250);

        // RETURN TO THUMBNAIL QUALITY
        this.src = this.src.replace(zoomQuality, thumbnailQuality);
        currentlyZoomedImage = null;
        return;
    }

    // DIFFERENT IMAGE IS CURRENTLY ZOOMED, UN-ZOOM THAT IMAGE BEFORE PRECEDING
    if (currentlyZoomedImage) {
        currentlyZoomedImage.style.transform = null;
        currentlyZoomedImage.style.zIndex = null;
        currentlyZoomedImage.src = currentlyZoomedImage.src.replace(zoomQuality, thumbnailQuality);
    }

    // RAISE ZOOMED IMAGE ABOVE OTHER IMAGES
    this.style.zIndex = '5';

    // TODO: ADD COMMENT BOX WHEN ZOOMING
    // let parent = this.parentElement;
    // console.log("this", this);
    // console.log("parent", parent);

    //CALCULATE CENTER OF SCREEN FOR IMAGE
    let screenX = window.innerWidth;
    let screenY = window.innerHeight;

    let boundingRect = this.getBoundingClientRect();
    let divX = boundingRect.x;
    let divY = boundingRect.y;
    let divHeight = boundingRect.height;
    let divWidth = boundingRect.width;

    let yTranslate = screenY / 2 - divY - divHeight / 2;
    let xTranslate = screenX / 2 - divX - divWidth / 2;

    let overScan = 100;
    let heightMultiplier = (screenY - overScan) / divHeight;
    let widthMultiplier = (screenX - overScan) / divWidth;
    let scaleMultiplier = heightMultiplier < widthMultiplier ? heightMultiplier : widthMultiplier;

    this.style.transform = `translate(${xTranslate}px,${yTranslate}px) scale(${scaleMultiplier}) `;

    // DEBUG INFO FOR CENTERING
    // console.log("scale multi: " + scaleMultiplier);
    // console.log("Screen Width:     " + xScreen);
    // console.log("Image X Position: " + xDiv);
    // console.log('');
    // console.log("Screen Height:    " + yScreen);
    // console.log("Image Y Position: " + yDiv);

    // USE HIGHER QUALITY IMAGE FOR ZOOM
    this.src = this.src.replace(thumbnailQuality, zoomQuality);

    if (shadowBox) {
        shadowBox.style.background = 'rgba(0, 0, 0, 0.604)';
    }
    currentlyZoomedImage = this;
}


export function unzoomImage() {
    if (currentlyZoomedImage) {
        if (shadowBox) {
            shadowBox.style.background = 'rgba(0, 0, 0, 0.0)';
        }
        currentlyZoomedImage.style.transform = null;
        currentlyZoomedImage.src = currentlyZoomedImage.src.replace(zoomQuality, thumbnailQuality);
        let timeDelayedReference = currentlyZoomedImage;
        setTimeout(() => timeDelayedReference.style.zIndex = null, 250);
        currentlyZoomedImage = null;
    }
}