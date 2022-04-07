let topButton;


function scrollToTop() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    console.log('Hey!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// window.addEventListener('DOMContentLoaded', () => {
    
// })

window.addEventListener('load', () => {
    topButton = document.getElementById('active');
    topButton.addEventListener('click', scrollToTop);
})