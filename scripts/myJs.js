let biogImg = document.getElementsByClassName('biogImg');
let biogImgArr = [];

let news = document.getElementById('news');
let newsItem = news.getElementsByClassName('news__item');
let newsImg = news.getElementsByClassName('news__img');
let newsItemArr = [];
let newsImgArr = [];

let burger = document.getElementById('burger');
let burgerMenu = document.querySelector('.header__nav');
let burgerMenuItems = burgerMenu.getElementsByTagName('li');

for (let img of biogImg) {
    biogImgArr.push(img);
}

for ( let item of newsItem ) {
    newsItemArr.push(item);
}

for ( let img of newsImg ) {
    newsImgArr.push(img);
}

biogImgArr.map( function (img) {
    img.addEventListener('mouseover', function () {
        img.classList.add('img--opacity');

        for (let img of biogImgArr) {
            img.classList.remove('img--opacity');
        }

        img.classList.add('img--opacity');
    });
});

newsItemArr.map( function (item, index) {
    item.addEventListener('mouseover', function () {
        newsImgArr.map( function ( img ) {
            img.classList.add('newsImg--opacity');
        });

        newsImgArr[index].classList.remove('newsImg--opacity');
    });
});

burger.addEventListener('click', function () {
    if (burgerMenu.classList.contains('header__nav--active')) {
        burgerMenu.classList.remove('header__nav--active');
        burger.classList.remove('btn-menu--active');
    } else {
        burgerMenu.classList.add('header__nav--active');
        burger.classList.add('btn-menu--active');
    }
});

for (let item of burgerMenuItems) {
    item.addEventListener('click', function() {
        burgerMenu.classList.remove('header__nav--active');
        burger.classList.remove('btn-menu--active');
    });
};