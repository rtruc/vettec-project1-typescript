let currentlyZoomedImage;
const thumbnailQuality = "_small";
const zoomQuality = "_large";
let shadowBox;
let gallerySections = [];


const sectionHeaders = [
    {
        title: 'Early Life', mapAltText: 'Map of Erie, PA', mapUrl: `https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {
        title: 'Training', mapAltText: 'Map of Erie, PA', mapUrl: `https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {
        title: 'USS Bataan', mapAltText: 'Map of Erie, PA', mapUrl: `https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {
        title: 'Japan', mapAltText: 'Map of Erie, PA', mapUrl: `https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {
        title: 'College Years', mapAltText: 'Map of Erie, PA', mapUrl: `https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {
        title: 'California', mapAltText: 'Map of Erie, PA', mapUrl: `https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
    {
        title: 'Family Life', mapAltText: 'Map of Erie, PA', mapUrl: `https://maps.googleapis.com/maps/api/staticmap?   center=Erie+PA
    &zoom=6
    &scale=2
    &size=900x300
    &maptype=street
    &key=AIzaSyDFY_jfeAFfIZ1oqs7Eo8_3OGww91eD7-4
    &format=png&visual_refresh=true
    &markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7CErie+PA`},
];

function buildPhotoGallery(listOfSections, listViewFlag) {
    let promises = []
    listOfSections.forEach(section => {
        promises.push(fetchSectionContentListAndBuildGallerySection(section, listViewFlag));
    })

    Promise.all(promises)
        .then(() => assembleSectionsInOrder())
        .then(() => enableClickToZoomOnImages())
        .catch(section => console.log(section + ' failed'));
}


function assembleSectionsInOrder() {
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

function fetchSectionContentListAndBuildGallerySection(section, listViewFlag) {
    let path = `./img/photos/${section.name}/`;
    let fileName = `${section.name}.csv`;

    return (fetch(path + fileName)
        .then(response => response.text())
        .then(responseText => parseCSVPhotoData(responseText))
        .then(photoParameters => generatePhotoSection(photoParameters, path, section.number, section.name, listViewFlag))
        .then(photoSection => gallerySections.push(photoSection))
        .catch(reason => console.log("Oops!" + reason)))
}

function parseCSVPhotoData(csv) {
    let photos = [];
    splitsStrings = csv.split(/\r?\n/);

    for (let entry of splitsStrings) {

        if (entry[0] && entry[0] != '#') {
            splits = entry.split(',');

            let photo = {};

            photo.fileName = splits[0].trim();
            photo.altText = splits[1].trim();
            photo.titleText = splits[2].trim();

            photos.push(photo);
        }
    }

    return photos;
}

// ATTACH ASSEMBLED SECTION TO MAIN GALLERY
function appendPhotoSectionToGallery(photoSection) {
    let galleryDiv = document.getElementById('gallery');
    galleryDiv.appendChild(photoSection);
}


function generatePhotoSection(photos, folder, sectionNumber, sectionName, listViewFlag) {
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

    // IF LIST VIEW FLAG PASSED, ONLY ONE PHOTO PER LINE
    if (listViewFlag) {
        rowMax = rowMin = rowCurrent = 1;
    }

    for (let i = 0; i < photos.length; i++) {
        rowPhotos.push(photos[i]);
        rowCount++;
        if (rowCount == rowCurrent) {
            let photoRowDiv = generatePhotoRow(rowPhotos, folder, listViewFlag);
            columnDiv.appendChild(photoRowDiv);

            rowPhotos = [];
            rowCurrent = rowCurrent == rowMax ? rowMin : rowMax;

            // IF THERE ARE ONLY 4 PHOTOS LEFT, BUT NEXT ROW IS SET FOR ONLY 3
            // THEN CHANGE IT TO 4
            if (rowCurrent == 3 && (photos.length - 1) - i == 4) {
                rowCurrent = 4;
            } else if ((photos.length - 1) - i == 5) {
                rowCurrent = 3;
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

    // rowDiv.innerHTML += `<h1 class="gallery-header">${sectionHeaders[sectionNumber].title}</h1>
    //                      <img class="map-header-img" src="${sectionHeaders[sectionNumber].mapUrl}" alt="${sectionHeaders[sectionNumber].mapAltText}">`;
    rowDiv.innerHTML += `<h1 class="gallery-header">${sectionHeaders[sectionNumber].title}</h1>`;
    console.log(rowDiv);
    return rowDiv;
}

function generatePhotoRow(photos, filePath, listViewFlag) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("flex-row-gallery");


    for (let photo of photos) {
        let imageTag;


        //KNOWN GOOD PATH BEFORE ADDING TEXT BOXES
        // IF ONLY 1-2 IMAGES LEFT, ASSIGN SPECIAL CLASS SO NOT OVERSIZED
        // if (photos.length == 1 || photos.length == 2) {
        //     imageTag = `<img class="gallery-img-${photos.length}" `;
        // } else {
        //     imageTag = `<img class="gallery-img" `;
        // }
        // imageTag += `src="${filePath}${thumbnailQuality}/${photo.fileName}" 
        //                      alt="${photo.altText}" 
        //                      title="${photo.titleText}"/>`;


        // EXPERIMENTAL TEXTBOX CODE PATH
        imageTag = `<div class="gallery-img-wrapper">`;
        // IF ONLY 1-2 IMAGES LEFT, ASSIGN SPECIAL CLASS SO NOT OVERSIZED
        if (photos.length == 1 || photos.length == 2) {
            imageTag += `<img class="gallery-img-${photos.length}" `;
        } else {
            imageTag += `<img class="gallery-img" `;
        }
        imageTag += `src="${filePath}${thumbnailQuality}/${photo.fileName}" 
                             alt="${photo.altText}" 
                             title="${photo.titleText}"/>
                            <p class="gallery-img-text">${photo.titleText}</p>
                        </div>`;


        // EXPERIMENTAL TEXTBOX CODE PATH
        // imageTag = `<div class="gallery-img-wrapper">`;
        // // IF ONLY 1-2 IMAGES LEFT, ASSIGN SPECIAL CLASS SO NOT OVERSIZED
        // if (photos.length == 1 || photos.length == 2) {
        //     imageTag += `<img class="gallery-img-${photos.length}" `;
        // } else {
        //     imageTag += `<img class="gallery-img" `;
        // }
        // imageTag += `src="${filePath}${thumbnailQuality}/${photo.fileName}" 
        //                      alt="${photo.altText}" 
        //                      title="${photo.titleText}"/>
        //                     <p class="gallery-img-text">${photo.titleText}</p>
        //                 </div>`;

        rowDiv.innerHTML += imageTag;

        if (listViewFlag) {
            let labelDiv = document.createElement('h4');
            labelDiv.innerText = photos[0].fileName;
            rowDiv.appendChild(labelDiv);
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
    this.style.zIndex = '10';
    let parent = this.parentElement;

    console.log("this", this);
    console.log("parent", parent);

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
    let galleryImg = document.getElementsByClassName("gallery-img");
    let galleryImg1 = document.getElementsByClassName("gallery-img-1");
    let galleryImg2 = document.getElementsByClassName("gallery-img-2");
    
    let allGalleryImages = [].concat(Array.from(galleryImg))
                             .concat(Array.from(galleryImg1))
                             .concat(Array.from(galleryImg2));

    for(let img of allGalleryImages) {
        img.addEventListener('click', zoomImage);
    }

    let gallery = document.getElementById('gallery');
    gallery.addEventListener('click', whitespaceClicked);


}


window.addEventListener('load', () => {

    if (document.getElementById('title').textContent == "My Journey") {
        const sectionsIDs = [
            { number: '0', name: 'early_life' },
            { number: '1', name: 'training' },
            { number: '2', name: 'bataan' },
            { number: '3', name: 'japan' },
            { number: '4', name: 'college_years' },
            { number: '5', name: 'california' },
            { number: '6', name: 'family' }
        ];

        shadowBox = document.getElementById('shadow-box');

        // buildPhotoGallery(sectionsIDs);
        buildPhotoGallery([sectionsIDs[0]], false);
        // buildPhotoGallery([sectionsIDs[2]], true);


    }
})