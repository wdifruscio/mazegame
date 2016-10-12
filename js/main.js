//vars to determine level and state of game
currentLevel = 0;
gameFinished = false;
gameLost = false;
gameWon = false;
//this is to trigger if the enter key can be pressed or not(could exploit levels before)
enterKeyOn = true;
var MUSICKEY = 77;


$(document).ready(function(){
	levelCheck();
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
		window.removeEventListener("keydown", keydownHandler, false);
		if (gameLost) {
			$("#output").css('color','red');
			$("#output").typed({
			  strings: ["You lost, try again!"],
			  typeSpeed: 10,
			  backDelay:500,
			  backSpeed: -50
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
	$('.text-start').show();
      $("#text").typed({
        strings: ["Use the arrow keys to try and get to the end of the maze. Watch the time limit!", "Click on a difficulty to start."],
        typeSpeed: -30,
        backDelay:1000,
        backSpeed: -50
      });
	  $("#difficulty-1").click(function(){
		  count = 20;		  
	  });

	 $("#difficulty-2").click(function(){
		 count = 12;

	  });
        window.addEventListener("keydown", function(event) {
          event.preventDefault();
          if (enterKeyOn){
	          if (event.keyCode == 13) {
				// $('.text-start').hide();
	             currentLevel ++;
	             levelCheck();
	             enterKeyOn = false;
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

//Describe the game and press START (in stage field)
//When START -> play levelOne
//when levelOne -> finished
