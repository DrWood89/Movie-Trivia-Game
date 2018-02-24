// $('.buttons').empty();
// var userChoice1;

var questions = [{
    question: "What famous actor is known for the saying, I'll be back?",
    choices: ["Will Smith", "Arnold Schwarzenegger", "Christopher Ford", "Tom Hanks"],
    correctAnswer: 1
}, {
    question: "In which year were the Academy Awards, or 'Oscars', first presented?",
    choices: [1892, 1829, 1992, 1929],
    correctAnswer: 3
}, {
    question: "Which actress plays Katnis Everdeen in the hunger Games movies?",
    choices: ["Julia Roberts", "Scarlet Johanson", "Jennifer Lawrence", "Jennifer Lopez"],
    correctAnswer: 2
}, {
    question: "Judy Garland starred as Dorothy Gale in which classic movie?",
    choices: ["The Wizard of Oz", "Psycho", "Cassablanca", "Citizen Kane"],
    correctAnswer: 0
}, {
    question: "Who was the first African American actor to win the Academy Award for Best Actor?",
    choices: ["Samuel Jackson", "Martin Lawrence", "Sidney Poitier", "Queen Latifah"],
    correctAnswer: 2
}, {
    question: "Who directed the epic historical drama Schindler's List in 1993?",
    choices: ["Christopher Nolan", "Steven Spielberg", "Martin Scorsese", "Alfred Hitchcock"],
    correctAnswer: 1
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

var Wins = 0;
var Losses = 0;



$(document).ready(function () {




    // Display the first question
    displayCurrentQuestion();
    $("#answer").hide();

    // On clicking next, display the next question
    $(".button").on("click", function () {
        if (!quizOver) {

            var value = $("input[type='radio']:checked").val();

            if (value === undefined) {
                $('#answer').html("Please select an answer!");
                $('#answer').show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $('#answer').hide();

                if (value === questions[currentQuestion].correctAnswer) {
                    Wins++;
                    $('#answer').html("Good Choice!");
                    $('#answer').show();
                    Wins++;
                    setTimeout(() => {
                        currentQuestion++;
                    displayCurrentQuestion();
                    }, 3000);
                    

                } else {
                    $('#answer').html("Sorry! It's " + questions[currentQuestion].correctAnswer);
                    $('#answer').show();
                    Losses++;
                    currentQuestion++;
                    displayCurrentQuestion();
                }

                // Since we have already displayed the first question on DOM ready
       
                // if (stopwatch.time === 0) {
                //     stopwatch.stop();
                //     //  ...run the stop function.
                //     //  Alert the user that time is up.
                //         $('#answer').html("Time's Up! ");
                //         $('#answer').show();
                //     displayCurrentQuestion();
                // }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(".button").html("Try Again!");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
            $('#answer').hide();

        } else if(currentQuestion > questions.length){
            stopwatch.stop();
            stopwatch.reset();
            displayScore();
            //$(document).find(".nextButton").toggle();
            //$(document).find(".playAgainButton").toggle();
            // Change the text in the next button to ask if user wants to play again
            $(".button").html("Play Again?");
            quizOver = true;
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
}

function displayScore() {
    $("#progress").text("You scored: " + Wins + " out of: " + questions.length);
    $("#progress").show();
}

function hideScore() {
    $(document).find("#progress").hide();
}

// var rightChoices = ["Arnold Schwarzenegger", 1929, "Jennifer Lawrence", "The Wizard of Oz", "Sidney Poitier", "Steven Spielberg"];

// var x = 0;
// x++;
// var y = questionsArray.length;
// var questionCounter = 0;
// var Wins = 0;
// var Losees = 0;


// var buttons = $('#buttonchoice0, #buttonchoice1, #buttonchoice2, #buttonchoice3');

// $(document).ready(function () {
//     console.log("I'm here");
//     var button = $("<button>");
//     button.attr('id', "Start");
//     button.text('Start');
//     $('#buttons').append(button);



//     //STOPWATCH STARTS HERE!
//     //  Variable that will hold our setInterval that runs the stopwatch
//     var intervalId;
//     //prevents the clock from being sped up unnecessarily
//     var clockRunning = false;

//     var stopwatch = {
//         time: 15,
//         reset: function () {
//             stopwatch.time = 15;

//             // DONE: Change the "display" div to "00:00."
//             $("#display").html("00:00");
//             // DONE: Empty the "laps" div.
//         },
//         start: function () {
//             // DONE: Use setInterval to start the count here and set the clock to running.
//             if (!clockRunning) {
//                 intervalId = setInterval(stopwatch.count, 1000);
//                 clockRunning = true;
//             }
//         },

//         stop: function () {
//             if (clockRunning) {
//                 // DONE: Use clearInterval to stop the count here and set the clock to not be running.
//                 clearInterval(intervalId);
//                 clockRunning = false;
//             }
//         },

//         count: function () {

//             // DONE: decrement time by 1, remember we cant use "this" here.

//             stopwatch.time--;

//             // console.log(Choices[i]);
//             if (stopwatch.time === 0) {
//                 stopwatch.stop();
//                 //  ...run the stop function.
//                 //  Alert the user that time is up.

//                     $('#answer').text("Time's Up! ");
//                     setTimeout(function () {
//                         nextQuestion();
//                 }, 1000)

//             }
//             // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
//             //       and save the result in a variable.
//             var converted = stopwatch.timeConverter(stopwatch.time);
//             // console.log(converted);
//             // DONE: Use the variable we just created to show the converted time in the "display" div.
//             $("#display").text(converted);

//         },

//         displayCount: function () {

//             stopwatch.time--;

//             // console.log(Choices[i]);
//             if (stopwatch.time === 0) {
//                 stopwatch.stop();
//                 //  ...run the stop function.
//                 //  Alert the user that time is up.
//             }
//             // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
//             //       and save the result in a variable.
//             var converted = stopwatch.timeConverter(stopwatch.time);
//             // console.log(converted);
//             // DONE: Use the variable we just created to show the converted time in the "display" div.

//         },

//         timeConverter: function (t) {
//             var minutes = Math.floor(t / 60);
//             var seconds = t - (minutes * 60);
//             if (seconds < 10) {
//                 seconds = "0" + seconds;
//             }
//             if (minutes === 0) {
//                 minutes = "00";
//             }
//             else if (minutes < 10) {
//                 minutes = "0" + minutes;
//             }
//             return minutes + ":" + seconds;
//         }
//     };
//     //STOPWATCH ENDS HERE!!

//     function nextQuestion() {
//         time = 15;
//         stopwatch.reset();
//         stopwatch.start();
//         stopwatch.count();
//         stopwatch.displayCount();



//         questionCounter++;

//         $('#answer').empty();
//         $("#question").html(questionsArray[questionCounter]);
//         // rightChoice = rightChoice[questionCounter];
//         question = questionsArray[questionCounter];
//         answers = choicesArray[questionCounter];
//         rightChoice = rightChoices[questionCounter];
//         // console.log(rightChoice[questionCounter]);
//         // for (var i = 0; i < Choices.length; i++) {
//         // var rightChoice = rightChoices[quedstionCounter];
//         $('#choice0').text(optionList0[questionCounter]);
//         $('#choice1').text(optionList1[questionCounter]);
//         $('#choice2').text(optionList2[questionCounter]);
//         $('#choice3').text(optionList3[questionCounter]);

//         $('#progress').html("Question " + (questionCounter) + " of " + y);

//         function rightChoice() {
//             if (stopwatch.time === 0) {
//                 stopwatch.stop();
//                 //  ...run the stop function.
//                 //  Alert the user that time is up.
//                 $('#answer').text("Time's Up! It's " + rightChoice[questionCounter]);
//                 setTimeout(function () {
//                     nextQuestion(); 
//                 }, 5000)




//         }
//         }


//         if ((questionCounter+1) > y) {
//             $('#progress').text('Question 0 of ' + y);
//             $('#question').empty();
//              $('#buttons').empty();
//             stopwatch.stop();
//             $("#display").html("00:00");
//             $('#answer').text("Game Over");
//             var button = $("<button>");
//             button.attr('id', "Start");
//             button.text('Try Again!');
//             $('#buttons').html(button);
//             button.on("click",function() {
//                 startGame();
//             });

//         }


//                 $('.buttons').one("click",function () {
//             var text = $(this).text();
//             // var buttonchoice = ('#buttonchoice0, #buttonchoice1, #buttonchoice2, #buttonchoice3')
//             // $("#buttonchoice").val(text)
//             var userChoice = $("#buttonchoice").val(text);
//             // var rightChoice = choicesArray.rightChoice[h];


//             console.log(text);
//             // console.log(rightChoiceArray[0]);

//             // var buttons = 4;
//             // console.log(this.value);
//             if (text === rightChoices[questionCounter]) {
//                 console.log(rightChoices[questionCounter]);
//                 stopwatch.stop();
//                 // stopwatch.time = 5;

//                 $('#answer').text("Good Choice!");
//                 setTimeout(function(){ 
//                     nextQuestion(); 
//                      }, 5000);


//             } else {

//                 // console.log("good choice");

//                 $('#answer').html("Sorry! it's: " + rightChoices[questionCounter]);
//                 jQuery(document).ready(function () {
//                     //hide a div after 4 seconds
//                     setTimeout("$('#answer').hide();", 4000);
//                     // console.log("im out");
//                     stopwatch.stop();
//                     setTimeout(function(){ 
//                         nextQuestion(); 
//                          }, 5000);
//                 });

//             }

//             // setTimeout(function(){ 
//             // nextQuestion(); 
//             //  }, 5000);
//         })


//         // console.log((questionsArray[questionCounter]));



//     }

//     button.click(function startGame() {
//         console.log("I'm here");
//         // $('.buttons').empty();
//         $('#buttons').html(
//             '<button class="buttons" id="buttonchoice0"><span id="choice0"></span></button>' +
//             '<button class="buttons" id="buttonchoice1"><span id="choice1"></span></button>' +
//             '<button class="buttons" id="buttonchoice2"><span id="choice2"></span></button>' +
//             '<button class="buttons" id="buttonchoice3"><span id="choice3"></span></button>');




//         stopwatch.start();
//         stopwatch.count();
//         // rightChoice = rightChoiceArray[0];
//         // question = questionsArray[0];
//         // answers = choicesArray[0];

//         //looping through array of questions
//         // for (var i = 0; i < questionsArray.length; i++) {
//             $("#question").text(questionsArray[0]);

//     // }

//     //looping throught first list of possible answers
//     // for (var j = 0; j < optionList0.length; j++) {
//         $('#choice0').text(optionList0[0]);
//     // }
//     //looping through array of right choices
//     // for (var h = 0; h < rightChoice.length; h++) {
//         rightChoice = rightChoices[0]
//         // if (rightChoice = (rightChoiceArray[h])){
//         console.log(rightChoices[0]);
//         // }
// // }
//     //looping through second list of possible answers
//     // for (var k = 0; k < optionList1.length; k++) {
//         $('#choice1').text(optionList1[0]);
//     // }
//     //looping through 3rd list of possible answers
//     // for (var l = 0; l < optionList2.length; l++) {
//         $('#choice2').text(optionList2[0]);
//     // }
//     //looping though 4th list of possible answers
//     // for (var m = 0; m < optionList3.length; m++) {
//         $('#choice3').text(optionList3[0]);
//     // }
//     // $('#choice0').append(choicesArray.option[0]);
//         // $('#choice1').append(choicesArray[0,0]);
//         // $('#choice2').append(choicesArray[0,0,0]);
//         // $('#choice3').append(choicesArray[0,0,0,0]);

//         $('#progress').html("Question 1 of 6");


//         // console.log(rightChoice);

// function rightChoice() {
//     if (stopwatch.time === 0) {
//         stopwatch.stop();
//         //  ...run the stop function.
//         //  Alert the user that time is up.
//         $('#answer').text("Time's Up! " + rightChoice[0]);
//         setTimeout(function () {
//             nextQuestion(); 
//         }, 3000)




// }
// }


//         $('.buttons').one("click",function (choices) {
//             var text = $(this).text();
//             // var buttonchoice = ('#buttonchoice0, #buttonchoice1, #buttonchoice2, #buttonchoice3')
//             // $("#buttonchoice").val(text)
//             var userChoice = $("#buttonchoice").val(text);
//             // var rightChoice = choicesArray.rightChoice[h];


//             console.log(text);
//             // console.log(rightChoiceArray[0]);
//             // var rightChoice = rightChoices[0];

//             // var buttons = 4;
//             // console.log(this.value);
//             if (text === rightChoices[0]) {
//                 // console.log(rightChoices[0]);
//                 stopwatch.stop();
//                 // stopwatch.time = 5;

//                 $('#answer').html("Good Choice");

//             } else {

//                 // console.log("good choice");

//                 $('#answer').html("Sorry! it's: " + rightChoices[0]);
//                 jQuery(document).ready(function () {
//                     //hide a div after 4 seconds
//                     setTimeout("$('#answer').hide();", 4000);
//                     // console.log("im out");
//                     stopwatch.stop();




//                 });

//             }

//             setTimeout(function(){ 
//             nextQuestion(); 
//              }, 5000);
//         })



//     })

// })






