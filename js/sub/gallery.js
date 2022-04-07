// All images should be sized appropriately and have alternative text displayed should the image fail to render

function buildPhotoGallery() {
    
    filePaths = [
        ['./img/staging/Training/', 'Training.csv'],
        ['./img/staging/Training/', 'Training.csv']
    ]

    for(let filePath of filePaths) {
        fetchCSVFileAndBuildGallerySection(...filePath);
    }
}

function fetchCSVFileAndBuildGallerySection(filePath, fileName) {
    fetch(filePath + fileName)
        .then(response => response.text())
        .then(responseText => parseCSVPhotoData(responseText))
        // .then(parsedStrings => console.log(parsedStrings))
        .then(photoStrings => generatePhotoColumn(photoStrings, filePath))
        .then(photoSection => appendPhotoSectionToGallery(photoSection))
        // .then(enableClickToZoomOnImages())
        .catch(reason => console.log("Oh shit!" + reason));
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

    console.log(photos);

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

    console.log(columnDiv);
    return columnDiv;
}


function generatePhotoRow(photos, filePath) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("flex-row");
    
    for (let photo of photos) {
        rowDiv.innerHTML += `<img class="gallery-img" 
                                  src="${filePath}${photo.fileName}" 
                                  alt="${photo.altText}" 
                                  title="${photo.titleText}"/>`;
    }

    return rowDiv;
}





function zoomImage() {
    // If image that was clicked on is already zoomed, unzoom and return
    console.log("OUCH!");
   
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

function enableClickToZoomOnImages() {
    images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
        images[i] = images[i].addEventListener('click', zoomImage);
    }
}


window.addEventListener('load', () => {

    buildPhotoGallery();
})