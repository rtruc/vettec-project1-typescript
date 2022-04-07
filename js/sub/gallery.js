// All images should be sized appropriately and have alternative text displayed should the image fail to render

const CSVTest = ['jordan-aloft.jpeg,Alt Text, Title Text', 'jordan-aloft-2.jpeg,Alt Text2, Title Text2'];

function parseCSVPhotoData(csv){
    let photos = [];
    splitsStrings = csv.split(/\r?\n/);
    // splitsStrings = String(csv);

    for(let entry of splitsStrings) {
        splits = entry.split(',');
        console.log(splits);
        
        let photo = {};
        photo.fileName = splits[0].trim();
        photo.altText = splits[1].trim();
        photo.titleText = splits[2].trim();
        
        console.log("FileName: " + photo.fileName);
        photos.push(photo);
    }

    return photos;
}

function readFile() {

    fetch('./img/staging/Training/Training.csv')
        .then(response => response.text())
        .then(responseText => parseCSVPhotoData(responseText))
        // .then(parsedStrings => console.log(parsedStrings))
        .then(photoStrings => generatePhotoColumn(photoStrings, "./img/staging/Training/"))
        .then(photoSection => appendPhotoSectionToGallery(photoSection))
        .then(enableClickToZoomOnImages())
        .catch(console.log("Oh shit!"));
}

// let parsedPhoto = parseCSVPhotoData(CSVTest)
// let photo = parsedPhoto.pop();
// console.log(photo);

function appendPhotoSectionToGallery(photoSection) {
    let galleryDiv = document.getElementById('gallery');
    // console.log(photoRowDiv);
    galleryDiv.appendChild(photoSection);
}

function generatePhotoRow(photos, folder) {
    let rowDiv = document.createElement('div');
    // console.log(rowDiv);
    rowDiv.classList.add("flex-row");
    
    for (let photo of photos) {
        rowDiv.innerHTML += `<img class="gallery-img" src="${folder}${photo.fileName}" alt="${photo.altText}" title="${photo.titleText}"/>`;
        // <img class="gallery-img"
        //  src="http://www.ubno.com/VETTEC/Projects/picture-page/nikko-2.jpeg"
        //  alt="forest shrine in Nikko"
        //  title="A deliberately overexposed shot of a shrine in Nikko, Japan.">
    }

    console.log(rowDiv);
    return rowDiv;
}

function generatePhotoRowAlt(photos, folder) {
    let rowDiv = document.createElement('div');
    // console.log(folder+photos[0].fileName);
    rowDiv.classList.add("flex-row");
    
    for (let photo of photos) {
        rowDiv.innerHTML += `<img class="gallery-img" src="${folder}${photo}" />`;
        // <img class="gallery-img"
        //  src="http://www.ubno.com/VETTEC/Projects/picture-page/nikko-2.jpeg"
        //  alt="forest shrine in Nikko"
        //  title="A deliberately overexposed shot of a shrine in Nikko, Japan.">
    }

    console.log(rowDiv);
    return rowDiv;
}

function generatePhotoColumn(photos, folder) {
    let columnDiv = document.createElement('div');
    columnDiv.classList.add('flex-column');

    let photoRowDiv = generatePhotoRow(photos, folder);
    columnDiv.appendChild(photoRowDiv);

    return columnDiv;
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

function enableClickToZoomOnImages() {
    images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
        images[i] = images[i].addEventListener('click', zoomImage);
    }
}


window.addEventListener('DOMContentLoaded', () => {

})

window.addEventListener('load', () => {
    // const folder = './img/photos/';
    // const photos = [
    //     'jordan-aloft.jpeg',
    //     'jordan-aloft-2.jpeg',
    //     'jordan-aloft-3.jpeg',
    // ]

    readFile();

    // let fetchData = await readFile();
    // console.log(fetchData);

    // let galleryDiv = document.getElementById('gallery');
    // let photoRowDiv = readFile();
    // console.log(photoRowDiv);
    // galleryDiv.appendChild(photoRowDiv);


    // console.log(galleryDiv);
    // // generatePhotoRow(photos, folder);
    // let photoRowDiv = generatePhotoColumn(photos, folder);
    // // console.log("photo row div:" + photoRowDiv);
    // // galleryDiv.innerHTML = photoRowDiv;
    // console.log(galleryDiv);
    // galleryDiv.innerHTML = generatePhotoRow(photos, folder);
    // console.log(galleryDiv);
    // console.log(galleryDiv);
    // console.log("Fudge");

    // images = document.getElementsByClassName("gallery-img");
    // for (let i = 0; i < images.length; i++) {
    //     images[i] = images[i].addEventListener('click', zoomImage);
    // }
    // topButton = document.getElementById('active');
    // console.log(topButton);
    // topButton.addEventListener('click', scrollToTop);
})