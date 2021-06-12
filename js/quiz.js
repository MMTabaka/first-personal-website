"use strict";

// assigns variables to buttons
var button_one = document.getElementById("reveal_one");
var button_two = document.getElementById("reveal_two");
var button_three = document.getElementById("reveal_three");

// adds buttons listeners
button_one.addEventListener("click", function() { reveal_answer("correct_one");} );
button_two.addEventListener("click", function() { reveal_answer("correct_two");} );
button_three.addEventListener("click", function() { reveal_answer("correct_three");} );

// functions that takes id of correct paragraph and changes its colour
function reveal_answer(id) {
  document.getElementById(id).style.backgroundColor = "green";
  document.getElementById(id).style.color = "white";
}