let biogImg = document.getElementsByClassName('biogImg');
let biogImgArr = [];

for (let img of biogImg) {
    biogImgArr.push(img);
}

biogImgArr.map( function (img) {
    img.addEventListener('mouseover', function () {
        img.classList.add('img--opacity');

        for (let img of biogImgArr) {
            img.classList.remove('img--opacity');
        }

        img.classList.add('img--opacity');
    });
})