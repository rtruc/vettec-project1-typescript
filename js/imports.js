let scripts = [
    "./js/sub/navbar.js",
    "./js/sub/footer.js",
    "./js/sub/gallery.js",
    "./js/sub/script.js"
];

function loadScripts(scriptSrc) {
    return new Promise(function (resolve, reject) {
        let scriptDiv = document.createElement('script');
        scriptDiv.src = scriptSrc;
        scriptDiv.async = false;
        scriptDiv.onload = () => resolve(scriptSrc);
        scriptDiv.onerror = () => reject(scriptSrc);

        document.head.appendChild(scriptDiv);
        // console.log(document.head);
        // console.log(document.body);

    });
}

let promises = [];
scripts.forEach(function (script) {
    promises.push(loadScripts(script));
});

// console.log(promises);

Promise.all(promises)
    .then(() => console.log('All Scripts Loaded'))
    .catch((script) => console.log(script + ' failed'))



