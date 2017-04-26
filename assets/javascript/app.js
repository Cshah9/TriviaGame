console.log ("app.js")

var $jumbo;
var $question;
var intervalId;
var time =30;
// var thirtySecs = 30000;

var question1 = {
	question:"What is your favorite color?",
	correctAnswer: "Blue",
	answers: [ "Blue", "Yellow", "Red", "Green"]
};

var question2 = {
	question:"Really, what is your favorite color?",
	correctAnswer: "Blue",
	answers: [ "Blue", "Yellow", "Red", "Green"]
};

var question3 = {
	question:"What color is something that has no color?",
	correctAnswer: "Clear",
	answers:[ "White", "Black", "Fuscia", "Clear"]
};
var currentQuestion = question1;
var qs = [question1, question2, question3];


$(document).ready(function(){


	console.log("Document Ready function");
	//setupGame();
	$("#start").click(startGame);
	$("#reset").click(resetGame);
	$(".option").click(checkAnswer);
//	$question = $(".question").detach()
});

function startGame() {
	console.log("start");
	//remove instruction jumbotron;
	$jumbo = $("#instructions").detach();
	$("#main").append(formatQuestion());
	$(".option").click(checkAnswer);
	$("#display").html(convertTime(time));
	intervalId = setInterval(countdown, 1000);

}

function countdown() {

	if(time>0) {
	// decrease by 1
    time--;

    // convert time
    var converted = convertTime(time);
    console.log(converted);

    // update display
    $("#display").html(converted);
	}
	else {
		//times up.
		timesUp();
	}


}
function timesUp(){
	// clear interval
	clearInterval(intervalId);
	//reset clock
	time = 30;
	//setup next question....
	resetGame();

}

function resetGame() {
	console.log("reset");
	// clear interval
	clearInterval(intervalId);
	//reset clock
	time = 30;
	//add instruction jumbotron;
	$(".question").detach()
	$("#main").append($jumbo);
}


function formatQuestion(){
	//string for question html:
	var qStr="";

	qStr+='  	<div class="panel panel-primary question">';
	qStr+='  			  <div class="panel-heading">';
	qStr+='  			    <h3 class="panel-title">Question : What is your favorite color?</h3>';
	qStr+='  			  </div>';
	qStr+='  			  <div class="panel-body">';	    
	qStr+='  				<h2 class="option">Blue</h2>';
	qStr+='  				<h2 class="option">Yellow</h2>';
	qStr+='  				<h2 class="option">Red</h2>';
	qStr+='  				<h2 class="option">Green</h2>';
	qStr+='  			</div>';
	qStr+='  		</div>';

	return qStr;
}


function checkAnswer(){
	console.log("check answer");
	console.log($(this).text().toLowerCase() );
	console.log(currentQuestion);
	console.log($(this).text().toLowerCase() == currentQuestion.correctAnswer.toLowerCase());

}

//from class activity
function convertTime(t) {

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
