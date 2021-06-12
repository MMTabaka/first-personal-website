"use strict";

// canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// default colours
var colour_first = "#f0f9e8";
var colour_second = "#7bccc4";
var colour_third = "#0868ac";

// button variables
var pie = document.getElementById("button_pie");
var bar = document.getElementById("button_bar");
var line = document.getElementById("button_line");
var colour = document.getElementById("button_colour");

// button listeners
pie.addEventListener("click", function () { drawPie(); });
bar.addEventListener("click", function () { drawBar(); });
line.addEventListener("click", function () { drawLine(); });
colour.addEventListener("click", function () { changeColour(); });

// data
var whatsapp = [5, 100, 30, 45, 5, 12, 56];
var messenger = [71, 9, 67, 115, 9, 10, 22];
var instagram = [80, 34, 111, 12, 72, 73, 78];
var date = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// loads pie chart when the page starts
var diagram_check = 0;
var colour_scale = 0;
drawPie();

// calculates sum of an array
function arr_sum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

// changes scale of colours
function changeColour() {
  if (colour_scale == 0) {
    colour_first = "#601A4A";
    colour_second = "#EE442F";
    colour_third = "#63ACBE";
    colour_scale = 1;
  } else if (colour_scale == 1) {
    colour_first = "#8E8CC5";
    colour_second = "#E2DAD1";
    colour_third = "#C9BD9E";
    colour_scale = 2;
  } else {
    colour_first = "#dbf2c7";
    colour_second = "#7bccc4";
    colour_third = "#0868ac";
    colour_scale = 0;
  }
  displayDiagram();
}

function start() {
  // draws line that splits the canvas in two
  context.lineWidth = "1";
  context.strokeStyle = "black";
  context.beginPath();
    context.moveTo(0, 1000);
    context.lineTo(999, 1000);
  context.stroke();

  // writes names in assigned colour
  context.font = "40px Comic Sans MS";
  context.textAllign = "center";

  context.fillStyle = colour_first;
  context.fillText("whatsapp", 80, 1085);
  context.fillStyle = colour_second;
  context.fillText("Messenger", 390, 1085);
  context.fillStyle = colour_third;
  context.fillText("Instagram", 700, 1085);
}

// draw lines with time indicators
function lines() {
  context.lineWidth = "1";
  context.strokeStyle = "gray";

  context.beginPath();
    context.moveTo(0, 500);
    context.lineTo(999, 500);
    context.moveTo(0, 250);
    context.lineTo(999, 250);
    context.moveTo(0, 750);
    context.lineTo(999, 750);
  context.stroke();

  context.font = "40px Comic Sans MS";
  context.fillStyle = "black";
  context.textAllign = "center";

  context.fillText("30min", 3, 745);
  context.fillText("1h", 15, 495);
  context.fillText("1h 30min", 3, 245);
}

// displays diagram after changing colour
function displayDiagram() {
  if (diagram_check == 0) { drawPie(); }
  else if (diagram_check == 1) { drawBar(); }
  else { drawLine(); }
}

// clears canvas
function clearCanvas() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

// CHARTS

// draws pie chart with percent indicators
function drawPie() {
  clearCanvas();
  start();

  let sum = arr_sum(whatsapp) + arr_sum(messenger) + arr_sum(instagram);
  let x = Math.PI * 2 * (arr_sum(whatsapp) / sum);
  let y = Math.PI * 2 * (arr_sum(messenger) / sum);
  let z = Math.PI * 2 * (arr_sum(instagram) / sum);

  context.lineWidth = "1";
  context.font = "60px Comic Sans MS";
  context.fillStyle = "black";
  context.textAllign = "center";

  let percent_instagram = Math.round(arr_sum(instagram) * 100 / sum);
  context.fillText(percent_instagram + "%", 300, 170);
  let percent_whatsapp = Math.round(arr_sum(whatsapp) * 100 / sum);
  context.fillText(percent_whatsapp + "%", 700, 800);
  let percentage = 100 - percent_instagram - percent_whatsapp;
  context.fillText(percentage + "%", 100, 700);

  context.beginPath();
    context.strokeStyle = colour_first;
    context.fillStyle = colour_first;
    context.arc(500, 500, 300, 0, x, false);
    context.lineTo(500, 500);
    context.fill();
  context.stroke();

  context.beginPath();
    context.strokeStyle = colour_second;
    context.fillStyle = colour_second;
    context.arc(500, 500, 300, x, x + y, false);
    context.lineTo(500, 500);
    context.fill();
  context.stroke();

  context.beginPath();
    context.strokeStyle = colour_third;
    context.fillStyle = colour_third;
    context.arc(500, 500, 300, x + y, 0, false);
    context.lineTo(500, 500);
    context.fill();
  context.stroke();

  diagram_check = 0;
}

// draws bar chart
function drawBar() {
  clearCanvas();
  start();
  lines();

  let x = 120;
  let y = 999;
  let w = 20;
  let h = 70;
  let space = 70;

  context.lineWidth = "1";
  context.font = "30px Comic Sans MS";
  context.fillStyle = "black";
  context.textAllign = "center";

  for (let i = 0; i < 7; i++) {
    h = whatsapp[i] * 1000 / 120;
    context.strokeStyle = colour_first;
    context.fillStyle = colour_first;
    context.beginPath();
      context.rect(x, y - h, w, h);
      context.fill();
    context.stroke();

    h = messenger[i] * 1000 / 120;
    context.strokeStyle = colour_second;
    context.fillStyle = colour_second;
    context.beginPath();
      context.rect(x + w, y - h, w, h);
      context.fill();
    context.stroke();
    context.fillStyle = "black";
    context.fillText(date[i], x + 7, 1030);

    h = instagram[i] * 1000 / 120;
    context.strokeStyle = colour_third;
    context.fillStyle = colour_third;
    context.beginPath();
      context.rect(x + 2 * w, y - h, w, h);
      context.fill();
    context.stroke();
    x += 3 * w + space;
  }

  diagram_check = 1;
}

function drawLine() {
  clearCanvas();
  start();
  lines();

  let x = 120; 
  let y = 999;
  let h;
  let space = 130;

  context.lineWidth = "6";
  context.font = "30px Comic Sans MS";
  context.fillStyle = "black";
  context.textAllign = "center";

  for (let i = 0; i < 6; i++) {

    h = whatsapp[i] * 1000 / 120;
    context.strokeStyle = colour_first;
    context.fillStyle = colour_first;
    context.beginPath();
      context.moveTo(x, y - h);
      context.fillStyle = "black";
      context.fillText(date[i], x - 28, 1030);
      x += space;
      h = whatsapp[i + 1] * 1000 / 120;
      context.fillText(date[i + 1], x - 28, 1030);
      context.lineTo(x, y - h);
    context.stroke();

    h = messenger[i] * 1000 / 120;
    x -= space;
    context.strokeStyle = colour_second;
    context.fillStyle = colour_second;
    context.beginPath();
      context.moveTo(x, y - h);
      x += space;
      h = messenger[i + 1] * 1000 / 120;
      context.lineTo(x, y - h);
    context.stroke();

    h = instagram[i] * 1000 / 120;
    x -= space;
    context.strokeStyle = colour_third;
    context.fillStyle = colour_third;
    context.beginPath();
      context.moveTo(x, y - h);
      x += space;
      h = instagram[i + 1] * 1000 / 120;
      context.lineTo(x, y - h);
    context.stroke();
  }

  diagram_check = 2;
}