import { generateDropdownNavigationMenu, hideDropdownMenu, setupDropdownMenu } from "./gallery/dropdownMenu";
import { enableClickToZoomOnImages, thumbnailQuality, unzoomImage } from "./gallery/imageZoom";
import { parsePhotosJSON, parseSectionJSON } from "./gallery/jsonParsers";
import { Photo, Section } from "./gallery/model/model";

let gallerySections: HTMLDivElement[] = [];
const listViewFlag = false; 
const galleryRootDir = "./img/gallery/stock/";



window.addEventListener('load', () => {

    if (document.getElementById('gallery')) {        
        // shadowBox = document.getElementById('shadow-box');
        
        let galleryCSV = "gallery.csv";
        buildPhotoGallery(galleryCSV);

        // IDENTIFY AND TAG DROPDOWN NAVIGATION MENU
        setupDropdownMenu();

        // DISMISS MENU OR PHOTO IF SHOWING WHEN WHITESPACE IS CLICKED
        document.addEventListener('click', whitespaceClicked);        
    }
})


function whitespaceClicked() {
    hideDropdownMenu();
    unzoomImage();
}


export function buildPhotoGallery(galleryCSV: string) {
    
    fetch(galleryRootDir + "gallery.json")
        .then(response => response.json())
        .then(json => parseSectionJSON(json))
        .then(sectionData => buildPhotoGallerySections(sectionData))
        .catch(reason => console.log("JSON fetch failed: ", reason))
}


// ** BUILD AND ASSEMBLE SECTIONS
function buildPhotoGallerySections(sections: Section[]) {
    let promises: any = []

    sections.forEach(section => {
        promises.push(fetchSectionContentListAndBuildGallerySection(section));
    })

    Promise.all(promises)
        .then(() => assembleSectionsInOrder())
        .then(() => enableClickToZoomOnImages())
        .catch(section => console.log(section + ' failed'));

    generateDropdownNavigationMenu(sections);
}


function fetchSectionContentListAndBuildGallerySection(section: Section) {
    let path = `${galleryRootDir}${section.subdirectory}/`;
    let fileName = `${section.subdirectory}.json`;

    return (fetch(path + fileName)
        .then(response => response.json())
        .then(json => parsePhotosJSON(json))
        .then(photoParameters => generatePhotoSection(photoParameters, path, section))
        .then(photoSection => gallerySections.push(photoSection))
        .catch(reason => console.log("Oops!" + reason)))
}


function generatePhotoSection(photos: Photo[] | null, folder: string, section: Section) {
    // BUILD COLUMN DIV TO HOLD THIS SECTION
    let columnDiv = document.createElement('div');
    columnDiv.classList.add('flex-column-gallery');
    // columnDiv.id = `section${section.number}`;
    columnDiv.id = `${section.number}`;
    columnDiv.setAttribute('name', section.title);

    //GENERATE AND ATTACH HEADER HERE
    let sectionHeader = generateSectionHeader(section);
    columnDiv.appendChild(sectionHeader);
    let divider = document.createElement('hr');
    divider.classList.add('gallery-divider');
    columnDiv.appendChild(divider);


    // SPECIFIES NUMBER OF PHOTOS PER ROW, LOOPS OVER TO START WHEN END REACHED
    let layoutPattern;
    if (!listViewFlag) {
        layoutPattern = [3, 4, 3, 5];
    }
    else {
        // IF LIST VIEW FLAG PASSED, ONLY ONE PHOTO PER LINE
        layoutPattern = [1];
    }

    let rowCurrent = layoutPattern[0];
    let patternIndex = 0;
    let rowCount = 0;
    let rowPhotos = [];

    // PACKAGE PHOTOS INTO ARRAYS, PASS ARRAYS TO ROW GENERATION FUNCTION
    // APPEND RESULTS TO COLUMN, UPDATE ROW LAYOUT LOGIC FOR NEXT PASS
    if (photos)
        for (let i = 0; i < photos.length; i++) {
            rowPhotos.push(photos[i]);
            rowCount++;
            if (rowCount === rowCurrent) {
                let photoRowDiv = generatePhotoRow(rowPhotos, folder);
                columnDiv.appendChild(photoRowDiv);

                rowPhotos = [];

                rowCurrent = patternIndex < (layoutPattern.length - 1) ? layoutPattern[++patternIndex] :
                    layoutPattern[patternIndex = 0];
                rowCount = 0;

                // TODO: Possibly insert row shaping logic here
            }
        }

    // GENERATE LAST ROW FOR ANY LEFTOVER PHOTOS
    if (rowPhotos.length > 0) {
        let photoRowDiv = generatePhotoRow(rowPhotos, folder);
        columnDiv.appendChild(photoRowDiv);
    }

    return columnDiv;
}


function generateSectionHeader(section: Section) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("flex-row-gallery-header");

    rowDiv.innerHTML += `<h1 class="gallery-header">${section.title}</h1>`;
    rowDiv.innerHTML += `<p class="gallery-header-description">${section.description}</p>`;

    return rowDiv;
}


function generatePhotoRow(photos: Photo[], filePath: string) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("flex-row-gallery");

    for (let photo of photos) {
        let imageTag;

        if (photos.length === 1 || photos.length === 2) {
            imageTag = `<img class="gallery-img-${photos.length}" `;
        } else {
            imageTag = `<img class="gallery-img" `;
        }
        imageTag += `src="${filePath}${thumbnailQuality}/${photo.fileName}" 
                             alt="${photo.altText}" 
                             title="${photo.description}"/>`;


        // TODO: Attach invisible DIV here with photo caption to show when zoomed

        rowDiv.innerHTML += imageTag;

        if (listViewFlag) {
            let labelDiv = document.createElement('h4');
            labelDiv.innerText = photos[0].fileName;
            rowDiv.appendChild(labelDiv);
        }
    }
    return rowDiv;
}


function assembleSectionsInOrder() {
    gallerySections.sort((s1, s2) => parseInt(s1.id) - parseInt(s2.id))

    for (let section of gallerySections) {
        appendPhotoSectionToGallery(section);
    }
}


// ATTACH ASSEMBLED SECTION TO MAIN GALLERY
function appendPhotoSectionToGallery(photoSection: HTMLDivElement) {
    let galleryDiv = document.getElementById('gallery');
    if(galleryDiv) {
        galleryDiv.appendChild(photoSection);
    }
}









