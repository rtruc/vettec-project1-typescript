// All images should be sized appropriately and have alternative text displayed should the image fail to render

const CSVTest = ['jordan-aloft.jpeg,Alt Text, Title Text', 'jordan-aloft.jpeg,Alt Text, Title Text'];

function parseCSVPhotoData(csv){
    let photos = [];
    let photo = {};

    for(let entry of csv) {
        let txt = "";
        txt = csv;
        console.log(txt);
        
        let splits = [""];
        splits = txt.split(',');
        console.log(splits);
    
        photo.fileName = splits[0].trim();
        photo.altText = splits[1].trim();
        photo.titleText = splits[2].trim();
        
        console.log("FileName: " + photo.fileName);
        photos.push(phot0o);
    }


    return photos;
}

// console.log(CSVTest);
let parsedPhoto = parseCSVPhotoData(CSVTest)
let photo = parsedPhoto.pop();
console.log(photo);

function generatePhotoRowAlt(photos, folder) {
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

function generatePhotoRow(photos, folder) {
    let rowDiv = document.createElement('div');
    // console.log(rowDiv);
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




// window.addEventListener('load', () => {
//     const folder = './img/photos/';
//     const photos = [
//         'jordan-aloft.jpeg',
//         'jordan-aloft-2.jpeg',
//         'jordan-aloft-3.jpeg',
//     ]



//     let galleryDiv = document.getElementById('gallery');
//     console.log(galleryDiv);
//     // generatePhotoRow(photos, folder);
//     let photoRowDiv = generatePhotoColumn(photos, folder);
//     // console.log("photo row div:" + photoRowDiv);
//     galleryDiv.appendChild(photoRowDiv)
//     // galleryDiv.innerHTML = photoRowDiv;
//     console.log(galleryDiv);
//     // galleryDiv.innerHTML = generatePhotoRow(photos, folder);
//     // console.log(galleryDiv);
//     // console.log(galleryDiv);
//     // console.log("Fudge");

//     // images = document.getElementsByClassName("gallery-img");
//     // for (let i = 0; i < images.length; i++) {
//     //     images[i] = images[i].addEventListener('click', zoomImage);
//     // }
//     // topButton = document.getElementById('active');
//     // console.log(topButton);
//     // topButton.addEventListener('click', scrollToTop);
// })