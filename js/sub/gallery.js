// All images should be sized appropriately and have alternative text displayed should the image fail to render





function generatePhotoRow(photos, folder) {
    let rowDiv = document.createElement('div');
    // console.log(rowDiv);
    rowDiv.classList.add("flex-row");
    
    for (let photo of photos) {
        rowDiv.innerHTML += `<img class="gallery-img" src="${folder}${photo}" />`;
    }
    
    // let rowDiv;
    // console.log("RowDiv: " + rowDiv.innerHTML);
    
    
    // // console.log("RowDiv: " + rowDiv);
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


window.addEventListener('load', () => {
    const folder = './img/photos/';
    const photos = [
        'jordan-aloft.jpeg',
        'jordan-aloft-2.jpeg',
        'jordan-aloft-3.jpeg',
    ]

    let galleryDiv = document.getElementById('gallery');
    console.log(galleryDiv);
    // generatePhotoRow(photos, folder);
    let photoRowDiv = generatePhotoColumn(photos, folder);
    // console.log("photo row div:" + photoRowDiv);
    galleryDiv.appendChild(photoRowDiv)
    // galleryDiv.innerHTML = photoRowDiv;
    console.log(galleryDiv);
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