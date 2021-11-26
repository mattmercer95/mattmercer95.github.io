/* 
    Responsive Web Development: Hangman Assignment 
    by: Matt Mercer
    date: 2021-11-23
*/

//create the answer, starting guess counter, and guess log
const answerBank = ["JAVASCRIPT", "PYTHON", "CSHARP", "RUBYONRAILS", "MATLAB", "JAVA", "FORTRAN"];
var answer;
var guessCounter = 6;
var guessLog = [];

//checks if letter is in the answer
function checkLetter(inputLetter) {

    //check to see if guess was already entered
    if (guessLog.includes(inputLetter))
        //don't continue if already guessed
        return;
    else
        //add the guess to the log
        guessLog.push(inputLetter);

    //check for game over
    if (guessCounter <= 0)
        //dont continue if game over
        return;

    //check to see if inputed letter is in the answer
    var correctLetter = false;
    for(var i = 0; i <answer.length; i++) {
        if(answer.charAt(i) == inputLetter){
            correctLetter = true;
        }
    }

    //change input label style depending if letter is correct
    let inputLetterLabel = document.getElementById(inputLetter);
    inputLetterLabel.style.color = "white";
    if(correctLetter) {
        inputLetterLabel.style.backgroundColor = "green";
    }
    else {
        inputLetterLabel.style.backgroundColor = "red";
    }

    //if letter is correct, display to user
    if(correctLetter) {
        //get the list html elements for output letters
        const outputLetter = document.querySelectorAll(".answerLetter");
        //loop through answer and display letter at correct position
        for(var j = 0; j < answer.length; j++){
            if(answer.charAt(j) == inputLetter){
                outputLetter[j].innerHTML = inputLetter;
            }
        }
    }
    //if letter is wrong decrease the counter by 1 and display new hangman pic 
    else {
        guessCounter--;
        document.getElementById("guessNumber").innerHTML = guessCounter;
        //change pic
        changeHangmanPic();
    }

    //if out of guesses, display game over message
    if(guessCounter == 0) {
        document.getElementById("guessNumber").innerHTML = "GAME OVER";
        document.getElementById("guessNumber").style.color = "red";
    }
}

//changes the hangman pic depending on the guess counter
function changeHangmanPic (){
    
    let pic = document.getElementById("hangmanImageID");
    switch(guessCounter){
        case 6:
            pic.src = "Images/hangmanStart.png";
            break;
        case 5:
            pic.src = "Images/hangmanGuess1.png";
            break;
        case 4:
            pic.src = "Images/hangmanGuess2.png";
            break;
        case 3:
            pic.src = "Images/hangmanGuess3.png";
            break;
        case 2:
            pic.src = "Images/hangmanGuess4.png";
            break;
        case 1:
            pic.src = "Images/hangmanGuess5.png";
            break;
        case 0:
            pic.src = "Images/hangmanGuess6.png";
            break;
    }
}

//Starts a new game
function NewGame() {
    //selects a new answer from the answer bank at random
    answer = answerBank[Math.floor(Math.random() * answerBank.length)];
    //reset row of labels
    const oldOutputLabels = document.getElementsByClassName("answerLetter");
    while (oldOutputLabels.length > 0) {
        oldOutputLabels[0].remove();
    }
    console.log(answer); // console answer for debuging
    //create the row of labels that displays the answer
    var answerBlock = document.getElementById("answerBlockID");
    for(var i = 0; i < answer.length; i++){
        var outputLabel = document.createElement("label");
        outputLabel.className = "answerLetter";
        const outputLetter = document.createTextNode("&nbsp;");
        outputLabel.appendChild(outputLetter);
        answerBlock.appendChild(outputLabel);
    }
    //reset guess counter
    guessCounter = 6;
    document.getElementById("guessNumber").innerHTML = guessCounter;
    document.getElementById("guessNumber").style.color = null;
    //clear the guess log
    guessLog = [];
    //change the picture back
    changeHangmanPic();
    //clear the answer output labels
    const outputLetters = document.querySelectorAll(".answerLetter");
    for(var i = 0; i <outputLetters.length; i++) {
        outputLetters[i].innerHTML = "&nbsp;";
    }
    //reset the input labels
    const inputLetter = document.querySelectorAll(".guessLetter");
    for(var j = 0; j <inputLetter.length; j++) {
        inputLetter[j].style.color = null;
        inputLetter[j].style.backgroundColor = null;
    }
}