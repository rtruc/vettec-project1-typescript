// import {NavBar} from "./navbar.js"
import "./sub/navbar.ts"
import "./sub/footer.ts"
import "./sub/script"
import "./sub/gallery"


// let scripts = [
//     "./js/sub/gallery.js",
//     "./js/sub/navbar.js",
//     "./js/sub/footer.js",
//     "./js/sub/script.js"
// ];

// function loadScripts(scriptSrc: string) {
//     return new Promise(function (resolve, reject) {
//         let scriptDiv = document.createElement('script');
//         scriptDiv.src = scriptSrc;
//         scriptDiv.async = false;
//         scriptDiv.onload = () => resolve(scriptSrc);
//         scriptDiv.onerror = () => reject(scriptSrc);

//         document.head.appendChild(scriptDiv);
//     });
// }

// let promises: any = [];
// scripts.forEach(script => promises.push(loadScripts(script)));

// Promise.all(promises)
//     .then(() => console.log('All Scripts Loaded'))
//     .catch((script) => console.log(script + ' failed'))
