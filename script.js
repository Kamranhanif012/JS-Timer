const startbtn = document.querySelectorAll('.start-btn')
const pausebtn = document.getElementById('reset-btn')
const resetbtn = document.getElementById('pause-btn')
const addMinutes = document.querySelectorAll('.add-mins')
const indisplay= document.getElementById("input")
const mainMenu= document.querySelector('.main-menu-btn')
const timerMenu= document.querySelector('.timer-menu-btn')
const stopMenu= document.querySelector('.stop-menu-btn')
const timerContainer= document.querySelector('.timer-container')
let initialTime= 0
let remainingTime= 0
let isRunning= false
let countdownInterval= null
let inputval;
let invalue


// Event listeners for start button and its functionality

let minutes
startbtn.forEach(function (btn) {
    btn.addEventListener('click', () => {
        if (isRunning) return;
        if(stopMenu.style.display==='block'){
            mainMenu.style.display='none'
            stopMenu.style.display='none'
            timerMenu.style.display='block'
            

        }
             invalue= parseInt(indisplay.textContent)
             minutes= invalue
            if (!remainingTime && minutes > 0) {
            mainMenu.style.display='none'
            stopMenu.style.display='none'
            timerMenu.style.display='block'
            initialTime = minutes * 60; 
            remainingTime = initialTime;
            formate(remainingTime);
            showOnDisplay();
            
        }
            countDown();
    });
});





// To convert seconds into minutes and seconds

function formate(seconds){
    let minutes = (seconds / 60) | 0;
    let second = seconds % 60;
    let minstr = minutes < 10 ? "0" + minutes : "" + minutes;
    let secstr = second < 10 ? "0" + second : "" + second;
   inputval = `${minstr}:${secstr}`;
}

// to show the formatted time on display

function showOnDisplay(){
    indisplay.textContent= inputval
}



// To start the countdown timer

function countDown(){
    if(isRunning  || remainingTime<=0) return;

     isRunning= true;

     countdownInterval=  setInterval(()=>{
       
     if(remainingTime>0){
        remainingTime--
        formate(remainingTime)
        showOnDisplay()
    }
    else {
      clearInterval(countdownInterval);
      isRunning = false;
      alert("Time's up!");
    }
} , 1000)   
}



// Event listeners for adding minutes and its functionality

addMinutes.forEach(function (btn) {
    btn.addEventListener('click', addmin)
})

function addmin(event){
    let getmin = parseInt(event.target.innerHTML); // convert to number
    if (!isNaN(getmin)) {
        minutes = getmin;
        console.log("Minutes set to:", minutes);
        formate(minutes*60)
        showOnDisplay()
       
    } else {
        console.log("Invalid minute value:", event.target.innerHTML);
    }
}

// Event listeners for reset and pause buttons and their functionality

resetbtn.addEventListener('click', () => {
    indisplay.textContent = "00:00";
    initialTime = 0;
    remainingTime = 0;
    isRunning = false;
    clearInterval(countdownInterval);
    mainMenu.style.display='block'
    stopMenu.style.display='none'
    timerMenu.style.display='none'

})

pausebtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(countdownInterval);
        isRunning = false;
        mainMenu.style.display='none'
        stopMenu.style.display='block'
        timerMenu.style.display='none'
    }
})
    