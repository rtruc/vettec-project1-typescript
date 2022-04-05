// scrollButton = document.getElementById("active");

function scrollToTop() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


window.addEventListener('DOMContentLoaded', () => {
    let topButton = document.getElementById('active');
    topButton.addEventListener('click', scrollToTop);
})