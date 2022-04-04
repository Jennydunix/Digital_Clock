// save a reference to our clock display (the div with the clock id) into a display variable
const display = document.getElementById('clock');

// setting up the audio for the alarm using a free alarm sound form Mixkit
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');

// create a new Audio object and save it to the audio variable. We'll also set the loop property of the audio object to true, as we want to play the sound, till the alarm is turned off manually.
audio.loop = true;

// alarmTime and alarmTimeout variables, that we initialise with null. We will use these variables to implement the alarm functionality.
let alarmTime = null;
let alarmTimeout = null;

// implementing the clock functionality

// To have a nice digital display, we'll create a function which format's the time
// values. It places a leading zero if the number is only one digit, otherwise it
// uses the number. So for example if the time value provided is 9, it returns 09.

function formatTime(time) {
    if ( time < 10 ) {
        return '0' + time;
    }
    return time;
}

// To override the display DOM node's innerText to represent the current time.
// Using string template literals here,so anything between ${} will be replaced
// with the value of that variable.

function updateTime() {
    const date = new Date();

    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());



    display.innerText=`${hour} : ${minutes} : ${seconds}`
}

// Now we just have to call this function every second to update the displayed time.
// We can do that by using the setInterval API, pass the updateTime function to it 
// and pass 1000 (it is in ms) as it's second parameter.

setInterval(updateTime, 1000);

// Implementing the alarm feature

// The first thing is that we have to collect and save the date and time selected by the
// user. We already attached an onchange event listener in the HTMl, now we just have to 
// implement that in javascript. We will simply get the value from the event handler and 
// save it to the alarmTime variable.

function setAlarmTime(value) {
    alarmTime = value;
}

// Implementing the set alarm function

function setAlarm() {
    if(alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);

        if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        }
    }
}

// Implementing Clear Functionality of the alarm

// We will stop the alarm sound if it already playing, and we will cancel the set alarm 
// if it is in the future. So in our clearAlarm function we will call the pause method 
// of our audio object. Then if we have a scheduled alarm (so the alarmTimeout has a 
// value), we will use the built in clearTimeout function to cancel that future function 
// call.

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}