function levelFive(){
	//this boolean determines if the counter should run, is set false at the end of levels.
		document.getElementById("bgMusic").src='./music/Adventure.mp3';
counting = true;
countdown(); // call the timer
	//timer
	function countdown(){
		var count=25;
		if (counting == true){
			var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
			function timer()
			{
			  count=count-1;
			  if (count < 0 && gameOver == false)
			  {
			     timerUp = true;
			     clearInterval(counter);
			     endGame();
			  }
			  if (count < 0 && gameOver== true){
			  	 timerUp = true;
			  	 clearInterval(counter);
			  }
			  if (gameOver){
			  	 clearInterval(counter);
			  }
			 document.getElementById("time").innerHTML=count + "s"; // watch for spelling
			}
		}
	}
	//stage and output
	var stage = document.querySelector("#stage");
	var output = document.querySelector("#output");
	//keyinputs
	var UP = 38;
	var DOWN = 40;
	var RIGHT = 39;
	var LEFT = 37;
	//map render (use bg images)
	var map =
	[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,1,5,0,0,0,0,0,0,1,1],
	[1,0,0,1,1,0,1,1,1,1,1,1,1,1,0,0,1],
	[1,1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1],
	[1,1,0,1,0,1,0,0,1,1,1,1,1,0,1,0,1],
	[1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1],
	[1,0,1,0,0,1,1,1,0,1,1,1,0,1,1,0,1],
	[1,0,1,1,1,1,0,0,0,1,0,0,0,0,0,1,1],
	[1,0,0,1,8,1,0,1,0,0,0,1,0,1,0,7,1],
	[1,1,3,1,0,1,0,0,1,1,1,1,0,1,0,1,1],
	[1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,1],
	[1,0,1,1,0,0,0,0,0,1,0,1,1,1,0,1,1],
	[1,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];
	//map of game objects (use sprite img)
	var gameObjects =
	[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];

	//coordinates for player
	var playerRow;
	var playerColumn;

	//map coordinates
	var ROWS = map.length; 
	var COLUMNS = map[0].length;

	//tiles
	var FLOOR = 0;
	var WALL = 1;
	var KEY = 2;
	var LOCK = 3;
	var ENTER = 4;
	var EXIT =5;
	var PLAYER = 6;
	var PORTAL_BLUE = 7;
	var PORTAL_BLUE_EXIT = 8;
	var PORTAL_PINK = 9;
	var PORTAL_PINK_EXIT = 10;

	//size of CELL
	var SIZE =32;

	// game variables
	var gameMessage = "Use the arrow keys to find the exit.";
	var keyFound = false;
	var lockedBlockOne = true;
	var timerUp = false;
	var gameOver = false;

	//level object (want to write an object to store level data dynamically? .. :S)


	//keydown listener
	window.addEventListener("keydown", keydownHandler, false);

	//get position -- loop through the arrays to find position and make it equal to row/column
	for (var row = 0; row < ROWS; row++) {
		for (var column = 0; column < COLUMNS; column++){
			if(gameObjects[row][column] === PLAYER){
				playerRow = row;
				playerColumn = column;
			}
		}
	}
	//move function
	function keydownHandler(event){
		//after the player position is determined with the above for loop, player position can be moved by adding or subracting rows/columns
		//these functions perform the movement, but after the check is done to see if it is a valid move.
		function moveUp(){
			gameObjects[playerRow][playerColumn] = 0;
			playerRow--;
			gameObjects[playerRow][playerColumn] = PLAYER;
		}
		function moveDown(){
			gameObjects[playerRow][playerColumn] = 0;
			playerRow++;
			gameObjects[playerRow][playerColumn] = PLAYER;
		}
		function moveLeft(){
			gameObjects[playerRow][playerColumn] = 0;
			playerColumn--;
			gameObjects[playerRow][playerColumn] = PLAYER;
		}
		function moveRight(){
			gameObjects[playerRow][playerColumn] = 0;
			playerColumn++;
			gameObjects[playerRow][playerColumn] = PLAYER;
		}
		switch(event.keyCode){
			case UP:
			//thing above is equal to the map array -1 of the players position
			//this must be floor, key, or lock for something to happen.
			var thingAbove = map[playerRow - 1][playerColumn];
				switch (thingAbove){
					case FLOOR:
					moveUp();
					break;

					case KEY:
					moveUp();
					break;

					case LOCK:
					if(keyFound == true){
						moveUp();
					}
					break;

					case EXIT:
					moveUp();
					break;

					case PORTAL_BLUE:
					moveUp();
					break;

					case PORTAL_BLUE_EXIT:
					moveUp();
					break;

					case PORTAL_PINK:
					moveUp();
					break;

					case PORTAL_PINK_EXIT:
					moveUp();
					break;
				}
			break;

			case DOWN:
			var thingBelow = map[playerRow + 1][playerColumn];
				switch (thingBelow){
					case FLOOR:
					moveDown();
					break;

					case KEY:
					moveDown();
					break;

					case LOCK:
					if(keyFound == true){
						moveDown();
					}
					break;

					case EXIT:
					moveDown();
					break;

					case PORTAL_BLUE:
					moveDown();
					break;

					case PORTAL_BLUE_EXIT:
					moveDown();
					break;

					case PORTAL_PINK:
					moveDown();
					break;

					case PORTAL_PINK_EXIT:
					moveDown();
					break;
				}
			break;

			case LEFT:
			var thingLeft = map[playerRow][playerColumn - 1];
				switch (thingLeft){
					case FLOOR:
					moveLeft();
					break;

					case KEY:
					moveLeft();
					break;

					case LOCK:
					if(keyFound == true){
						moveLeft();
					}
					break;

					case EXIT:
					moveLeft();
					break;

					case PORTAL_BLUE:
					moveLeft();
					break;

					case PORTAL_BLUE_EXIT:
					moveLeft();
					break;

					case PORTAL_PINK:
					moveLeft();
					break;

					case PORTAL_PINK_EXIT:
					moveLeft();
					break;
				}
			break;

			case RIGHT:
			var thingRight = map[playerRow][playerColumn + 1]
				switch (thingRight){
					case FLOOR:
					moveRight();
					break;

					case KEY:
					moveRight();
					break;

					case LOCK:
					if(keyFound == true){
						moveRight();
					}
					break;

					case EXIT:
					moveRight();
					break;

					case PORTAL_BLUE:
					moveRight();
					break;

					case PORTAL_BLUE_EXIT:
					moveRight();
					break;

					case PORTAL_PINK:
					moveRight();
					break;

					case PORTAL_PINK_EXIT:
					moveRight();
					break;
				}
			break;
		}
		//switch statement for finding stuff
			switch(map[playerRow][playerColumn]){
				case EXIT:
				endGame();
				break;
			
				case KEY:
				console.log("gotkey");
				getKey();
				break;

				case LOCK:
				console.log("unlock");
				unlock();
				break;

				case FLOOR:
				output.style.color = "white";
				gameMessage = "Use the arrow keys to find the exit.";
				break;

				case PORTAL_BLUE:
				teleportBlue();
				gameMessage = "You have stepped into the portal!";
				break;

				case PORTAL_BLUE_EXIT:
				gameMessage = "You have stepped into the portal!";
				revertBlue();				
				break;

				case PORTAL_PINK:
				gameMessage = "You have stepped into the portal!";
				teleportPink();				
				break;

				case PORTAL_PINK_EXIT:
				gameMessage = "You have stepped into the portal!";
				revertPink();
				break;
			}
		render();
	}
	//render function
	function render(){
		//clear stage from prev turn
		if(stage.hasChildNodes()){
			for (var i = 0; i < ROWS * COLUMNS ; i++) {
				stage.removeChild(stage.firstChild);
			}
		}
		//loop through map
		for (var row = 0; row < ROWS; row++) {
			for (var column = 0; column < COLUMNS; column++){
				//create an element called cell
				var cell = document.createElement("div");
				cell.setAttribute("class", "cell");
				//append the cells to stage
				stage.appendChild(cell);
				//create sprites as images
				var sprite = document.createElement("img");
				sprite.setAttribute("class", "sprite");
				//below switch finds out what type of cell determined by the number in the map.
				//styling is based on this.
					switch(map[row][column])
					{
						case FLOOR:
							cell.style.background = "url(./images/floor.png)no-repeat center";						
							break;

						case WALL:
							cell.style.background = "url(./images/wall.png)no-repeat center";
							break;

						case LOCK:
							cell.style.background = "url(./images/floor.png)no-repeat center";
							if(lockedBlockOne = true){
							cell.appendChild(sprite);
							sprite.src = "./images/lock.png";
						}
							break;

						case KEY:
							cell.style.background = "url(./images/floor.png)no-repeat center";
							if(keyFound == false){
							cell.appendChild(sprite);
							sprite.src = "./images/key.png";
						}
							break;

						case EXIT:
							cell.style.background = "url(./images/stairs-down.png)no-repeat center";
							break;

						case PORTAL_BLUE:
							cell.style.background = "url(./images/floor.png)no-repeat center";
							cell.appendChild(sprite);
							sprite.src = "./images/blue_portal.png";
							break;

						case PORTAL_BLUE_EXIT:
							cell.style.background = "url(./images/floor.png)no-repeat center";
							cell.appendChild(sprite);
							sprite.src = "./images/blue_portal.png";
							break;

						case PORTAL_PINK:
							cell.style.background = "url(./images/floor.png)no-repeat center";
							cell.appendChild(sprite);
							sprite.src = "./images/pink_portal.png";
							break;

						case PORTAL_PINK_EXIT:
							cell.style.background = "url(./images/floor.png)no-repeat center";
							cell.appendChild(sprite);
							sprite.src = "./images/pink_portal.png";
							break;
					}
					switch(gameObjects[row][column])
					{
						case PLAYER:
							cell.appendChild(sprite);
							sprite.src = "./images/char.png";
							sprite.style.zIndex = "100";
							break;
					}					
				cell.style.top = row * SIZE + "px";
				cell.style.left = column * SIZE + "px";
			}
		}
		output.innerHTML = gameMessage;
	}
	//game functions
	function getKey(){
			var keySound = new Audio('./music/1_coins.ogg');
			keySound.play();
			output.style.color = "green";
			gameMessage = "You picked up a key";
			keyFound = true;
			map[6][12] = 0;	
	}
	function unlock(){
		var unlockSound = new Audio('./music/chest creak.wav');
		unlockSound.play();
		output.style.color = "green";
		gameMessage = "You Unlocked The Door!";
		lockedBlockOne = false;
		map[9][2] = 0;
	}
	function teleportBlue(){
		gameObjects[playerRow][playerColumn] = 0;
		playerRow=8;
		playerColumn=4;
		gameObjects[playerRow][playerColumn] = PLAYER;
	}
	function teleportPink(){
		gameObjects[playerRow][playerColumn] = 0;
		playerRow=1;
		playerColumn=8;
		gameObjects[playerRow][playerColumn] = PLAYER;
	}
	function revertBlue(){
		gameObjects[playerRow][playerColumn] = 0;
		playerRow=8;
		playerColumn=15;
		gameObjects[playerRow][playerColumn] = PLAYER;		
	}
	function revertPink(){
		gameObjects[playerRow][playerColumn] = 0;
		playerRow=12;
		playerColumn=12;
		gameObjects[playerRow][playerColumn] = PLAYER;		
	}
	function endGame(){
		if(map[playerRow][playerColumn] === EXIT){
			output.style.color = "green";
			gameMessage = "You found the exit! =]";
			document.getElementById("bgMusic").src='./music/winner.ogg';
			gameOver = true;
			counting= false;
			enterKeyOn = true;
			nextLevel();
		}
		if(timerUp == true && gameOver == false){
			output.style.color = "red";
			gameMessage = "TIMES UP!";
			render();
			document.getElementById("bgMusic").src='./music/gameover.ogg';
			gameOver = true;
			gameLost = true;
			counting= false;
		}
		window.removeEventListener("keydown", keydownHandler, false);
	}
	render();
}