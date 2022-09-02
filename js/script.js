'use strict';

let molod = document.getElementById('molod');
let play = document.getElementById('play');
let example = document.getElementById('example');
let expression = document.getElementById('expression');
let answer = document.getElementById('answ');

play.setAttribute('style', `height: ${document.querySelector('#play').offsetWidth}px`);
example.setAttribute('style', `width: ${document.querySelector('#play').offsetWidth/10.39375}px; height: ${document.querySelector('#play').offsetWidth/10.39375}px`);
expression.setAttribute('style', `width: ${document.querySelector('#play').offsetWidth*0.4}px; height: ${document.querySelector('#play').offsetWidth*0.06}px;`);
answer.setAttribute('style', `width: ${0.2*document.querySelector('#expression').offsetWidth}px; font-size: ${document.querySelector('#expression').offsetHeight/3.0}px`);
document.getElementById('exp').setAttribute('style', `font-size: ${document.querySelector('#expression').offsetHeight/2.15}px`);
molod.setAttribute('style', `height: ${document.querySelector('#play').offsetHeight*0.1}px; width: ${document.querySelector('#play').offsetHeight*0.4}px;`);




function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function getRandomExp() {
  let sign = getRandomInt(1, 5);
  if (sign == 1) {
    let first = getRandomInt(0, 101);
    let second = getRandomInt(0, 101);
    return [`${first} + ${second}`, `${first + second}`];
  }
  else if (sign == 2) {
    let first = getRandomInt(0, 101);
    let second = getRandomInt(0, 101);
    return [`${first} - ${second}`, `${first - second}`];
  }
  else if (sign == 3) {
    let first = getRandomInt(0, 101);
    let second = getRandomInt(0, 11);
    return [`${first} * ${second}`, `${first * second}`];
  }
  else if (sign == 4) {
    let first = getRandomInt(0, 101);
    let second = getRandomInt(0, 101);
    while ((first % second) || (second == 0)) {
      second = getRandomInt(0, 5001);
    }
    return [`${first} / ${second}`, `${first / second}`];
  }
}

function getMolod() {
  molod.style.display = 'flex';
  setTimeout(function() { molod.style.display = 'none'; }, 2000);

}


function move() {
  let chan = parseInt(getComputedStyle(play).height)/8;
  let tt = Number(getComputedStyle(example).top.slice(0,-2));
  let ll = Number(getComputedStyle(example).left.slice(0,-2));
  let ttt = tt;
  let lll = ll;
  let timer = setInterval(function() {
    if (tt < ttt - chan*0.995 && ll > lll + chan) clearInterval(timer);
    else if (tt < ttt - chan*0.995) example.style.left = `${ll + chan/60}px`;
    else example.style.top = `${tt - chan/60}px`;
    tt = Number(getComputedStyle(example).top.slice(0,-2));
    ll = Number(getComputedStyle(example).left.slice(0,-2));
  }, 1)
}

function changeText (text) {
  let space = " ";
  document.getElementById('exp').innerText = `${text} =\u00A0`;
}


let arr = getRandomExp();
changeText(arr[0]); 
let check = false;


let count = 0;
setInterval(() => {
  check = (answer.value == arr[1]);
  if (check) {
    arr = getRandomExp();
    changeText(arr[0]);
    answer.value = '';
    check = false;
    count++;
    if (count >=8) {
      example.setAttribute('style', `bottom: 0.2%; width: ${document.querySelector('#play').offsetHeight/10.39375}px; height: ${document.querySelector('#play').offsetHeight/10.39375}px`);
      count = 0;
      getMolod();
    }
    else move();
  }
}, 300);

