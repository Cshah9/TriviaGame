console.log ("app.js")

var $jumbo;
var $question;
var intervalId;
var time =30;
var inProgress = false;
// var thirtySecs = 30000;

var question1 = {
	question:"What is your favorite color?",
	correctAnswer: ["Sorry, trick question!"],
	answers: [ "Blue", "Yellow", "Red", "Green"]
};

var question2 = {
	question:"Just kidding. Really, what is your favorite color?",
	correctAnswer: [ "Blue", "Yellow", "Red", "Green"],
	answers: [ "Blue", "Yellow", "Red", "Green"]
};

var question3 = {
	question:"What color is something that has no color?",
	correctAnswer: ["Clear", "None"],
	answers:[ "White", "Black", "Fuscia", "Clear", "None", "None of the above"]
};
var currentQuestion = question1;
var currentQuestionIndex=0;
var qs = [question1, question2, question3];
var correct = 0;
var wrong = 0;


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
	if(!inProgress){
		inProgress = true;
		$jumbo = $("#instructions").detach();
		$("#main").append(formatQuestion(qs[currentQuestionIndex]));
		$(".option").click(checkAnswer);
		$("#display").html(convertTime(time));
		intervalId = setInterval(countdown, 1000);
	}
}

function nextQuestion(isCorrect){
	console.log("nextQuestion : " + isCorrect + " : time - " + time);

	var aStr = "";
	
	if (time==30){
		//user ran out of time
		console.log("warning panel");
		aStr += '<div class="panel panel-warning message">';
		aStr += '  <div class="panel-heading">';
		aStr += '    <h3 class="panel-title">Out of time</h3>';
		aStr += '  </div>';
		aStr += '  <div class="panel-body">';
		aStr += "    That's a bit of shite, i'nit!";
		aStr += '  	 <br>';
		aStr += '  	 <br>';
		aStr += '  	 The correct answer is: ' + qs[currentQuestionIndex].correctAnswer[0];
		aStr += '  	 <br>';
		aStr += '  	 <br>';
		aStr += '    Preparing next question...';
		aStr += '  </div>';
		aStr += '</div>';
		wrong++;
	}
	else if (isCorrect) {
		//if the answer is correct
		console.log("success panel");
		aStr += '<div class="panel panel-success message">';
	  	aStr += '  <div class="panel-heading">';
		aStr += '    <h3 class="panel-title">Correct</h3>';
		aStr += '  </div>';
		aStr += '  <div class="panel-body">';
		aStr += '    Well done! Cheers, mate!';
		aStr += '  	 <br>';
		aStr += '  	 <br>';
		aStr += '    Preparing next question...';
		aStr += '  </div>';
		aStr += '</div>';
		correct ++;
	}
	else {
		// else answer is wrong
		console.log("danger panel");
		aStr += '<div class="panel panel-danger message">';
		aStr += '  <div class="panel-heading">';
		aStr += '    <h3 class="panel-title">Wrong</h3>';
		aStr += '  </div>';
		aStr += '  <div class="panel-body">';
		aStr += '    Bloody hell! Buggered that one!';
		aStr += '  	 <br>';
		aStr += '  	 <br>';
		aStr += '  	 The correct answer is: ' + qs[currentQuestionIndex].correctAnswer[0];
		aStr += '  	 <br>';
		aStr += '  	 <br>';
		aStr += '    Preparing next question...';
		aStr += '  </div>';
		aStr += '</div>';
		wrong++;
	}
	clearInterval(intervalId);
	//reset clock
	time = 30;
	$("#display").html(convertTime(time));
	//add instruction jumbotron;
	$(".question").detach()
	$("#main").append(aStr);
	//Check if out of questions:
	setTimeout(startNextRound, 3000);
}

function startNextRound(){
	console.log("startNextRound");

	$(".message").detach();
	if(currentQuestionIndex == qs.length -1) {

		resetGame();
		return;
	}
	else {
		currentQuestionIndex++;
	}
	$("#main").append(formatQuestion(qs[currentQuestionIndex]));
	$(".option").click(checkAnswer);
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
	nextQuestion(false);

}

function resetGame() {
	console.log("reset");
	// clear interval
	clearInterval(intervalId);
	inProgress = false;
	//reset clock
	time = 30;
	$("#display").html(convertTime(time));
	//add instruction jumbotron;
	$(".message").detach()
	$(".question").detach()
	$("#main").append($jumbo);
	$("#correct").text(correct);
	$("#wrong").text(wrong);
	currentQuestionIndex = 0;
	correct = 0;
	wrong = 0;
}


function formatQuestion(q){
	//string for question html:
	var qStr="";

	qStr+='  	<div class="panel panel-primary question">';
	qStr+='  			  <div class="panel-heading">';
	qStr+='  			    <h3 class="panel-title">Question : ' + q.question + '</h3>';
	qStr+='  			  </div>';
	qStr+='  			  <div class="panel-body">';	

	for (var i = q.answers.length - 1; i >= 0; i--) {
		
		qStr+='  				<h2 class="option">' + q.answers[i] + '</h2>';
	}

	qStr+='  			</div>';
	qStr+='  		</div>';

	return qStr;
}


function checkAnswer(){
	console.log("check answer");
	console.log($(this).text().toLowerCase() );
	console.log(currentQuestion);


	for (var i = qs[currentQuestionIndex].correctAnswer.length - 1; i >= 0; i--) {
		if (qs[currentQuestionIndex].correctAnswer[i].toLowerCase() === $(this).text().toLowerCase()) {
			console.log(true);
			nextQuestion(true);
			return;
		}
	}
	console.log(false);
	nextQuestion(false);

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
