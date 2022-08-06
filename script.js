const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const progressConatiner = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEl = document.getElementById('duration');
const currentEl = document.getElementById('current-time');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// songs
const songs = [
    {
        name: 'babel',
        displayName: 'Babel',
        artist: 'Gustavo Santaolalla'
    },
    {
        name: 'sigma',
        displayName: 'Sigma Rule',
        artist: 'Gary Barlow'
    },
    {
        name: 'spectre',
        displayName: 'Spectre',
        artist: 'Alan Walker'
    },
    {
        name: 'faded',
        displayName: 'Faded',
        artist: 'Alan Walker'
    }
]
// Check if playing
let isPlaying = false;

// Play
function playSong () {
    isPlaying = true;
    playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong () {
    isPlaying = false;
    playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


// Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong (song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `cover/${song.name}.jpg`;
}


// Current song
let songIndex = 0;

// Previous song
function prevSong () {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong () {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Onload Play First song
loadSong(songs[songIndex]);

// Update Progress & Time
function updateProgressBar (e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        // Update Progress bar width
        progress.style.width = `${progressPercent}%`;

        // Calculate display duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay Switching duration element to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}


// Set Progress bar onclick
function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    playSong();
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressConatiner.addEventListener('click', setProgressBar);
