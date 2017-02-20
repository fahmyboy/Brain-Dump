'use strict';
const documentbody = document.getElementsByTagName("body");
const instructions = document.getElementById("userInstruction"); //talking to the user
const userInteraction = document.getElementById("userInteraction"); //action taken by the user
const toduTurds = document.getElementById("turd_todos"); //output of the user
const touchyFealyTurds = document.getElementById("turd_feelings"); //output of the user
const unclassifiedTurds = document.getElementById("turd_unclassified"); //output of the user
const footer = document.getElementById("footer"); //output of the user

 //session variables
let numberOfNewTurdos = 0;
let numberOfNewFeelings = 0;
let numberOfNewUnclassified = 0;

const userInfo = {
    name : ""
}


/************
 * The functions
 ************/
let getTimeOfDaySpecificWelcomeMessage = function(){
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    switch(currentHour){
        case 4: case 5: case 6:
            return "Wow, you're up early ";
        case 7: case 8: case 9: case 10: case 11:
            return "Good morning ";
        case 12: case 13: case 14: case 15: case 16:
            return "Good afternoon ";
        case 17: case 18: case 19: case 20: case 21: case 22: case 23: case 0:
            return "Good evening ";
        case 1: case 2: case 3:
            return "Why are you awake ";
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
    let feelingPattern_Negative = new RegExp('stressed|tired|lonely|frustrated|angry|hate|upset|sad|like|worried');
    let feelingPattern_Positive = new RegExp('happy|grateful|love');
    let userCommand = new RegExp('let it all go');
    let userCommand_KeepTheTurdo = new RegExp('let all the turds go');

    let isItATodo = todoPattern.test(turd);
    let isItNegativeFeeling = feelingPattern_Negative.test(turd);
    let isItAPositiveFeeling = feelingPattern_Positive.test(turd);
    let isItAUserCommand_Clear = userCommand.test(turd);
    let isItAUserCommand_KeepTheTurdo = userCommand_KeepTheTurdo.test(turd);


    if (isItAUserCommand_Clear){
        clearDumps();
        return "";
    }

    if (isItAUserCommand_KeepTheTurdo){
        clearDumps('todos');
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

// Handle turd drag and drops
let allowDrop = function(e) {

    e.preventDefault();
    console.log(e)
}

let killThisTurd =  function(e){
    e.srcElement.remove();
}

let getTurdText = function(e){
    //console.log(e.srcElement.childNodes);
    let turdText = e.srcElement.childNodes[1].innerText;
    e.dataTransfer.setData("text", turdText);
    }

let reclasifyTurd = function(e){
   let turdText = e.dataTransfer.getData("text");
   let targetContainer = e.target.parentElement.id;
   let newdiv;

   switch(targetContainer){
       case "turd_todos":
        newdiv = makeTurdo(turdText);
        toduTurds.appendChild(newdiv);
      //  originalTurdConatainer.remove();

       break;
       case "turd_unclassified":
        newdiv = makeTurd(turdText);
        unclassifiedTurds.appendChild(newdiv);
       // originalTurdConatainer.remove();
       

       break;
       case "turd_feelings":
        newdiv = makeFeeling(turdText);
        touchyFealyTurds.appendChild(newdiv);
       // originalTurdConatainer.remove();

       break;
   } 
}

const createTurdDiv = function(){
    const turdContainer = document.createElement('div');
        turdContainer.setAttribute("draggable", "true");
        turdContainer.setAttribute("ondragstart", "getTurdText(event)");
        turdContainer.setAttribute("ondragend", "killThisTurd(event)");
        turdContainer.setAttribute("id", "turd_contrainer");

    return turdContainer;
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
    let turdContainer = createTurdDiv();

    let checkBox = document.createElement('input');
        checkBox.setAttribute("type", "checkBox");
        checkBox.setAttribute("onclick", "changeTurdoStatus(event)");
        //checkBox.addEventListener("click", changeTurdoStatus);
    let turdoText = document.createElement("span");
        turdoText.setAttribute("class", "turd_text");
        turdoText.innerHTML = individualTurd;
 
    turdContainer.appendChild(checkBox);
    turdContainer.appendChild(turdoText);
    numberOfNewTurdos++
    return turdContainer;
}

let changeTurdoStatus = function(e){
    let checkBox = e.currentTarget.checked;
    let turdoText = e.currentTarget.parentElement.getElementsByClassName('turd_Text')[0];
    if (checkBox) {
        turdoText.style.textDecoration = 'line-through';
    } else{
        turdoText.style.textDecoration = 'none';
    }
}

let makeFeeling = function(individualTurd, typeOfEmotion){
   const turdContainer = createTurdDiv();


    let turdoText = document.createElement("span");
        turdoText.setAttribute("class", "turd_text");
        turdoText.innerHTML = individualTurd;

    let emoticonContainer = document.createElement("span");
        
    let emoticon= "";

    if (typeOfEmotion === 'Positive') {
        emoticon = "<img src='imgs/icon/happy.png' width='25px' height='25px'>";
    } else if(typeOfEmotion=== 'Negative'){
        emoticon = "<img src='imgs/icon/sad.png' width='25px' height='25px'>";
    } else{
        emoticon = "<img src='imgs/icon/neutral.png' width='25px' height='25px'>";
    }
    emoticonContainer.innerHTML = emoticon;

    turdContainer.appendChild(emoticonContainer);    
    turdContainer.appendChild(turdoText);
    numberOfNewFeelings++;
    return turdContainer;

}

let makeTurd = function(individualTurd){
    const  turdContainer = createTurdDiv();


    let emoticon = "<img src='imgs/icon/poop.png' width='25px' height='25px'>";

    let turdoText = document.createElement("span")
        turdoText.setAttribute("class", "turd_text")
        turdoText.innerHTML = individualTurd;

    let emoticonContainer = document.createElement("span");
    emoticonContainer.innerHTML = emoticon;
    
    turdContainer.appendChild(emoticonContainer);    
    turdContainer.appendChild(turdoText);
    numberOfNewUnclassified++;
    return turdContainer
}
let storeDumps = function (){
    localStorage.setItem("todoTurds", toduTurds.innerHTML)
    localStorage.setItem("touchyFealyTurds", touchyFealyTurds.innerHTML)
    localStorage.setItem("unclassifiedTurds", unclassifiedTurds.innerHTML)

}

let clearDumps = function(whatNotToClear){
    localStorage.setItem("todoTurds", "")
    localStorage.setItem("touchyFealyTurds", "")
    localStorage.setItem("unclassifiedTurds", "")

    if(whatNotToClear !== 'todos'){
        toduTurds.innerHTML = "";
    }
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
        userInput.setAttribute("placeholder", getHintMessage())

     }         
}

let countWhatIsOnYourMind = 0;
let countThreeMostImportantThings = 0;
let getHintMessage = function(){
    /*messages
    "How are you feeling now"
    "What is keeping you up at night?"
    "What are you greateful for today?"
    "What are three most important things you need to do today?"
    */
    /*
    console.log('todos: '+numberOfNewTurdos)
    console.log('unclassified: '+numberOfNewUnclassified)
    console.log('feelings: '+numberOfNewFeelings)
    */

    if (countWhatIsOnYourMind < 3){
        countWhatIsOnYourMind++;
        console.log(countWhatIsOnYourMind);
        return "What is on your mind?"       
    }

    if (countThreeMostImportantThings===0){
        countThreeMostImportantThings++;
        return "What is the single most important thing you need to do today?";
    }

    if (countThreeMostImportantThings==1){
        countThreeMostImportantThings++;
        return "What is the second most important thing you need to do today?";
    }

    if (countThreeMostImportantThings===2){
        countThreeMostImportantThings++;
        return "What is the third most important thing you need to do today?";
    }
    return "what else is on your mind?"
}
let getBackGroundImage = function(){
    //return "url('imgs/Tunnel of trees.jpg')";
    return "url('imgs/agadir_sunset.jpg')";
    
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

// Input feel start 
    const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "toilet");
    userInput.setAttribute("placeholder", "What are you grateful for")
    userInteraction.appendChild(userInput);

// User Instructions start 
    const userAction = document.createElement("h2");
        userAction.innerHTML="empty your mind"

    instructions.appendChild(greeting);
    //instructions.appendChild(userAction);

// Buckets

    toduTurds.setAttribute("ondragover","allowDrop(event)");
    touchyFealyTurds.setAttribute("ondragover","allowDrop(event)");
    unclassifiedTurds.setAttribute("ondragover","allowDrop(event)");

    toduTurds.setAttribute("ondrop","reclasifyTurd(event)")
    touchyFealyTurds.setAttribute("ondrop","reclasifyTurd(event)")
    unclassifiedTurds.setAttribute("ondrop","reclasifyTurd(event)")

/*
    let howManyTurdos = toduTurds.childElementCount;

    if (howManyTurdos === 0) {
        let turdoBucketMessage = document.createElement("div")
            turdoBucketMessage.setAttribute("id", "turdo_header");
            turdoBucketMessage.innerText = "Things I have todo";
        toduTurds.appendChild(turdoBucketMessage);


    }
*/
// Footer Start
    //Link to Backlog
    let linkToBackLog = document.createElement("a");
    linkToBackLog.setAttribute('href', './backlog.md');
    linkToBackLog.innerHTML = "<img src='imgs/icon/checklist.png' height=25 widght=15>";
    footer.appendChild(linkToBackLog)


/*************
 * Event Handlers
 **************/
window.onload = userInput.focus(); //This is to remove friction. so the user can start typing
userInput.addEventListener("keypress", handleDumps);
window.onload = getPastDumps;
window.onbeforeunload = storeDumps;

