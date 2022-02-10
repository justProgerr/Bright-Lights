function slider (id) {
    let slrRoot = id ? document.getElementById(id) : document.getElementById('news');
    let slrItems = slrRoot.querySelectorAll('.news__item');
    let slrPrev = slrRoot.querySelector('.btn-left');
    let slrNext = slrRoot.querySelector('.btn-right');
    let slrItemsArr = [];
    let slrIndex = 0;
    let isMedia = window.matchMedia('(max-width: 950px)');
    let totalSlides = (isMedia.matches) ? 1 : 3;

    for ( let slrItem of slrItems ) slrItemsArr.push(slrItem);

    function wasChangeMedia (item) {
        if (item.matches) {
            totalSlides = 1;
            replaceItems();
        } else {
            totalSlides = 3;
            replaceItems();
        }
    };

    function replaceItems () {
        if ( slrIndex >= slrItemsArr.length ) slrIndex = 0;
        if ( slrIndex < 0 ) slrIndex = slrItemsArr.length - 1;

        let slrCount = slrIndex;

        slrItemsArr.map( (item) => item.style.display = 'none' );

        for ( let i = 0; i < totalSlides; i++ ) {
            if ( slrCount >= slrItemsArr.length ) slrCount = 0;
            if ( slrCount < 0 ) slrCount = slrItemsArr.length - 1;
            slrItemsArr[slrCount].style.order = i;
            slrItemsArr[slrCount].style.display = 'block';
            slrCount++;
        };
    };

    replaceItems();

    isMedia.addEventListener('change', wasChangeMedia);

    slrNext.addEventListener('click', function () {
        slrIndex++;
        replaceItems();
    });

    slrPrev.addEventListener('click', function () {
        slrIndex--;
        replaceItems();
    });
}

slider();
