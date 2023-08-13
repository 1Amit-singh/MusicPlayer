let song = document.getElementsByClassName("song");
let playBtn = document.getElementsByClassName("play-btn");
var limit = 12;
let currentMusic = null; // Variable to store the currently playing song
let tempMusic = null;
let progressDiv = document.getElementById("progress-div");
let progress = document.getElementById("progress");
let rightPlayBtn = document.getElementById("right-play-btn");
let rightCover = document.getElementById("right-cover");
let menu = document.getElementById("menu");
let menuOptions = document.getElementById("menu-options");


menu.addEventListener("click", function(){
    if(menuOptions.style.opacity !== "1")
        menuOptions.style.opacity = "1";
    else{
        menuOptions.style.opacity = "0"
    }
});

// Function to stop the currently playing song
let stopMusic = (ele) => {
    if (ele) {
        ele.pause();
        ele.currentTime = 0;
        // Change the play button icon to "play" when the song stops
        let opt = ele.src.split("/").pop().split(".")[0];
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-pause");
        document.querySelector(`.i${opt}`).classList.add("fa-circle-play");
        rightPlayBtn.classList.add("fa-play");
        rightPlayBtn.classList.remove("fa-pause");
    }
};

let playMusic = (musicUrl) => {
    // console.log(musicUrl)
    if ((currentMusic !== null) && (currentMusic.src.split("/").pop()  === musicUrl.split("/").pop())){
        // console.log(currentMusic)
        // console.log(currentMusic + " This is currentMusic Val in first if");
        currentMusic.pause();
        // console.log("paused");
        tempMusic = currentMusic;
        let opt = currentMusic.src.split("/").pop().split(".")[0];
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-pause");
        document.querySelector(`.i${opt}`).classList.add("fa-circle-play");
        rightPlayBtn.classList.add("fa-play");
        rightPlayBtn.classList.remove("fa-pause");
        currentMusic = null;
        return;
    }
    if (currentMusic) {
        // console.log(currentMusic + " This is currentMusic Val in second if");

        stopMusic(currentMusic);
    }
    else if ((tempMusic  !==  null) && tempMusic.src.split("/").pop()  === musicUrl.split("/").pop()){
        tempMusic.play();
        // console.log("tempMusic");
        // console.log(tempMusic + " This is tempMusic Val");

        let opt = tempMusic.src.split("/").pop().split(".")[0];
        document.querySelector(`.i${opt}`).classList.add("fa-circle-pause");
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-play");
        rightPlayBtn.classList.remove("fa-play");
        rightPlayBtn.classList.add("fa-pause");
        currentMusic = tempMusic;
        tempMusic = null;
        return;
    }
        currentMusic = new Audio(musicUrl);
        currentMusic.play();
        // console.log(currentMusic + " This is currentMusic Val");
        // Change the play button icon to "pause" when the song starts playing
        let opt = musicUrl.split("/").pop().split(".")[0];
        document.querySelector(`.i${opt}`).classList.remove("fa-circle-play");
        document.querySelector(`.i${opt}`).classList.add("fa-circle-pause");
        rightPlayBtn.classList.remove("fa-play");
        rightPlayBtn.classList.add("fa-pause");
        changeCover(currentMusic);

        if (currentMusic) {


            progressDiv.onclick = function (e) {
            console.log((e.offsetX / progressDiv.offsetWidth) * currentMusic.duration);
            currentMusic.currentTime = (e.offsetX / progressDiv.offsetWidth) * currentMusic.duration;
            };

            currentMusic.ontimeupdate = function () {
            let percent = (currentMusic !== null) && ((100 * currentMusic.currentTime) / currentMusic.duration);
            progress.style.width = percent + "%";
            };
        }


        setTimeout(function(){
            stopMusic(currentMusic);
        },180000);
    }


    let changeCover = (currentMusic) => {
        if(currentMusic){
            let num = currentMusic.src.split("/").pop().split(".")[0];
            rightCover.src = `assets/Photos/${num}.png`; 
            // console.log(rightCover, num)
        }
    }

    rightPlayBtn.addEventListener("click", () => {
        if (currentMusic) {
            if (currentMusic.paused) {
                currentMusic.play();
            } 
            else {
                currentMusic.pause();
            }
        }
        else{
            currentMusic = new Audio("assets/Musics/1.mp3");
            console.log(currentMusic)
            currentMusic.play();
        }
        updatePlayPauseIcon();
    });
    
    // Function to update the play/pause icon based on audio playback state
    function updatePlayPauseIcon() {
        if (currentMusic) {
            if (currentMusic.paused) {
                rightPlayBtn.classList.remove("fa-pause");
                rightPlayBtn.classList.add("fa-play");
            } else {
                rightPlayBtn.classList.remove("fa-play");
                rightPlayBtn.classList.add("fa-pause");
            }
        }
    }   



// Loop through each song and add event listeners
for (let i = 0; i < limit; i++) {
    let option = song[i].classList[1].split("s")[1];
    // console.log(option);
    var musicUrl = `assets/Musics/${option}.mp3`;

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
