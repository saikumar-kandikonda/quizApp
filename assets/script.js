
const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];

const main = document.querySelector('main');
const startQuizBtn = document.querySelector('#startQuiz');
const homePageDiv = document.querySelector('.homePage');
let timer = document.getElementById('timer');

let allDoneCard = document.querySelector('.allDoneCard');
let submitInitials = document.querySelector('#submitInitials');
let inputText = document.getElementById('initialsInputBox');
let finalScore = document.getElementById('finalScore');

let highScoresCard = document.querySelector('.highScoresCard');
let highScoreName = document.getElementById('highScoreName');
let highScore = document.getElementById('highScore');

let goBackBtn = document.getElementById('goBackBtn');
let clearHighScoresBtn = document.getElementById('clearHighScoresBtn');
let highScoresOl = document.querySelector('#highScoresOl')

let firstQuestion = 0;
let timerValue = 50;

let startTheTimer;


function startTimer() {
    startTheTimer = setInterval(() => {
        if (timerValue === 0) {
            endQuiz();
        }
        else {
            timer.innerText = `00:${timerValue}`;
            timerValue--;
        }
    }, 1000)

}


//first lets start the quiz
startQuizBtn.addEventListener('click', startQuizfn);

function startQuizfn() {
    allDoneCard.classList.add("hide");
    highScoresCard.classList.add('hide');
    homePageDiv.classList.add("hide"); //hide homepage
    dispalyQuestion(firstQuestion); //display each question
    //start timer
    startTimer();
}

//after answering every question next qustion will be trigerred from here

function nextQuestion(firstQuestion) {
    let questionCard = document.getElementById("questionsCard");
    if (main.questionCard !== null) {
        main.removeChild(questionCard);
    }
    dispalyQuestion(firstQuestion);
}


//on answer button click, this will be triggered, we're checking the status
function checkAnswerStatus(event) {
    let answerStatus = document.querySelector('.answerStatus')
    if (event.target.innerText === questions[firstQuestion].answer) {
        answerStatus.innerText = "correct"
    } else {
        answerStatus.innerText = "wrong";
        timerValue = timerValue - 10;
    }
    firstQuestion++;
    // console.log("total questions",questions.length);
    // console.log("question no",+firstQuestion);
    setTimeout(() => {
        if (firstQuestion === questions.length) {
            endQuiz();
        } else {
            nextQuestion(firstQuestion);

        }
    }, 500)


}

//we'll diplay each question from the array above

function dispalyQuestion(quesNo) {
    if (quesNo === questions.length) {
        endQuiz();
    }
    else {
        let questionsCard = document.createElement('div');
        questionsCard.setAttribute('id', 'questionsCard');
        main.appendChild(questionsCard);
        let questionText = document.createElement('h1');
        questionText.setAttribute('class', 'question');
        questionText.innerText = `${questions[quesNo].questionText}`;
        questionsCard.append(questionText);

        let answersOl = document.createElement('ul');
        answersOl.setAttribute('class', 'answers');
        questionsCard.append(answersOl);

        questions[quesNo].options.map((option) => {
            let answerBtn = document.createElement('button');
            answerBtn.setAttribute('class', 'answerBtn');
            answerBtn.innerHTML = `<li>${option}</li>`;
            answersOl.append(answerBtn);
            answerBtn.addEventListener('click', checkAnswerStatus);
        })

        let answerStatusSpan = document.createElement('p');
        answerStatusSpan.setAttribute('class', 'answerStatus');
        answerStatusSpan.innerText = "";
        questionsCard.append(answerStatusSpan);
    }
}
//end the quiz and display all DOne card
function endQuiz() {
    clearInterval(startTheTimer);
    timer.innerText = "";
    let questionCard = document.getElementById("questionsCard");
    main.questionCard !== null ? main.removeChild(questionCard) : "";
    homePageDiv.classList.add("hide");
    allDoneCard.classList.remove("hide");
    finalScore.innerText = timerValue;
}
document.getElementById('leaderboard').addEventListener('click', getHighScore);


//setting the highscore card with exact values
function getHighScore(e) {
    e.preventDefault();
    homePageDiv.classList.add("hide");
    allDoneCard.classList.add("hide");
    highScoresCard.classList.remove('hide');
    var existingScores = JSON.parse(localStorage.getItem("allScores"));
    let sortedScores = existingScores.sort(function (x, y) {
        return y.score - x.score;
    });

    let [first, second] = sortedScores;
    let liItems = `<li><span id="highScoreName">${first.name}</span> ---
                     <span id="highScore">${first.score}</span></li>
                     <li><span id="highScoreName">${second.name}</span> ---
                     <span id="highScore">${second.score}</span></li>
                     `;
    highScoresOl.innerHTML = liItems;

}


function submitInitialsFn(e) {
    let name = inputText.value;
    let score = timerValue;
    allDoneCard.classList.add("hide");
    var existingScores = JSON.parse(localStorage.getItem("allScores"));
    if (existingScores == null) existingScores = [];
    let user = { "name": name, "score": score };

    localStorage.setItem("currentScore", JSON.stringify(user));
    existingScores.push(user);
    localStorage.setItem("allScores", JSON.stringify(existingScores));
    
    window.location.reload();
}

//after entering the name and submit

submitInitials.addEventListener('click', submitInitialsFn);

//go back on click should take us to home page
goBackBtn.addEventListener('click', () => {
    window.location.reload();
})


document.getElementById('clearHighScoresBtn').addEventListener('click', ()=>{
    localStorage.clear();
});
