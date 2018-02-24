// $('.buttons').empty();
// var userChoice1;

var questions = [{
    question: "What famous actor is known for the saying, I'll be back?",
    choices: ["Will Smith", "Arnold Schwarzenegger", "Christopher Ford", "Tom Hanks"],
    correctAnswerText: "Arnold Schwarzenegger",
    correctAnswer: 1
}, {
    question: "In which year were the Academy Awards, or 'Oscars', first presented?",
    choices: [1892, 1829, 1992, 1929],
    correctAnswerText: "1929",
    correctAnswer: 3
}, {
    question: "Which actress plays Katnis Everdeen in the hunger Games movies?",
    choices: ["Julia Roberts", "Scarlet Johanson", "Jennifer Lawrence", "Jennifer Lopez"],
    correctAnswerText: "Jennifer Lawrence",
    correctAnswer: 2
}, {
    question: "Judy Garland starred as Dorothy Gale in which classic movie?",
    choices: ["The Wizard of Oz", "Psycho", "Cassablanca", "Citizen Kane"],
    correctAnswerText: "The Wizard of Oz",
    correctAnswer: 0
}, {
    question: "Who was the first African American actor to win the Academy Award for Best Actor?",
    choices: ["Samuel Jackson", "Martin Lawrence", "Sidney Poitier", "Queen Latifah"],
    correctAnswerText: "Sidney Poitier",
    correctAnswer: 2
}, {
    question: "Who directed the epic historical drama Schindler's List in 1993?",
    choices: ["Christopher Nolan", "Steven Spielberg", "Martin Scorsese", "Alfred Hitchcock"],
    correctAnswerText: "Steven Spielberg",
    correctAnswer: 1
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var startGame = true;
var Wins = 0;
var Losses = 0;



$(document).ready(function () {



    $('.button').html('Start Game!')
    // Display the first question
    // displayCurrentQuestion();
    $("#answer").hide();

    // On clicking next, display the next question
    $(".button").on("click", function () {
        if (startGame) {
            startGame = false;
            $('.button').html('Submit!');
            displayCurrentQuestion();
            return;
        }
        if (!quizOver) {

            var value = $("input[type='radio']:checked").val();
            // var correctAnswer = 

            if (value === undefined) {
                $('#answer').html("Please select an answer!");
                $('#answer').show();
            } else if (value) {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $('#answer').hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    $('#answer').html("Good Choice!");
                    $('#answer').show();
                    Wins++;
                    stopwatch.stop();
                    setTimeout(() => {
                        if (currentQuestion < questions.length-1) {
                        currentQuestion++;
                        displayCurrentQuestion();
                        }
                    }, 3000);
                    

                } else {
                    $('#answer').html("Sorry! It's " + questions[currentQuestion].correctAnswerText);
                    $('#answer').show();
                    Losses++;
                    stopwatch.stop();
                    setTimeout(() => {
                        if (currentQuestion < questions.length-1) {
                        currentQuestion++;
                        displayCurrentQuestion();
                        }
                    }, 3000);
                }

                // Since we have already displayed the first question on DOM ready
            }
            console.log(currentQuestion);
            if (currentQuestion < questions.length-1) {
                displayCurrentQuestion();
                $('#answer').show();
                console.log(currentQuestion);
    
            } else if(currentQuestion >= questions.length-1){
                stopwatch.reset();
                stopwatch.stop();
                displayScore();
                //$(document).find(".nextButton").toggle();
                //$(document).find(".playAgainButton").toggle();
                // Change the text in the next button to ask if user wants to play again
                $('.choiceList').empty();
                $('#question').empty();
                $(".button").html("Play Again?");
                setTimeout(() => {
                    $("#answer").empty();
                },3000)
                quizOver = true;
            }

        }
        else if (quizOver) {
            console.log("Quiz is over");
            resetQuiz();
        }

    });

});

//STOPWATCH STARTS HERE!
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
//prevents the clock from being sped up unnecessarily
var clockRunning = false;
var stopwatch = {
    time: 15,
    reset: function () {
        stopwatch.time = 15;
        // DONE: Change the "display" div to "00:00."
        $("#display").html("00:00");
        // DONE: Empty the "laps" div.
    },
    start: function () {
        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },

    stop: function () {
        if (clockRunning) {
            // DONE: Use clearInterval to stop the count here and set the clock to not be running.
            clearInterval(intervalId);
            clockRunning = false;
        }
    },

    count: function () {
        // DONE: decrement time by 1, remember we cant use "this" here.
        stopwatch.time--;
        // console.log(Choices[i]);
        if (stopwatch.time <= 0) {
            stopwatch.stop();
            //  ...run the stop function.
            //  Alert the user that time is up.

            //  ...run the stop function.
            //  Alert the user that time is up.
            // $('#answer').html("Time's Up! It's " + questions[currentQuestion].correctAnswer);
            // $('#answer').show();

            currentQuestion++;
            displayCurrentQuestion();

        };
        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        // console.log(converted);
        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
    },

    displayCount: function () {
        stopwatch.time--;
        // console.log(Choices[i]);
        

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        // DONE: Use the variable we just created to show the converted time in the "display" div.
    },

    timeConverter: function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
};
//STOPWATCH ENDS HERE!!

// This displays the current question AND the choices
function displayCurrentQuestion() {
    stopwatch.reset();
    $("#display").html("00:00");
    stopwatch.start();
    $('#answer').hide();
    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quiz > #question");
    var choiceList = $(document).find(".quiz > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $('#question').text(question);

    // Remove all current <li> elements (if any)
    $('.choiceList').find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input class="buttons" type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo('.choiceList');
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
    $(".button").html("Submit");
    quizOver = false;
    displayCurrentQuestion();
}

function displayScore() {
    $("#progress").text("You scored: " + Wins + " out of " + questions.length);
    $("#progress").show();
}

function hideScore() {
    $(document).find("#progress").hide();
}








