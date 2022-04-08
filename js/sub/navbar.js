class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        let pageTitle = document.getElementById('title').textContent;

        let entries = [["nav-item", "./index.html", "Home"],
            ["nav-item", "./about-me.html", "About Me"],
            ["nav-item", "./journey.html", "My Journey"]];

        // PAGE LINKS
        for (let entry of entries) {

            let link;

            // IF ENTRY FOR CURRENT PAGE, DON'T ASSIGN LINK
            // ASSIGN TAG FOR JAVASCRIPT
            if(entry[2] != pageTitle) {
                link = `href="${entry[1]}"`;
            } else {
                link = `id="active"`;
            }   

            // IF GALLERY PAGE, GENERATE GALLERY LINKS
            if (pageTitle == entry[2] && entry[2] == "My Journey") {
                this.innerHTML += `<div id="dropdown" class="${entry[0]}"><a ${link}>${entry[2]}</a>
                <div id="dropdown-menu" class="dropdown-menu">
                <a class="menu-button" href="#section0">Early Life</a>
                <a class="menu-button" href="#section1">Training</a>
                <a class="menu-button" href="#section2">USS Bataan</a>
                <a class="menu-button" href="#section3">Japan</a>
                <a class="menu-button" href="#section4">College Years</a>
                <a class="menu-button" href="#section5">California</a>
                <a class="menu-button" href="#section6">Family</a>
                </div>`;
            } else {
                this.innerHTML += `<div class="${entry[0]}"><a ${link}>${entry[2]}</a></div>`;
            }

        

        }


        // SEARCH BAR
        this.innerHTML +=
        `<form class="search-form" action="https://google.com/search" method="get">
            <input type="hidden" name="sitesearch" value="https://github.com/rtruc/vettec-project1" />
            <input class="search-field" type="text"id="search" name="q" autocomplete="off" placeholder="search" />
        </form>`;

    }
}
customElements.define('nav-bar', NavBar);