// All images should be sized appropriately and have alternative text displayed should the image fail to render
// let images;
let currentlyZoomedImage;
const thumbnailQuality = "_thumbnail";
const zoomQuality = "_medium";
let shadowBox;

let gallerySections = [];
const sectionsIDs = [
    { number: '0', name: 'early_life' },
    { number: '1', name: 'training' },
    { number: '2', name: 'bataan' },
    { number: '3', name: 'japan' },
    { number: '4', name: 'college_years' },
    { number: '5', name: 'california' },
    { number: '6', name: 'family' }
];

function buildPhotoGallery() {
    let promises = []
    sectionsIDs.forEach(section => {
        promises.push(fetchCSVFileAndBuildGallerySection(section));
    })

    Promise.all(promises)
        .then(() => assembleSectionsInOrder())
        .then(() => enableClickToZoomOnImages())
        .catch(section => console.log(section + ' failed'));
}

function assembleSectionsInOrder() {
    console.log(gallerySections);

    // Sort Sections
    gallerySections.sort((s1, s2) => {
        if (s1.id < s2.id) {
            return -1;
        }
        if (s1.id > s2.id) {
            return 1;
        }
        return 0;
    });

    for (let section of gallerySections) {
        appendPhotoSectionToGallery(section);
    }
}

function fetchCSVFileAndBuildGallerySection(section) {
    let filePath = `./img/photos/${section.name}/`;
    let fileName = `${section.name}.csv`;

    return (fetch(filePath + fileName)
        .then(response => response.text())
        .then(responseText => parseCSVPhotoData(responseText))
        .then(photoStrings => generatePhotoColumn(photoStrings, filePath, section.number))
        // .then(photoSection => appendPhotoSectionToGallery(photoSection))
        .then(photoSection => gallerySections.push(photoSection))
        // .then(result => console.log(builtGallerySections)) //'Galleries loaded'
        // .then(enableClickToZoomOnImages())
        .catch(reason => console.log("Oops!" + reason)))
}

function parseCSVPhotoData(csv) {
    let photos = [];
    splitsStrings = csv.split(/\r?\n/);

    for (let entry of splitsStrings) {
        splits = entry.split(',');

        let photo = {};
        photo.fileName = splits[0].trim();
        photo.altText = splits[1].trim();
        photo.titleText = splits[2].trim();

        photos.push(photo);
    }

    return photos;
}


function appendPhotoSectionToGallery(photoSection) {
    let galleryDiv = document.getElementById('gallery');
    galleryDiv.appendChild(photoSection);
}

function generatePhotoColumn(photos, folder, sectionNumber) {
    // BUILD COLUMN DIV TO HOLD THIS SECTION
    let columnDiv = document.createElement('div');
    columnDiv.classList.add('flex-column');
    columnDiv.id = `section${sectionNumber}`;

    let rowMax = 4;
    let rowMin = 3;
    let rowCurrent = rowMin;
    let rowCount = 0;
    let rowPhotos = [];

    for (let i = 0; i < photos.length; i++) {
        rowPhotos.push(photos[i]);
        rowCount++;
        if (rowCount == rowCurrent) {
            let photoRowDiv = generatePhotoRow(rowPhotos, folder);
            columnDiv.appendChild(photoRowDiv);
            
            console.log("row max: " + rowMax);
            console.log("row count: " + rowCount);

            rowPhotos = [];
            rowCurrent = rowCurrent == rowMax ? rowMin : rowMax;
            rowCount = 0;
        }
    }

    // Generate row for any remaining photos
    if (rowPhotos.length > 0) {
        let photoRowDiv = generatePhotoRow(rowPhotos, folder);
        columnDiv.appendChild(photoRowDiv);
    }

    return columnDiv;
}


function generatePhotoRow(photos, filePath) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("flex-row");

    for (let photo of photos) {
        rowDiv.innerHTML += `<img class="gallery-img" 
                                  src="${filePath}${thumbnailQuality}/${photo.fileName}" 
                                  alt="${photo.altText}" 
                                  title="${photo.titleText}"/>`;
    }

    return rowDiv;
}




function zoomImage(event) {

    // STOP CLICKS PROPAGATING TO WHITE SPACE AND CANCELING ZOOM
    event.stopPropagation();

    // IF CURRENTLY ZOOMED IMAGE WAS CLICKED, UNZOOM AND RETURN   
    if (currentlyZoomedImage == this) {
        shadowBox.style.background = 'rgba(0, 0, 0, 0.0)';

        this.style.transform = null;
        
        // DELAY RESTING Z AXIS SO ZOOMED IMAGE DOESN'T 'POP' UNDERNEATH OTHER IMAGES
        setTimeout(() => this.style.zIndex = null, 50);

        // RETURN TO THUMBNAIL QUALITY
        this.src = this.src.replace(zoomQuality, thumbnailQuality);
        currentlyZoomedImage = null;
        return;
    }

    // DIFFERENT IMAGE IS CURRENTLY ZOOMED, UNZOOM THAT IMAGE BEFORE PRECEDING
    if (currentlyZoomedImage) {
        currentlyZoomedImage.style.transform = null;
        currentlyZoomedImage.style.zIndex = null;
        currentlyZoomedImage.src = currentlyZoomedImage.src.replace(zoomQuality, thumbnailQuality);
    }

    // RAISE ZOOMED IMAGE ABOVE OTHER IMAGES
    this.style.zIndex = '5';

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

    let overscan = 100;
    let heightMultiplier = (screenY - overscan) / divHeight;
    let widthMultiplier = (screenX - overscan) / divWidth;
    let scaleMultiplier = heightMultiplier < widthMultiplier ? heightMultiplier : widthMultiplier;

    this.style.transform = `translate(${xTranslate}px,${yTranslate}px) scale(${scaleMultiplier}) `;
    
    // DEBUG INFO CENTERING
    // console.log("scale multi: " + scaleMultiplier);
    // console.log("Screen Width:     " + xScreen);
    // console.log("Image X Position: " + xDiv);
    // console.log('');
    // console.log("Screen Height:    " + yScreen);
    // console.log("Image Y Position: " + yDiv);

    // USE HIGHER QUALITY IMAGE FOR ZOOM
    this.src = this.src.replace(thumbnailQuality, zoomQuality);

    shadowBox.style.background = 'rgba(0, 0, 0, 0.604)';
    currentlyZoomedImage = this;
}

function whitespaceClicked() {
    console.log("clicked");
    if (currentlyZoomedImage) {
        // setTimeout(() => currentlyZoomedImage.style.zIndex = null, 50);
        shadowBox.style.background = 'rgba(0, 0, 0, 0.0)';
        currentlyZoomedImage.style.transform = null;
        currentlyZoomedImage.style.zIndex = null;
        currentlyZoomedImage.src = currentlyZoomedImage.src.replace(zoomQuality, thumbnailQuality);
        currentlyZoomedImage = null;
    }
}

function enableClickToZoomOnImages() {
    let images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', zoomImage);
    }

    let gallery = document.getElementById('gallery');
    gallery.addEventListener('click', whitespaceClicked);


}


window.addEventListener('load', () => {

    buildPhotoGallery();
    shadowBox = document.getElementById('shadow-box');

    //FIXME: 
    // setTimeout(() => enableClickToZoomOnImages(), 1000);
})