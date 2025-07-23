//completed features:
//- fixed resume/pause functionality
//- implemented reset button logic
//- prevents starting timer unless both inputs are filled
//- regex validation to block letters, special characters, and negative numbers
//- inputs reset when switching between study/break modes
//- buttons disabled while timer is active

//upcoming (v2 goals):
//- play sound + show alert when timer ends (different for study vs break)
//- add lightsaber-style countdown animation
//- light side/dark side modes

//references to html 
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton"); 
const resetButton = document.querySelector("#resetButton"); 
const studyMin = document.querySelector("#studyInput");
const breakMin = document.querySelector("#breakInput");

//my var
let studyMode=true;
let breakMode=false;
let isRunning=false;
let isPaused=false;
let timeLeft;
let timerInterval;

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

//need to write logic that the start timer won't work unless both boxes are filled
//should do so in the start func since that is what will happen?

function startTimer(){
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  // /../ is wrapper, ^ is start of string, + means one or more and $ means end of string
  if (isRunning) return;
  //removed the isRunning=true line since it didn't make sense to put it before the input checks
  if(studyMode){
    if(studyMin.value.trim()=="" || breakMin.value.trim()==""){
      alert(".𖥔 ݁ ˖ ᯓ★ Please enter both study and break minutes! :) .𖥔 ݁ ˖ ᯓ★");
  } 
    else if(!regex.test(studyMin.value) || !regex.test(breakMin.value)){
      //regex check
      alert("⭒₊ ⊹🌕₊ ⊹⭒ Please only enter numbers - no letters or characters! :) ⭒₊ ⊹🌕₊ ⊹⭒");
    }

  else{
    isRunning=true;
    timeLeft = (studyMin.value*60);
    timerInterval = setInterval(countdownLogic, 1000);
    studyMin.disabled = true;
    breakMin.disabled = true;
  }
}

  else if(breakMode){
    isRunning=true;
    timeLeft = (breakMin.value*60);
    timerInterval = setInterval(countdownLogic, 1000);
  }
}

function pauseTimer(){
  if(!isPaused){
    isPaused=true;
    pauseButton.innerText = "Resume"; 
    clearInterval(timerInterval);
  }
  else{
    timerInterval = setInterval(countdownLogic, 1000); //countdown logic is called
    //the val of timeleft stored just continues as follows
    isPaused = false;
    pauseButton.innerText = "Pause";
  }
  //we can use inner text since we are not changing any properties of the html
  //we would use inner html if we wanna change the way 'resume' looks 
}

function resetTimer(){
  //clears times
  //brings intial state of box (placeholder visible)
  if(!(studyMin.value.trim()=="") ||!(breakMin.value.trim()=="")){
    isRunning=false;
    clearInterval(timerInterval);
    studyMin.value="";
    breakMin.value="";
    studyMin.disabled = false;
    breakMin.disabled = false;

  }
}

function countdownLogic(){
  let min = Math.floor(timeLeft/60);
  let sec = Math.floor(timeLeft%60);

  if (sec<10){
    sec = "0"+sec;
  }

  if(studyMode){
    studyMin.value = `${min}:${sec}`;
  }

  else if(breakMode){
    breakMin.value = `${min}:${sec}`;
  }

  timeLeft--;
  

  if(timeLeft<0){
    clearInterval(timerInterval);
    isRunning=false;
    studyMin.disabled = false;
    breakMin.disabled = false;

  } 

  if(studyMode){
    if(timeLeft<0){
      alert("💫 Well done, young Padawan. Study mission complete - press Start to begin your break.");
      breakMode=true;
      studyMode=false;
      studyMin.value = "";
      return; //exits the function
      //without this 'return' time left isn't reset and it would automatically go to the second if statment 
      //since both statements are true
    }
  }
  if(breakMode){
    if(timeLeft<0){
      alert("✨ Break complete. Time to focus again, young Padawan. Press Start to resume your training - May the Force be with you.");
      studyMode=true;
      breakMode=false;
      breakMin.value = "";
      return; //exits the function
    }
  } 
}