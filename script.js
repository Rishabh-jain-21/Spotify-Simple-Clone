console.log("spotify app");

// intializing variables
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProgressBar');
let musicGif = document.getElementById('song-playing-gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let MasterSongName = document.getElementById('MasterSongName');
var songNumber = 1;
let songs = [
    { songName: "Let me Love You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "tumse mil na ", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Khulke jeene ka", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "kanha soja jara", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "khuda ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "masoomiyat", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "auzaar", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Let me Love You", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Let me Love You", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Let me Love You", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" }

];

songItems.forEach((elm, i) => {
    // console.log(elm, i);
    elm.getElementsByTagName("img")[0].src = songs[i].coverPath;
    elm.getElementsByClassName("songNames")[0].innerText = songs[i].songName;
});

let audioElement = new Audio('songs/1.mp3');


masterPlay.addEventListener('click', function () {
    //if audio element is paused or not started
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();

        // lets change the play button to pause button
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        musicGif.style.opacity = 1;
    }
    // else the audio is running 
    else {
        audioElement.pause();

        // lets change the pause button to play button
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        musicGif.style.opacity = 0;

    }
});


// syncing progressbar with music duration
audioElement.addEventListener('timeupdate', function () {
    // calculating the percentage of music that run
    var progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

// changing music with progressBar Change
progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});
// changing music with progressBar Change
progressBar.addEventListener('click', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

// ----------------------------------------------
// list elements js here

//making all the remaining icons int the list as play again
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songsIcon')).forEach((elm) => {
        elm.classList.remove('fa-pause-circle');
        elm.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songsIcon')).forEach((elm) => {
    elm.addEventListener('click', (e) => {
        makeAllPlays();
        songNumber = e.target.id;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        playSong();
    });
})

// handling next play button ✅✅
document.getElementById('previous').addEventListener('click', function () {
    if (songNumber == 1) {
        songNumber = 10;
    }
    else {
        --songNumber;
    }
    playSong();
});
document.getElementById('next').addEventListener('click', function () {
    if (songNumber == 10) {
        songNumber = 1;
    }
    else {
        ++songNumber;
    }
    playSong();
});

const playSong = () => {
    audioElement.src = `songs/${songNumber}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    musicGif.style.opacity = 1;
    MasterSongName.innerText = songs[songNumber - 1].songName;

}