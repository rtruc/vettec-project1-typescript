let scripts = [
    "./js/sub/script.js",
    "./js/sub/navbar.js",
    "./js/sub/footer.js"
            ];

function loadScripts(script) {
    let scriptDiv = document.createElement('script');
    scriptDiv.src = script;
    scriptDiv.async = false;

    // console.log(scriptDiv);

    document.head.appendChild(scriptDiv)
}

for(let script of scripts) {
    loadScripts(script);
    // console.log(script);
}

// class Scripts extends HTMLScriptElement {
//     constructor() {
//         super();
//     }

//     connectedCallback() {
//         this.innerHTML += `<script src="./js/script.js"></script>
//         <script src="./js/navbar.js"></script>
//         `;
//         console.log(this);
//     }
// }
// customElements.define('scripts-import', Scripts);

