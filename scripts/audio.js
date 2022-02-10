let audioIconPlay = `<svg width="22" height="25" viewBox="0 0 22 25" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.5L8.14564e-07 25L1.90735e-06 -9.6165e-07L22 12.5Z" /></svg>`
let audioIconPause= `<svg width="25" height="22" viewBox="0 0 25 22" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="22" /><rect x="16" width="9" height="22" /></svg>`

/**
 * Функция принимает блок из HTML документа 
 * с разметкой для аудиоплеера через идентификатор.
 * Приводит в действие кнопки, панель, длительность аудиоплеера.
 * 
 * @param {*} id - идентификатор html элемента
 */
function playAudio ( id ) {
    let parentId = document.getElementById(id);
    let root = document.documentElement;
    let audioPlayer = parentId.querySelector('.audio__player');
    let audioBtn = parentId.querySelector('.audio__btn');
    let audioProgressBox = parentId.querySelector('.audio__progress__box');
    let audioProgressBar = parentId.querySelector('.audio__progress__bar');
    let audioToddler = parentId.querySelector('.audio__toddler');
    let audioToddlerControl = parentId.querySelector('.audio__toddler__control');
    let audioToddlerCurrTime = parentId.querySelector('.audio__toddler__currTime');
    let audioCurrTime = parentId.querySelector('.audio__currTime');
    let audioDurTime = parentId.querySelector('.audio__durTime');

    /**
     * audioAct определяет соответствующую 
     * иконку для кнопки плеера
     * 
     */
    function audioAct () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            audioBtn.innerHTML = audioIconPause;
        } else {
            audioPlayer.pause();
            audioBtn.innerHTML = audioIconPlay;
        }
    }

    /**
     * 
     * @param {*} time - функция принимает колличество секунд 
     * @returns - возвращает время в формате ММ : СС
     */
    function audioTime(time) { 
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minutesVal = minutes;
        let secondsVal = seconds;
    
        if ( minutes < 10 ) {
            minutesVal = '0' + minutes;
        }
    
        if(seconds < 10) {
            secondsVal = '0' + seconds;
        }
    
        return minutesVal + ':' + secondsVal;
    }

    /**
     *  audioProgress считает общее и прошедшее время аудио.
     *  Показывает прогресс на панели плеера.
     */
    function audioProgress() { 
        let progress = (Math.floor(audioPlayer.currentTime) / (Math.floor(audioPlayer.duration) / 100));
        audioProgressBar.value = progress;
        audioToddler.style.left = progress + '%';
        audioCurrTime.innerHTML = audioTime(audioPlayer.currentTime);
        audioDurTime.innerHTML = audioTime(audioPlayer.duration);
    }
    
    /**
     * audioMouseDown - срабатывает при нажатии кнопкой мыши на панель плеера.
     * Добавляет событие, позволяющее перетаскивать ползунок, используя всю видимую область.
     * Активирует демонстрационный ползунок.
     * 
     */
    function audioMouseDown () {
        root.addEventListener('mousemove', audioMouseMove);
        audioToddlerControl.classList.add('audio__toddler__control--opacity');
    }
    
    /**
     * audioMouseMove - обеспечивает предварительный показ положения ползунка
     * и времени на которое будет перемотано аудио.
     * Добавляет событие на отпускание кнопки мыши, в котором сработает функция 
     * audioChangeTime
     * 
     * @param {*} e - высчитывает положение курсора
     */
    function audioMouseMove (e) {
        root.addEventListener('mouseup', audioChangeTime);
    
        let mouseX = Math.floor(e.pageX - audioProgressBox.offsetLeft);
        let progress = mouseX / (audioProgressBox.offsetWidth / 100);
        let currTime = null;
    
        if (progress < 0) progress = 0;
        if (progress > 100) progress = 100;
    
        currTime = progress / 100 * (Math.floor(audioPlayer.duration));
        audioToddlerControl.style.left = progress + '%';
        audioToddlerCurrTime.innerHTML = audioTime(currTime);
    }
    
    /**
     * audioChangeTime - Удаляет добавленные ранее события mousemove
     * и mouseup. Перематывает аудио в выбранное пользователем положение.
     * 
     * @param {*} e - высчитывает положение курсора
     */
    function audioChangeTime(e) { 
        root.removeEventListener('mousemove', audioMouseMove);
        root.removeEventListener('mouseup', audioChangeTime);
        audioToddlerControl.classList.remove('audio__toddler__control--opacity');
    
        let mouseX = Math.floor(e.pageX - audioProgressBox.offsetLeft);
        let progress = mouseX / (audioProgressBox.offsetWidth / 100);
        audioPlayer.currentTime = audioPlayer.duration * (progress / 100);
    }

    audioBtn.addEventListener('click', audioAct);
    audioPlayer.addEventListener('timeupdate',audioProgress);
    audioProgressBar.addEventListener('click',audioChangeTime);
    audioProgressBar.addEventListener('mousedown',audioMouseDown);
}

/**
 * Плейлист, который находит свою аудио панель при помощи 
 * заранее добавленного тега типа - data. 
 * Осуществляет переключение музыки.
 * Наберусь побольше знаний и обязательно вернусь к этому проекту :D.
 * 
 * @param {*} id - принимает идентификатор элемента HTML
 */
function playAudioList (id) {
    let playListId = document.getElementById(id);
    let audioPlayerId = document.getElementById(playListId.dataset.for);
    let audioBtn = audioPlayerId.querySelector('.audio__btn');
    let audioPlayer = audioPlayerId.querySelector('.audio__player');
    let playListItems = document.getElementsByClassName('audio__playList__item');
    let audioNames = playListId.getElementsByClassName('audio__name');
    let playListItemsArr = [];
    let audioNamesArr = [];

    /**
     * removeActive - Удаляет у элементов с классом "audio__name" 
     * класс "audio--active". Срабатывает при нажатии на аудио в плейлисте
     */
    function removeActive () {
        audioNamesArr.map( (item) => item.classList.remove('audio--active') );
    }

    for (let playListItem of playListItems) {
        playListItemsArr.push(playListItem);
    }

    for (let audioName of audioNames) {
        audioNamesArr.push(audioName);
    }

    playListItemsArr.map( function ( item, index ) {
        item.addEventListener('click', function () {
            removeActive();

            audioNamesArr[index].classList.add('audio--active');
            audioPlayer.src = item.dataset.src;
            audioPlayer.play();
            audioBtn.innerHTML = audioIconPause;
        })
    });
}

playAudio ('audioHiro');
playAudio ('audioLastTracks');
playAudioList ('audioPlayList');