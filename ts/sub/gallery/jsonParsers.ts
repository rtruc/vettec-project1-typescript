import { Photo, Section } from "./model/model.js";


export function parseSectionJSON(json: string): Section[] {
    let sections: Section[] = [];
    let sectionNumber = 0;

    for(const entry of json) {
        let section: Section = JSON.parse(JSON.stringify(entry));
        section.number = sectionNumber;
        sectionNumber++;

        sections.push(section);
    }
    return sections;
}


export function parsePhotosJSON(json: string): Photo[] {
    let photos: Photo[] = [];

    for(const entry of json) {
        const photo: Photo = JSON.parse(JSON.stringify(entry));
        if(!photo.fileName.includes('#')) {
            photos.push(photo);
        }
    }
    return photos;
}