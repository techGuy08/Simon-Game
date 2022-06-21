var buttonColours = ["red", "blue", "green", "yellow"],
  gamePattern = [],
  userClickedPattern = [],
  gameRunning = false,
  level = 0;
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4),
    randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut("fast")
    .fadeIn("fast");
  gamePattern.push(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
  if (gameRunning == true) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress($("#" + userChosenColour)[0]);
    checkAnswer(userClickedPattern.length - 1);
  }
});
function playSound(name) {
  sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
function animatePress(button) {
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 100);
}
function initGame() {
  if (gameRunning == false) {
    gameRunning = true;
    level = 0;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
}
$(document).on("keydown", initGame);
$("#level-title").on("click", initGame);
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      nextSequence();
      userClickedPattern = [];
    }
  } else {
    userClickedPattern = [];
    gamePattern = [];
    gameRunning = false;
    $("#level-title").text(
      "Game Over, Press Any Key or click here to Restart"
    );
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
}
