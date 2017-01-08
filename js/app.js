'use strict';
const instructions = document.getElementById("userInstruction"); //talking to the user
const userInteraction = document.getElementById("userInteraction"); //action taken by the user
const toduTurds = document.getElementById("turd_todos"); //output of the user
const touchyFealyTurds = document.getElementById("turd_feelings"); //output of the user
const unclassifiedTurds = document.getElementById("turd_unclassified"); //output of the user

//Action -> Need to replace this with Mongo
const userInfo = {
    name : "good looking!",
}

/**
 * Logic having to do with user input
 */
const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "toilet");

userInteraction.appendChild(userInput);

const currentDate = new Date();
const currentHourOfDate = currentDate.getHours();

/****
 * 4am - 6am    4,5,6
 * 7am - 11am   7,8,9,10,11
 * 12pm - 4pm   12, 13, 14, 15, 16
 * 5pm - 12pm   17, 16, 17, 17, 19, 21, 22, 23, 0
 * 1am - 3am    1,2,3
 ***/
let welcomeMessage = ""



switch(currentHourOfDate){
    case 4:
    case 5:
    case 6:
        welcomeMessage = "Wow, you're up early ";
        break;
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
        welcomeMessage = "Good morning ";
        break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
        welcomeMessage = "Good afternoon ";
        break;    
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 0:
        welcomeMessage = "Good evening ";
        break; 
    case 1:
    case 2:
    case 3:
        welcomeMessage = "Why are you awake ?"
        break;
}


/******
 * Logic having to do with user greetings and instructions
 * 
 */
const greeting = document.createElement("h1");
    greeting.innerHTML = welcomeMessage + userInfo.name;

const userAction = document.createElement("h2");
    userAction.innerHTML="Whats on your mind?"

instructions.appendChild(greeting);
instructions.appendChild(userAction);


let classifyTurd = function(turd){
   /******
    * This function figures out what kind of turd this is. Current possible turds are :
    *       Todo
    *       Feeling
    *       Unclassified 
    *   Input : A single turd
    *   Outputs: either a todo, feeling, unclassified
    *****/
    let todoPattern = new RegExp('to do|need to|todo|go to|pick up');
    let feelingPattern = new RegExp('feel|tired|lonely|frustrated|angry|hate|upset|happy|grateful|sad|like');

    let isItATodo = todoPattern.test(turd);
    let isItAFeeling = feelingPattern.test(turd);

    if (isItATodo){
        return 'todo';
    }else if (isItAFeeling){
        return 'feeling'
    } else{
        return 'unclassified';
    }

}

let makeTurdo = function(individualTurd){
    /**
     * Takes in an intdividual turd and turns it into a todo item
     *  -Add a check boxes
     *  -adds behavior that allows user to complete the item
     *  
     * INPUT : turd
     * OUTPUT: complete div
     */
    let turdContainer = document.createElement('div')
    let checkBox = document.createElement('input')
        checkBox.setAttribute("type", "checkBox")
    let turdoText = document.createElement("span")
        turdoText.innerHTML = individualTurd;
 
    turdContainer.appendChild(checkBox);
    turdContainer.appendChild(turdoText);

    return turdContainer
}

let storeDumps =function (){
    localStorage.setItem("todoTurds", toduTurds.innerHTML)
    localStorage.setItem("touchyFealyTurds", touchyFealyTurds.innerHTML)
    localStorage.setItem("unclassifiedTurds", unclassifiedTurds.innerHTML)

}

let getPastDumps =function getPastDumps(){
    console.log(localStorage.getItem("todoTurds"));

}

let handleDumps = function(e){
     if (e.keyCode === 13) { //did they press enter?
   
        let individualTurd = userInput.value;
        let turdClassification = classifyTurd(individualTurd);
        let turdDiv = document.createElement("div") 

        switch (turdClassification){
            case 'todo':
                let newDiv = makeTurdo(individualTurd);
                toduTurds.appendChild(newDiv);
                break;
            case 'feeling':
                turdDiv.innerHTML = individualTurd;            
                touchyFealyTurds.appendChild(turdDiv);
                break;
            case 'unclassified':
                turdDiv.innerHTML = individualTurd;
                unclassifiedTurds.appendChild(turdDiv);
                break;
        }
        userInput.value = "" //Clears input field
     }         
}

/*************
 * Event Handlers
 **************/
window.onload = userInput.focus(); //This is to remove friction. so the user can start typing
window.onload = getPastDumps;
window.onbeforeunload = storeDumps;
userInput.addEventListener("keypress", handleDumps);


/*****
 * backlog
 *  turn tudo's into check boxes
 *  background pictures depending on the time of day
 *  ask questions re: why you feel tht way?
 *  create a gratitude bucket
 *  instructions should change as user is typing
 *  save to user information to local storage 
 *  add a mantra section....
 *  done for the day
 *  are you still feeling this? 
 *   todo to do a 5 wyys?
 ****/

/**
 * refactor
 *  create clean items to refactor
 */