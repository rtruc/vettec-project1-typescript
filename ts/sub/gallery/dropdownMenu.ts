import { Section } from "./model/model.js";


let dropdownMenu: HTMLElement | null;
let isShowingMenu = false;

export function generateDropdownNavigationMenu(sections: Section[]) {
    dropdownMenu = document.getElementById('dropdown-menu');

    for (let section of sections) {
        let menuItem = document.createElement('a');
        menuItem.classList.add('menu-button');
        // menuItem.href = `#section${section.number}`;
        menuItem.href = `#${section.number}`;
        menuItem.innerText = section.title;

        dropdownMenu?.appendChild(menuItem);
    }
}


function showDropdownMenu() {
    dropdownMenu?.classList.add("show-menu")
    isShowingMenu = true;
}


export function hideDropdownMenu() {
    if (isShowingMenu) {
        dropdownMenu?.classList.remove("show-menu")
        isShowingMenu = false;
    }
}


export function setupDropdownMenu() {
    let dropdownButton = document.getElementById('dropdown');
    if (dropdownButton) {
        dropdownButton.addEventListener('mouseover', showDropdownMenu);
        dropdownButton.addEventListener('mouseout', hideDropdownMenu);
    }

    dropdownMenu = document.getElementById("dropdown-menu");
}
