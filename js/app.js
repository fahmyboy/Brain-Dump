'use strict';
const instructions = document.getElementById("userInstruction"); //talking to the user
const userInteraction = document.getElementById("userInteraction"); //action taken by the user
const toduTurds = document.getElementById("turd_todos"); //output of the user
const touchyFealyTurds = document.getElementById("turd_feelings"); //output of the user
const unclassifiedTurds = document.getElementById("turd_unclassified"); //output of the user
const footer = document.getElementById("footer"); //output of the user

const userInfo = {
    name : "good looking!",
}

/************
 * The functions
 ************/


let getTimeOfDaySpecificWelcomeMessage = function(){
    /****
     * 4am - 6am    4,5,6
     * 7am - 11am   7,8,9,10,11
     * 12pm - 4pm   12, 13, 14, 15, 16
     * 5pm - 12pm   17, 16, 17, 17, 19, 21, 22, 23, 0
     * 1am - 3am    1,2,3
     ***/

    const currentDate = new Date();
    const currentHourOfDate = currentDate.getHours();
    switch(currentHourOfDate){
        case 4:
        case 5:
        case 6:
            return "Wow, you're up early ";
            break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            return "Good morning ";
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
            return "Good afternoon ";
            break;    
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 0:
            return "Good evening ";
            break; 
        case 1:
        case 2:
        case 3:
            return "Why are you awake ?"
            break;
    }
}

let classifyTurd = function(turd){
   /******
    * This function figures out what kind of turd this is. Current possible turds are :
    *       Todo
    *       Feeling
    *       Unclassified 
    *   Input : A single turd
    *   Outputs: either a todo, feeling, unclassified
    *****/
    let todoPattern = new RegExp('to do|need to|todo|go to|pick up|want to|wanna');
    let feelingPattern_Negative = new RegExp('stressed|tired|lonely|frustrated|angry|hate|upset|sad|like');
    let feelingPattern_Positive = new RegExp('happy|grateful');

    let isItATodo = todoPattern.test(turd);
    let isItNegativeFeeling = feelingPattern_Negative.test(turd);
    let isItAPositiveFeeling = feelingPattern_Positive.test(turd);

    if (isItATodo){
        return ['todo'];
    }else if (isItNegativeFeeling){
        return ['feeling', 'Negative']
     }else if (isItAPositiveFeeling){
        return ['feeling', 'Positive']
    } else{
        return ['unclassified'];
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
        checkBox.addEventListener("click", changeTurdoStatus);
    let turdoText = document.createElement("span")
        turdoText.setAttribute("class", "turdo_Text")
        turdoText.innerHTML = individualTurd;
 
    turdContainer.appendChild(checkBox);
    turdContainer.appendChild(turdoText);

    return turdContainer
}

let changeTurdoStatus = function(e){
    let checkBox = e.currentTarget.checked;
    let turdoText = e.currentTarget.parentElement.getElementsByClassName('turdo_Text')[0];
    console.log(turdoText)
    if (checkBox) {
        turdoText.style.textDecoration = 'line-through';
    } else{
        turdoText.style.textDecoration = 'none';

    }
    console.log(checkBox);
    console.log(turdoText);
}
let makeFeeling = function(individualTurd, typeOfEmotion){
    let turdContainer = document.createElement('div');
    let emoticon = ""
    console.log(typeOfEmotion);
    if (typeOfEmotion === 'Positive') {
        emoticon = ":) "
    } else if(typeOfEmotion=== 'Negative'){
        emoticon = ":( "
    } else{
        emoticon = ":|"
    }
    turdContainer.innerText = emoticon + individualTurd;

    return turdContainer;

}

let storeDumps =function (){
    localStorage.setItem("todoTurds", toduTurds.innerHTML)
    localStorage.setItem("touchyFealyTurds", touchyFealyTurds.innerHTML)
    localStorage.setItem("unclassifiedTurds", unclassifiedTurds.innerHTML)

}

let clearDumps = function(){
    localStorage.setItem("todoTurds", "")
    localStorage.setItem("touchyFealyTurds", "")
    localStorage.setItem("unclassifiedTurds", "")

    toduTurds.innerHTML = "";
    touchyFealyTurds.innerHTML = "";
    unclassifiedTurds.innerHTML = "";
}

let getPastDumps =function getPastDumps(){
    let savedTurds = localStorage.getItem("todoTurds");
    let savedfeelings = localStorage.getItem("touchyFealyTurds");
    let unclassifedTurds = localStorage.getItem("unclassifiedTurds");

    toduTurds.innerHTML = savedTurds;
    touchyFealyTurds.innerHTML = savedfeelings;
    unclassifiedTurds.innerHTML = unclassifedTurds;
}

let handleDumps = function(e){
     if (e.keyCode === 13) { //did they press enter?
   
        let individualTurd = userInput.value;
        let turdClassification = classifyTurd(individualTurd);
        let turdDiv = document.createElement("div") 
        let newDiv = "";
        switch (turdClassification[0]){
            case 'todo':
                newDiv = makeTurdo(individualTurd);
                toduTurds.appendChild(newDiv);
                break;
            case 'feeling':
                let typeOfEmotion = turdClassification[1];
                newDiv = makeFeeling(individualTurd, typeOfEmotion);   
                if (typeOfEmotion === 'Positive'){
                    newDiv.setAttribute('class','positive_Emotion');
                } else{
                    newDiv.setAttribute('class','negative_Emotion');

                }
                touchyFealyTurds.appendChild(newDiv);
                break;
            case 'unclassified':
                turdDiv.innerHTML = individualTurd;
                unclassifiedTurds.appendChild(turdDiv);
                break;
        }
        userInput.value = "" //Clears input field
     }         
}

/**
 * Section adds additional HTML elements to the DIV containers
 */


// welcome message Start //
    const greeting = document.createElement("h1");
    let welcomeMessage = getTimeOfDaySpecificWelcomeMessage();
    greeting.innerHTML = welcomeMessage + userInfo.name;
// welcome message End

// Input feel start 
    const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "toilet");
    userInteraction.appendChild(userInput);
// Input feel start

// User Instructions start 
    const userAction = document.createElement("h2");
        userAction.innerHTML="Whats on your mind?"

    instructions.appendChild(greeting);
    instructions.appendChild(userAction);
// User Instructions end

// Footer Start
    //Link to Backlog
    let linkToBackLog = document.createElement("a");
    linkToBackLog.setAttribute('href', './backlog.md');
    linkToBackLog.innerText = ' Backlog ';
    footer.appendChild(linkToBackLog)

    //Link to clear the dumps
    let linkToClearDumps = document.createElement("a");
    linkToClearDumps.setAttribute("href", "#")
    linkToClearDumps.innerText = " Clear Dumps ";
    linkToClearDumps.addEventListener("click", clearDumps);
    footer.appendChild(linkToClearDumps);
// Footer end

/*************
 * Event Handlers
 **************/
window.onload = userInput.focus(); //This is to remove friction. so the user can start typing
userInput.addEventListener("keypress", handleDumps);
window.onload = getPastDumps;
window.onbeforeunload = storeDumps;

