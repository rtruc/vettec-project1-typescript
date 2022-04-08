let topButton;


function scrollToTop() {
    console.log('Hey!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// window.addEventListener('DOMContentLoaded', () => {
// })

window.addEventListener('load', () => {
    topButton = document.getElementById('active');
    topButton.addEventListener('click', scrollToTop);
})