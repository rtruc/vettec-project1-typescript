// All images should be sized appropriately and have alternative text displayed should the image fail to render
let images;
let currentlyZoomedImage;
const thumbnailQuality = "_thumbnail";
const zoomQuality = "_medium";

function buildPhotoGallery() {
    const sections = [
                    'early_life',
                    'training',
                    'bataan',
                    'japan',
                    'college_years',
                    'california',
                    'family'
    ];
    
    
    
    let promises = []
    sections.forEach(section => {
        let filePath = [`./img/photos/${section}/`, `${section}.csv`]
        promises.push(fetchCSVFileAndBuildGallerySection(...filePath));
    })

    Promise.all(promises)
        .then(result => console.log(result)) //'Galleries loaded'
        .catch(section => console.log(section + ' failed'));

    // for(let section of sections) {
    //     let filePath = [`./img/photos/${section}/`, `${section}.csv`]
    //     fetchCSVFileAndBuildGallerySection(...filePath);
    // }
}

function fetchCSVFileAndBuildGallerySection(filePath, fileName) {
    fetch(filePath + fileName)
        .then(response => response.text())
        .then(responseText => parseCSVPhotoData(responseText))
        .then(photoStrings => generatePhotoColumn(photoStrings, filePath))
        .then(photoSection => appendPhotoSectionToGallery(photoSection))
        // .then(enableClickToZoomOnImages())
        .catch(reason => console.log("Oops!" + reason));
}

function parseCSVPhotoData(csv){
    let photos = [];
    splitsStrings = csv.split(/\r?\n/);

    for(let entry of splitsStrings) {
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

function generatePhotoColumn(photos, folder) {
    let columnDiv = document.createElement('div');
    columnDiv.classList.add('flex-column');

    // console.log(photos);

    let rowMax = 3;
    let rowCount = 0;
    let rowPhotos = [];

    for(let i = 0; i < photos.length; i++) {
        rowPhotos.push(photos[i]);
        rowCount++;
        if(rowCount >= rowMax) {
            let photoRowDiv = generatePhotoRow(rowPhotos, folder);
            columnDiv.appendChild(photoRowDiv);

            rowPhotos = [];
            rowMax = rowMax == 3 ? 2 : 3;
            rowCount = 0;
        }
    }

    if (rowPhotos.length > 0) {
        let photoRowDiv = generatePhotoRow(rowPhotos, folder);
        columnDiv.appendChild(photoRowDiv);
    }

    // console.log(columnDiv);
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




function zoomImage() {
    // If image that was clicked on is already zoomed, unzoom and return   
    if (currentlyZoomedImage == this) {
        this.style.transform = null;
        setTimeout(() => this.style.zIndex = null, 50);
        this.src = this.src.replace(zoomQuality, thumbnailQuality);
        // this.style.zIndex = null;
        currentlyZoomedImage = null;
        return;
    }

    // If a different image is zoomed, unzoom that image and then zoom
    // the image that was clicked on
    if (currentlyZoomedImage) {
        // setTimeout(() => currentlyZoomedImage.style.zIndex = null, 50);
        currentlyZoomedImage.style.transform = null;
        currentlyZoomedImage.style.zIndex = null;
        currentlyZoomedImage.src = currentlyZoomedImage.src.replace(zoomQuality, thumbnailQuality);


    }

    let xScreen = window.innerWidth;
    let yScreen = window.innerHeight;

    // console.log("x: "+ xScreen + " y: " + yScreen);
    // console.log(this.getBoundingClientRect());

    let boundingRect = this.getBoundingClientRect();
    let xDiv = boundingRect.x;
    let yDiv = boundingRect.y;
    let heightDiv = boundingRect.height;
    let widthDiv = boundingRect.width;

    let yTranslate = yScreen / 2 - yDiv - heightDiv / 2;
    let xTranslate = xScreen / 2 - xDiv - widthDiv / 2;

    let overscan = 100;
    let heightMultiplier = (yScreen - overscan )/ heightDiv;
    let widthMultiplier = (xScreen - overscan ) / widthDiv;
    let scaleMultiplier = heightMultiplier < widthMultiplier ? heightMultiplier : widthMultiplier;
    
    // console.log("scale multi: " + scaleMultiplier);
    // console.log("Screen Width:     " + xScreen);
    // console.log("Image X Position: " + xDiv);
    // console.log('');
    // console.log("Screen Height:    " + yScreen);
    // console.log("Image Y Position: " + yDiv);
    
    this.style.transform = `translate(${xTranslate}px,${yTranslate}px) scale(${scaleMultiplier}) `;

    // let newSrc = "";
    // newSrc.replace('_small', '_large');
    // console.log(this.src);
    // console.log(newSrc);
    
    this.src = this.src.replace(thumbnailQuality, zoomQuality);
    // let newSrc = this.src.replace('_small', '_large');
    // this.src = newSrc;

    this.style.zIndex = '5';

    currentlyZoomedImage = this;
}

function enableClickToZoomOnImages() {
    images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
        images[i] = images[i].addEventListener('click', zoomImage);
    }
}


window.addEventListener('load', () => {

    buildPhotoGallery();

    //FIXME: 
    setTimeout(() => enableClickToZoomOnImages(), 1000);
})