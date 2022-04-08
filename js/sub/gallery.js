// All images should be sized appropriately and have alternative text displayed should the image fail to render
// let images;
let currentlyZoomedImage;
const thumbnailQuality = "_small";
const zoomQuality = "_large";
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

const sectionHeaders = [
    {title: 'Early Life', mapAltText:'Map of Erie, PA', mapUrl:`https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {title: 'Training', mapAltText:'Map of Erie, PA', mapUrl:`https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {title: 'USS Bataan', mapAltText:'Map of Erie, PA', mapUrl:`https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {title: 'Yokosuka, Japan', mapAltText:'Map of Erie, PA', mapUrl:`https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {title: 'College Years', mapAltText:'Map of Erie, PA', mapUrl:`https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {title: 'California', mapAltText:'Map of Erie, PA', mapUrl:`https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {title: 'Family Life', mapAltText:'Map of Erie, PA', mapUrl:`https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
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

function buildTestGallerySection(testSection, orderView) {
    let promises = []
    testSection.forEach(section => {
        promises.push(fetchCSVFileAndBuildGallerySection(section));
    })

    if(orderView) {
        
    }
    Promise.all(promises)
        .then(() => assembleSectionsInOrder())
        .then(() => enableClickToZoomOnImages())
        .catch(section => console.log(section + ' failed'));
}

function assembleSectionsInOrder() {
    // console.log(gallerySections);

    // SORT SECTIONS
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
        .then(photoStrings => generatePhotoSection(photoStrings, filePath, section.number, section.name))
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

// ATTACH ASSEMBLED SECTION TO MAIN GALLERY
function appendPhotoSectionToGallery(photoSection) {
    let galleryDiv = document.getElementById('gallery');
    galleryDiv.appendChild(photoSection);
}


function generatePhotoSection(photos, folder, sectionNumber, sectionName) {
    // BUILD COLUMN DIV TO HOLD THIS SECTION
    let columnDiv = document.createElement('div');
    columnDiv.classList.add('flex-column-gallery');
    columnDiv.id = `section${sectionNumber}`;
    columnDiv.setAttribute('name', sectionName);

    //GENERATE AND ATTACH HEADER HERE
    let sectionHeader = generateSectionHeader(sectionNumber, sectionName);
    columnDiv.appendChild(sectionHeader);
    let divider = document.createElement('hr');
    divider.classList.add('gallery-divider');
    columnDiv.appendChild(divider);
    // columnDiv.appendChild(document.createElement('hr').classList.add('gallery-divider'));

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
            
            // console.log("row max: " + rowMax);
            // console.log("row count: " + rowCount);

            rowPhotos = [];
            rowCurrent = rowCurrent == rowMax ? rowMin : rowMax;

            // IF THERE ARE ONLY 4 PHOTOS LEFT, BUT NEXT ROW IS SET FOR ONLY 3
            // THEN CHANGE IT TO 4
            if(rowCurrent == 3 && photos.length - 1 - i == 4){
                rowCurrent = 4;
            }
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

function generateSectionHeader(sectionNumber, sectionName) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("flex-row-gallery-header");

    // rowDiv.innerHTML += `<div class="flex-row-gallery-header" id="${sectionNumber}" name="${sectionName}">
    //                         <div class="flex-column-gallery-header">
    //                             <h1 class="gallery-header">${sectionHeaders[sectionNumber].title}</h1>
    //                             <img class="map-header" src="${sectionHeaders[sectionNumber].mapUrl}" alt="${sectionHeaders[sectionNumber].mapAltText}">
    //                         </div>
    //                     </div>`
    // rowDiv.innerHTML += `<div class="flex-column-gallery-header">
    //                             <h1 class="gallery-header">${sectionHeaders[sectionNumber].title}</h1>
    //                             <img class="map-header" src="${sectionHeaders[sectionNumber].mapUrl}" alt="${sectionHeaders[sectionNumber].mapAltText}">
    //                         </div>`;
    rowDiv.innerHTML += `<h1 class="gallery-header">${sectionHeaders[sectionNumber].title}</h1>
                         <img class="map-header-img" src="${sectionHeaders[sectionNumber].mapUrl}" alt="${sectionHeaders[sectionNumber].mapAltText}">`;
    console.log(rowDiv);
    return rowDiv;
}

function generatePhotoRow(photos, filePath) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("flex-row-gallery");

    // IF ONLY 1 IMAGE LEFT, ASSIGN IT SPECIAL CLASS SO IT ISN'T OVERSIZED BY ITSELF
    if(photos.length == 1) {
        rowDiv.innerHTML += `<img class="gallery-img-single" 
                                  src="${filePath}${thumbnailQuality}/${photos[0].fileName}" 
                                  alt="${photos[0].altText}" 
                                  title="${photos[0].titleText}"/>`;
    } else {
        for (let photo of photos) {
            rowDiv.innerHTML += `<img class="gallery-img" 
                                      src="${filePath}${thumbnailQuality}/${photo.fileName}" 
                                      alt="${photo.altText}" 
                                      title="${photo.titleText}"/>`;
        }
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

    if( document.getElementById('title').textContent == "My Journey") {
        shadowBox = document.getElementById('shadow-box');
        
        let testSection = null;
        // testSection = [sectionsIDs[0]];

        if (testSection) {
            buildTestGallerySection(testSection);
        } else {
            buildPhotoGallery();
        }

    }
})