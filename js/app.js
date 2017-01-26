'use strict';
const documentbody = document.getElementsByTagName("body");
const instructions = document.getElementById("userInstruction"); //talking to the user
const userInteraction = document.getElementById("userInteraction"); //action taken by the user
const toduTurds = document.getElementById("turd_todos"); //output of the user
const touchyFealyTurds = document.getElementById("turd_feelings"); //output of the user
const unclassifiedTurds = document.getElementById("turd_unclassified"); //output of the user
const footer = document.getElementById("footer"); //output of the user

const userInfo = {
    name : "good looking"
}


/************
 * The functions
 ************/

let getTimeOfDaySpecificWelcomeMessage = function(){


    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour === 4,5,6){
        return "Wow, you're up early ";
    } else if (currentHour=== 7,8,9,10,11){
        return "Good Morning ";
    } else if (currentHour === 12,13,14,15,16){
        return "Good afternoon ";
    } else if (currentHour === 17, 18, 19, 20, 21, 22, 23, 24, 0){
        return "Good evening ";
    } else if(currentHour === 1, 2, 3){
        return "Can't sleep ";
    }

  /*
    switch(currentHour){
        case 4:
        case 5:
        case 6:
            return "Wow, you're up early ";
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            return "Good morning ";
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
            return "Good afternoon ";
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 0:
            return "Good evening ";
        case 1:
        case 2:
        case 3:
            return "Why are you awake "
    }
    */
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
    let feelingPattern_Negative = new RegExp('stressed|tired|lonely|frustrated|angry|hate|upset|sad|like|worried');
    let feelingPattern_Positive = new RegExp('happy|grateful|love');
    let userCommand = new RegExp('let it all go');

    let isItATodo = todoPattern.test(turd);
    let isItNegativeFeeling = feelingPattern_Negative.test(turd);
    let isItAPositiveFeeling = feelingPattern_Positive.test(turd);
    let isItAUserCommand_Clear = userCommand.test(turd);

    if (isItAUserCommand_Clear){
        clearDumps();
        return "";
    }
    
    if (isItATodo===true){ 
        return ['todo']
    }else if (isItNegativeFeeling===true){
        return ['feeling', 'Negative']
    }else if (isItAPositiveFeeling===true){
        return ['feeling', 'Positive']
    }else{
        return ['unclassified'];
    };

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

    if (checkBox) {
        turdoText.style.textDecoration = 'line-through';
    } else{
        turdoText.style.textDecoration = 'none';

    }
}

let makeFeeling = function(individualTurd, typeOfEmotion){
    let turdContainer = document.createElement('div');
    let emoticon = ""

    if (typeOfEmotion === 'Positive') {
        emoticon = "<img src='imgs/icon/happy.png' width='25px' height='25px'>";
    } else if(typeOfEmotion=== 'Negative'){
        emoticon = "<img src='imgs/icon/sad.png' width='25px' height='25px'>";
    } else{
        emoticon = ":|"
    }
    turdContainer.innerHTML = emoticon + individualTurd;

    return turdContainer;

}

let makeTurd = function(individualTurd){
    let turdContainer = document.createElement('div');
    let emoticon = "<img src='imgs/icon/poop.png' width='25px' height='25px'>";
    turdContainer.innerHTML = emoticon + ' ' + individualTurd;
    return turdContainer
}
let storeDumps = function (){
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

let getPastDumps = function getPastDumps(){
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
                newDiv = makeTurd(individualTurd);
                unclassifiedTurds.appendChild(newDiv);
                break;
        }
        userInput.value = "" //Clears input field
     }         
}

let getBackGroundImage = function(){
    return "url('imgs/Tunnel of trees.jpg')";
}
/**
 * Section adds additional HTML elements to the DIV containers
 */

// body
    let background_img = getBackGroundImage();
    document.body.style.backgroundImage  = background_img;
	document.body.style.backgroundSize = "cover";

   // documentbody.style.setBackGroundImage  = backgroundImage;

// welcome message Start //
    const greeting = document.createElement("h1");
    let welcomeMessage = getTimeOfDaySpecificWelcomeMessage();
    greeting.innerHTML = welcomeMessage + userInfo.name;
// welcome message End

// Input feel start 
    const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "toilet");
    userInput.setAttribute("placeholder", "type a thought, hit [enter] & repeat...")
    userInteraction.appendChild(userInput);
// Input feel start

// User Instructions start 
    const userAction = document.createElement("h2");
        userAction.innerHTML="empty your mind"

    instructions.appendChild(greeting);
    instructions.appendChild(userAction);
// User Instructions end

// Footer Start
    //Link to Backlog
    let linkToBackLog = document.createElement("a");
    linkToBackLog.setAttribute('href', './backlog.md');
    linkToBackLog.innerHTML = "<img src='imgs/icon/checklist.png' height=25 widght=15>";
    footer.appendChild(linkToBackLog)

// Footer end

/*************
 * Event Handlers
 **************/
window.onload = userInput.focus(); //This is to remove friction. so the user can start typing
userInput.addEventListener("keypress", handleDumps);
window.onload = getPastDumps;
window.onbeforeunload = storeDumps;

