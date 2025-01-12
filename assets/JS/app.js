const video = document.getElementById('video');  
const playBtn = document.getElementById('play');  
const stopBtn = document.getElementById('stop');  
const progress = document.getElementById('progress');  
const currTime = document.getElementById('curr-time');  
const durTime = document.getElementById('dur-time');  
const volumeContainer = document.getElementById('volume-container');  
const volume = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');  
const expandPage = document.getElementById('expand-page');
const controls = document.getElementById('cplay');
const backwardBtn = document.getElementById('jump-backward');
const forwardBtn = document.getElementById('jump-forward');

// Set initial volume  

video.volume = volume.value;  
// Function to update volume icon  

function updateVolumeIcon() {  
    if (video.volume === 0) {  
        volumeIcon.innerHTML = `<i class="fas fa-volume-mute"></i>`;  
    } else if (video.volume > 0 && video.volume <= 0.5) {  
        volumeIcon.innerHTML = `<i class="fas fa-volume-down"></i>`;  
    } else {  
        volumeIcon.innerHTML = `<i class="fas fa-volume-up"></i>`;  
    }  
}  

volume.addEventListener('input', function() {  
    video.volume = volume.value;  
    updateVolumeIcon(); 
});  

volumeIcon.addEventListener('click', e => {  
    if (video.volume > 0) {  
// Mute the audio 

        video.volume = 0; 
        volume.value = 0; 
        volumeIcon.innerHTML = `<i class="fas fa-volume-off"></i>`;  
    } else {  
// Unmute the audio  

        video.volume = 1; 
        volume.value = 1; 
        volumeIcon.innerHTML = `<i class="fas fa-volume-up"></i>`;  
    }  
    updateVolumeIcon(); 
});  
// Reset Progressbar before load page
window.addEventListener('beforeunload', () => {  
    const resetProgress = () => {  
        progress.value = 0;  
        updateCurrentTimeDisplay();
    } 
    resetProgress();
});  

// Play/Pause video with click on page  

const toggleVideoStatus = () => {            
    if (video.paused) {
        video.play();  
    } else {  
        video.pause(); 
    }    
}  

video.addEventListener('click', toggleVideoStatus);  

// Change play Icon  
const changeIcon = () => {  
    if (video.paused) {  
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;  
    } else {  
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;  
    }  
}  

video.addEventListener('play', changeIcon);  
video.addEventListener('pause', changeIcon);  

// Stop video  
const stopVideo = () => {  
    video.currentTime = 0;  
    video.pause();
}  

playBtn.addEventListener('click', toggleVideoStatus);  
stopBtn.addEventListener('click', stopVideo);  

//backward & forwardBtn

backwardBtn.addEventListener('click', () => {  

    video.currentTime=Math.max(0,video.currentTime -5);
    const currentTime = video.currentTime;  
    const currentMinutes = Math.floor(currentTime / 60);  
    const currentSeconds = Math.floor(currentTime % 60);  
    currTime.innerText = `${currentMinutes}:${currentSeconds < 10 ? '00' : ''}${currentSeconds}`;
    video.play();  
});

forwardBtn.addEventListener('click', () => { 

    video.currentTime=Math.max(0,video.currentTime + 5);
    const currentTime = video.currentTime;  
    const currentMinutes = Math.floor(currentTime / 60);  
    const currentSeconds = Math.floor(currentTime % 60);  
    currTime.innerText = `${currentMinutes}:${currentSeconds < 10 ? '00' : ''}${currentSeconds}`; 
    video.play(); 
});

// Set progress  

const updateProgress = () => {  
    progress.value = (video.currentTime / video.duration) * 100;  
    updateCurrentTimeDisplay();
}  

// Update current time display  

const updateCurrentTimeDisplay = () => {  
    const currentTime = video.currentTime;  
    const duration = video.duration;  

    // Calculate minutes and seconds 

    const durationMinutes = Math.floor(duration / 60);  
    const durationSeconds = Math.floor(duration % 60);  
    const currentMinutes = Math.floor(currentTime / 60);  
    const currentSeconds = Math.floor(currentTime % 60);  

    // Display duration and current time with two digits for seconds 

    durTime.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;  
    currTime.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;  
}  

video.addEventListener('timeupdate', updateProgress);  

// Set progress with click

const setProgressWithClick = (event) => {  
    const totalWidth = progress.offsetWidth;  
    const clickX = event.offsetX;  
    const newTime = (clickX / totalWidth) * video.duration;  
    video.currentTime = newTime;  
    video.play();
}  

progress.addEventListener('click', setProgressWithClick);  

// Update duration  

video.addEventListener('loadedmetadata', () => {  
    const duration = video.duration;  
    durTime.innerText = `${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? '00' : ''}${Math.floor(duration % 60)}`;  
});  

// FullScreenVideo & Exit From it 

expandPage.addEventListener('click', () => {  
    if (video.requestFullscreen) {  
        video.requestFullscreen();  
    } else if (video.webkitRequestFullscreen) { 
        video.webkitRequestFullscreen();  
    } else if (video.msRequestFullscreen) { 
        video.msRequestFullscreen();  
    };  

    if (video.exitFullscreen) {  
        video.exitFullscreen();  
    } else if (video.webkitExitFullscreen) { 
        video.webkitExitFullscreen();  
    } else if (video.msExitFullscreen) { 
        video.msExitFullscreen();  
    }  
});
// Initial call to set the correct volume icon  

updateVolumeIcon();
