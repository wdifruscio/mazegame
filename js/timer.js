var count=20;
var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
function timer()
{
  count=count-1;
  if (count < 0)
  {
     timerUp = true;
     endGame();
     clearInterval(counter);
     return;
  }
 document.getElementById("time").innerHTML=count + "s"; // watch for spelling
}