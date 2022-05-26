export class NavBar extends HTMLElement {
    
    constructor() {
        super(); 
    }

    connectedCallback(){
        let pageTitle = document.getElementById('title')?.textContent;

        let entries = [["./index.html", "Home"],
            ["./about-me.html", "About Me"],
            ["./gallery.html", "Gallery"]];

        // PAGE LINKS
        for (let entry of entries) {

            let link;

            // IF ENTRY FOR CURRENT PAGE, DON'T ASSIGN LINK
            // ASSIGN TAG FOR JAVASCRIPT SCROLL
            link = entry[1] === pageTitle ? link = `id="active"` : 
                                            link = `href="${entry[0]}"`;

            // IF GALLERY PAGE, GENERATE ANCHOR FOR GALLERY LINKS
            if (pageTitle === entry[1] && entry[1] === "Gallery") {
                this.innerHTML +=   `<div id="dropdown" class="nav-item"><a ${link}>${entry[1]}</a>
                                        <div id="dropdown-menu" class="dropdown-menu">
                                        </div>
                                    </div>`;
                // this.innerHTML +=   `<div id="dropdown" class="nav-item"><a ${link}>${entry[1]}</a>
                //                         <div id="dropdown-menu" class="dropdown-menu">
                //                         </div>
                //                     </div>`;
            } else {
                this.innerHTML += `<div class="nav-item"><a ${link}>${entry[1]}</a></div>`;
            }

        

        }


        // SEARCH BAR
        // this.innerHTML +=
        // `<form class="search-form" action="https://google.com/search" method="get">
        //     <input type="hidden" name="sitesearch" value="https://rtruc.github.io/vettec-project1/" />
        //     <input class="search-field" type="text" id="search" name="q" autocomplete="off" placeholder="search" />
        // </form>`;

    }
}
customElements.define('nav-bar', NavBar);