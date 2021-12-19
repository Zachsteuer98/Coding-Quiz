var timeDisplay = document.getElementById("timeDisplay")
var timer = document.getElementById("timer")
var startBtn = document.getElementById("startBtn")
var questionDiv = document.getElementById("question")
var answerBtn1 = document.getElementById("answer1")
var answerBtn2 = document.getElementById("answer2")
var answerBtn3 = document.getElementById("answer3")
var answerBtn4 = document.getElementById("answer4")
var feedback = document.getElementById("feedback")
var title = document.getElementById("pageTitle")
var timer = 0
var qNum = 0
var timeLeft = 0
var score = 0
var questionsArray = [
    {
      title: "After you're done creating and testing a new feature in a feature branch, what is the next step?",
      choices: ["Merge to main", "Merge to develop", "create a new feature branch", "Git commit"],
      answer: "Merge to develop"
    },
    {
      title: "What is the barebones of any website?",
      choices: ["Javascript", "CSS", "HTML", "Python"],
      answer: "HTML"
    },
    {
        title: "What do you place behind an ID in CSS?",
        choices: ["#", "!", "*", "."],
        answer: "#"
      },
  ];

// set initial timer value and fire off two functions
function quizStart() {
    timeLeft = 60
    startTimer();
    initQ();
}
function startTimer() {
    time.innerHTML = (timeLeft);
    timer = setInterval(tick, 1000);
}
function tick() {
    if (timeLeft !== 0) {
     timeLeft--
     time.innerHTML = (timeLeft)
    }
    else {
        clearInterval(timer)
        quizOver();
    }
    return;
}
function initQ() {
    document.querySelectorAll(".main").forEach(main => { main.style.display = "none" })
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "initial" })
    quiz(qNum);
}
function quiz() {   
    if (qNum >= questionsArray.length) {
    quizOver();
}
else {
    questionDiv.innerHTML = (questionsArray[qNum].title)
    answerBtn1.innerHTML = (questionsArray[qNum].choices[0])
    answerBtn2.innerHTML = (questionsArray[qNum].choices[1])
    answerBtn3.innerHTML = (questionsArray[qNum].choices[2])
    answerBtn4.innerHTML = (questionsArray[qNum].choices[3])
}}
function answerCheck(btnId) {
    if ((document.getElementById(btnId).innerHTML) === (questionsArray[qNum].answer)) {
        rightAnswer();
        qNum++
    }
    else {
        wrongAnswer();
        qNum++
    }
    quiz(qNum);
}
function rightAnswer() {
    score = timeLeft
    feedback.innerHTML = ("Correct");
    setTimeout(function() {feedback.innerHTML = ("");}, 800)
}
function wrongAnswer() {
    timeLeft = (timeLeft - 15)
    feedback.innerHTML = ("Wrong");
    setTimeout(function() {feedback.innerHTML = ("");}, 800)
}

function quizOver() {
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "none" })
    var content = document.getElementById('theContent')
    var done = document.getElementById("done")
    var submit = document.getElementById("submit")

    time.innerHTML = (0)
    
    content.insertAdjacentHTML('afterbegin', '<h1 id="done">All Done!</h1> <button id="submit" class="btn btn-danger">Submit</button> <input id="userScore"> - Enter Initials</input>');

    var done = document.getElementById("done")
    done.insertAdjacentHTML('afterend', '<p id="finalScore">Your final score is ' + score + '</p>');

    var submit = document.getElementById("submit")
    submit.addEventListener("click", function(){
        var value = document.getElementById('userScore').value;
       localStorage.setItem(value, score)
       window.location.href = "highscore.html"
    });  
    clearInterval(timer)
}

function renderTable() {
    var tbody = document.getElementById("tableBody")
    for (let i = 0; i < localStorage.length; i++) {
     var userName = localStorage.key(i)
     var userScore = localStorage.getItem(userName)
     tbody.insertAdjacentHTML('afterbegin', '<tr class="scores"><td>' + userName + ' - ' + userScore + '</td></tr>')
    }
}

function clearStorage() {
    localStorage.clear();
    window.location.reload();
}