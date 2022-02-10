let header = document.getElementById('header');
let smoothLinks = header.querySelectorAll('a[href^="#"]');
let goTopBtn = document.getElementById('goTopBtn');

for (let link of smoothLinks) {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        let id = link.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
        });
    });
}

function scrollTrack () {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) goTopBtn.classList.add('goTopBtn-show');
    if (scrolled < coords) goTopBtn.classList.remove('goTopBtn-show');
}

function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -60);
      setTimeout(backToTop, 0);
    }
  }

window.addEventListener('scroll', scrollTrack);
goTopBtn.addEventListener('click', backToTop);