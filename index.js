let song = document.getElementsByClassName("song");
let playBtn = document.getElementsByClassName("play-btn");
var limit = 12;
let currentMusic = null; // Variable to store the currently playing song
let tempMusic = null;

// Function to stop the currently playing song
let stopMusic = (ele) => {
    if (ele) {
        ele.pause();
        ele.currentTime = 0;
        // Change the play button icon to "play" when the song stops
        let opt = ele.src.split("/").pop().split(".")[0];
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-pause");
        document.querySelector(`.i${opt}`).classList.add("fa-circle-play");
    }
};

let playMusic = (musicUrl) => {
    if ((currentMusic !== null) && (currentMusic.src.slice(22, ) === musicUrl)){
        // console.log(currentMusic)
        console.log(currentMusic + " This is currentMusic Val in first if");
        currentMusic.pause();
        console.log("paused");
        tempMusic = currentMusic;
        let opt = currentMusic.src.split("/").pop().split(".")[0];
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-pause");
        document.querySelector(`.i${opt}`).classList.add("fa-circle-play");
        currentMusic = null;
        return;
    }
    if (currentMusic) {
        console.log(currentMusic + " This is currentMusic Val in second if");

        stopMusic(currentMusic);
    }
    else if ((tempMusic  !==  null) && tempMusic.src.slice(22, ) === musicUrl){
        tempMusic.play();
        // console.log("tempMusic");
        console.log(tempMusic + " This is tempMusic Val");

        let opt = tempMusic.src.split("/").pop().split(".")[0];
        document.querySelector(`.i${opt}`).classList.add("fa-circle-pause");
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-play");
        currentMusic = tempMusic;
        tempMusic = null;
        return;
    }
        currentMusic = new Audio(musicUrl);
        currentMusic.play();
        console.log(currentMusic + " This is currentMusic Val");
        // Change the play button icon to "pause" when the song starts playing
        let opt = musicUrl.split("/").pop().split(".")[0];
        console.log(opt);
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-play");
        document.querySelector(`.i${opt}`).classList.add("fa-circle-pause");
        console.log(currentMusic);

        setTimeout(function(){
            stopMusic(currentMusic);
        },180000);
    }

// Loop through each song and add event listeners
for (let i = 0; i < limit; i++) {
    let option = song[i].classList[1].split("s")[1];
    // console.log(option);
    let musicUrl = `assets/Musics/${option}.mp3`;

    // Use a closure to capture the current value of "musicUrl"
    (function (url) {
        song[i].addEventListener("click", () => {
            playMusic(url);
        });
    })(musicUrl);

    song[i].addEventListener("mouseover", () => {
        playBtn[i].style.display = "block";
    });

    song[i].addEventListener("mouseout", () => {
        playBtn[i].style.display = "none";
    });
}