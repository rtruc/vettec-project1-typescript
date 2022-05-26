let topButton;


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// window.addEventListener('DOMContentLoaded', () => {
// })

window.addEventListener('load', () => {
    topButton = document.getElementById('active');
    topButton?.addEventListener('click', scrollToTop);
})