//vars to determine level and state of game
currentLevel = 0;
gameFinished = false;
gameLost = false;
gameWon = false;
//this is to trigger if the enter key can be pressed or not(could exploit levels before)
enterKeyOn = true;
hardmode = false;

$(document).ready(function(){
	$('#easy').addClass('active');
	levelCheck();
$('#stage').on('submit',$('form'),function(e){
	 e.preventDefault();
	 $.ajax({
		url:'https://sheetsu.com/apis/v1.0/1b75822d09d1/',
		type:'post',
		data:$('form').serialize(),
		success:function(){
			$('#stage').append('<div class="loading">');
			displayScores();
		}
    });
});
});
//start game with level check function

//level check function determines which level they are at in the game using counter within levelOne->levelFive functions.
//If a level is completed, the counter goes up which will trigger the next level.
function levelCheck(){
	//if the game isn't finished, determine which level player is on
	if (!gameFinished){
		switch (currentLevel){
			case 0:
			startGame();
			break;

			case 1:
			levelOne();
			break;

			case 2:
			levelTwo();
			break;

			case 3:
			levelThree();
			break;

			case 4:
			levelFour();
			break;

			case 5:
			levelFive();
			break;

			case 6:
			levelSix();
			break;

			case 7:
			levelSeven();
			break;

			case 8:
			levelEight();
			break;

			case 9:
			levelNine();
			break;
		}
	}
	//if game is finished, display this output
	else{
		//determine if game was lost or won. Either way, game is finished so remove the event handler. 
		// window.removeEventListener("keydown", keydownHandler, false);
		if (gameLost) {
			$("#output").css('color','red');
			$("#output").typed({
			  strings: ["You lost, try again!"],
			  typeSpeed: 10,
			  backDelay:500,
			  backSpeed: -50
			},function(){
				enterScore();
			});
		}
		if(gameWon){
			$("#output").css('color','green');
			$("#output").typed({
			  strings: ["You beat my maze game. Thanks for playing ^^"],
			  typeSpeed: 10,
			  backDelay:500,
			  backSpeed: -50
			});
		}
	}
}
//start game is level 0. 
function startGame(){
	var ENTER = 13;
	var LEFT = 37;
	var RIGHT = 39;
	var mode = 0;
      $(".start-text").typed({
        strings: ["Please Select Difficulty"],
        typeSpeed: -20,
        backDelay:1000,
        backSpeed: -50
      });
        window.addEventListener("keydown", function(event) {
        //   event.preventDefault();
          if (enterKeyOn){
			  switch(event.keyCode){
				  
				 case ENTER:
				 $("#stage").empty();
	             currentLevel ++;
	             levelCheck();
	             enterKeyOn = false;
				 break;

				 case LEFT:
				 if(mode === 1){
					 mode--;
				 }
				 break;

				 case RIGHT:
				 if(mode === 0){
					 mode++;
				 }
				 break;
				 		 				  
			  }
			  if (mode === 0){
				  	$('button').removeClass('active');
					$('#easy').addClass('active');
					hardmode = false;
			  }
			  if (mode === 1){
				  	$('button').removeClass('active');
					$('#hard').addClass('active');
					hardmode = true;
			  }
		  }
      });
}
//next level function is an interim state between levels, after a level is finished, this will display a message and tell the user to hit enter. 
//on enter it will add one to the current level to advance stages. 
	function nextLevel(){
			if (enterKeyOn == true) {
	      $("#output").typed({
	        strings: ["You finished this level. Press ENTER to continue."],
	        typeSpeed: -1,
	        backDelay:500,
	        backSpeed: -50
	      });
	      if (event.keyCode == 13) {
	         currentLevel++;
	         levelCheck();
	         enterKeyOn = false;
	      }
      }
}
function enterScore() {
	$('#time').fadeOut();
	$('#stage').append('<div class="loading">');
	var form = $('<form enctype="application/json">');
	var nameInput = $('<input name="Name" value="" placeholder="Enter Your Name" maxlength="15">');
	var scoreDisplay = $("<p class='nomargin'>").text(`You reached level: ${currentLevel}`);
	var scoreInput = $(`<input class="gameScore" name="Score" placeholder="Your Current Level">`).val(currentLevel);
	var formSubmit = $('<button type="submit">SUBMIT</button>');
	$(form).append(scoreDisplay,scoreInput,nameInput,formSubmit);
	console.log('working');
	var scoreList = $('ul');
	var individualScore = $('li');
		$.ajax({
		url: "https://sheetsu.com/apis/v1.0/1b75822d09d1",
		method: "GET",
		dataType: "JSON",
	}).then((res)=>{
		$(".loading").hide();
		var title = $('<h2>').text("High Scores");
		var scoreTable = $('<ol>');
		console.log(res);
		var sorted = res.sort(function(a,b){
			return b.Score - a.Score;
		});
		var count = 0;
		sorted.forEach( (i)=>{
			if (count < 5){
			var score = $('<li>').text(i['Name']+" - "+"Level: " + i['Score']);
			console.log(i);
			$(scoreTable).append(score);
			count++;
			}						
		});
		$("#stage").append(title,scoreTable,form);	
	});
}

function displayScores(){
	$('#stage').empty();
	$.ajax({
		url: "https://sheetsu.com/apis/v1.0/1b75822d09d1",
		method: "GET",
		dataType: "JSON",
	}).then((res)=>{
		$('.loading').hide();
		var title = $('<h2>').text("High Scores");
		var scoreTable = $('<ol>');
		console.log(res);
		var sorted = res.sort(function(a,b){
			return b.Score - a.Score;
		});
		var count = 0;
		sorted.forEach( (i)=>{
			if (count < 5){
			var score = $('<li>').text(i['Name']+" - "+"Level: " + i['Score']);
			console.log(i);
			$(scoreTable).append(score);
			count++;
			}						
		});
		$("#stage").append(title,scoreTable);	
	});
}

