const album = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prev_btn = document.getElementById('prev'),
    next_btn = document.getElementById('next'),
    play_btn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'tuki.flac',
        displayName: 'bansanka',
        cover: 'tukicover.png',
        artist: 'tuki.',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    play_btn.style.background = "url(pause.png)center no-repeat";
    play_btn.style.backgroundSize = "50%";
    play_btn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    play_btn.style.background = "url(play.png)center no-repeat";
    play_btn.style.backgroundSize = "50%";
    play_btn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    album.src = song.cover;
    background.src = song.cover;
    
    music.addEventListener('loadedmetadata', () => {
        updateDuration();
    });
    durationEl.textContent = '0:00';
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `\${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDuration() {
    if (!isNaN(music.duration)) {
        durationEl.textContent = formatTime(music.duration);
    } else {
        durationEl.textContent = '0:00'; // Or some other default
    }
}

play_btn.addEventListener('click', togglePlay);
prev_btn.addEventListener('click', () => changeMusic(-1));
next_btn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
