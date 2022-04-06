class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        let pageTitle = document.getElementById('title').textContent;

        let entries = [["http://www.linkedin.com", "LinkedIn Icon", "./img/icons/linkedin.png"],
                       ["http://www.github.com", "Github Icon", "./img/icons/github.png"]];

        for(let entry of entries) {
            this.innerHTML += `
            <div class="footer-item">
                <a href="${entry[0]}">
                    <img class="icon" alt="${entry[1]}" src="${entry[2]}">
                </a>
            </div>`
        }

        // this.innerHTML += `<div class="footer-item">
        // <a href="https://www.linkedin.com">
        //     <img class="icon" alt="Linked In Logo" src="./img/icons/linkedin.png">
        //     </a>
        //     </div>`

        // this.innerHTML += `<a href="https://www.linkedin.com">
        //     <img class="icon" alt="Linked In Logo" src="./img/icons/linkedin.png">
        //     </a>`
        // this.innerHTML += `<a href="https://www.github.com">
        //     <img class="icon" alt="Github Logo" src="./img/icons/github.png">
        //     </a>`

        // for (let entry of entries) {
            // if (entry[2] != pageTitle) {
                // this.innerHTML += `<div class="${entry[0]}"><a href="${entry[1]}">${entry[2]}</a></div>`;
            // } else {
            //     this.innerHTML += `<div class="${entry[0]}"><a id="active">${entry[2]}</a></div>`;
            // }
        // }

        // this.innerHTML +=
        // `<form class="search-form" action="https://google.com/search" method="get">
        //     <input type="hidden" name="sitesearch" value="https://github.com/rtruc/vettec-project1" />
        //     <input class="search-field" type="text"id="search" name="q" autocomplete="off" placeholder="search" />
        // </form>`;

    }
}
customElements.define('foot-er', Footer);