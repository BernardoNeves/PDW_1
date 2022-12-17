var runGame = function () {
  document.getElementById("theTitle").style.display = "none";
  document.getElementById("startGame").style.display = "none";
  document.getElementById("creditsButton").style.display = "none";
  document.getElementById("credits").style.display = "none";
  document.getElementById("main").style.display = "block";
  window.location.replace("/game.html");
};

var showCredits = function () {
  document.getElementById("theTitle").style.display = "none";
  document.getElementById("startGame").style.display = "none";
  document.getElementById("creditsButton").style.display = "none";
  document.getElementById("credits").style.display = "block";
  document.getElementById("backButton").style.display = "block";
};

var goBack = function () {
  document.getElementById("theTitle").style.display = "block";
  document.getElementById("startGame").style.display = "block";
  document.getElementById("creditsButton").style.display = "block";
  document.getElementById("credits").style.display = "none";
  document.getElementById("backButton").style.display = "none";
};
