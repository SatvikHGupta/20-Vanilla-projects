const songs = [
    { title: 'Song A', duration: 20 },
    { title: 'Song B', duration: 25 },
    { title: 'Song C', duration: 30 }
];

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const progress = document.getElementById('progress');

let currentSong = 0;
let isPlaying = false;
let progressInterval;
let progressWidth = 0;

function updateSongTitle() {
    songTitle.textContent = songs[currentSong].title;
    resetProgress();
}

function playSong() {
    isPlaying = true;
    playBtn.textContent = '⏸';
    startProgress();
}

function pauseSong() {
    isPlaying = false;
    playBtn.textContent = '▶';
    clearInterval(progressInterval);
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    updateSongTitle();
    if(isPlaying) startProgress();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    updateSongTitle();
    if(isPlaying) startProgress();
}

function resetProgress() {
    clearInterval(progressInterval);
    progressWidth = 0;
    progress.style.width = '0%';
}

function startProgress() {
    let duration = songs[currentSong].duration;
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        progressWidth += 100 / (duration);
        if(progressWidth >= 100) {
            progressWidth = 100;
            clearInterval(progressInterval);
            nextSong();
        }
        progress.style.width = progressWidth + '%';
    }, 1000);
}

playBtn.addEventListener('click', () => {
    if(isPlaying) pauseSong();
    else playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

updateSongTitle();
