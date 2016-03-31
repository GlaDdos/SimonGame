var generatedList = [];
var iterator = 0;
var notActiveColors = {1: '#823333', 2: '#065D06' , 3: '#24245F' , 4: '#777719' };
var activeColors = {1: 'red', 2: 'green', 3: 'blue', 4: 'yellow'};

var panelIds = {1: '#game-red', 2: '#game-green', 3: "#game-blue", 4: '#game-yellow'};

$(document).ready(function(){
  $('.clickable-color').css('pointer-events', 'none');

  $('.element-middle').on('click', '#start', function(){
    generateNext(generatedList);
    displaySequence(generatedList);
    $('.element-middle > .label').html('Reset');
    $(this).attr('id', 'reset');
  });

  $('.element-middle').on('click','#reset', function(){
    console.log('rteset pressed');
    $('.clickable-color').css('pointer-events', 'none');
    $('#score-field').html('1');
    $('.element-middle > .label').html('Start');
    $(this).attr('id', 'start');
    generatedList = [];
    iterator = 0;
  });

  $('.clickable-color').mousedown(function(){
    $(this).css('background-color', activeColors[$(this).attr('value')]);
  });

  $('.clickable-color').mouseup(function(){
    $(this).css('background-color', notActiveColors[$(this).attr('value')]);
    checkSequence(this);
  });

  $('.clickable-color').mouseleave(function(){
    $(this).css('background-color', notActiveColors[$(this).attr('value')]);
  });


});

function rand(){
  return Math.floor(Math.random() * 4 + 1);
}

function generateNext(generatedList){
  generatedList.push(rand());
}

function displaySequence(generatedList){
  $('*').css('pointer-events', 'none');

  for(var i = 0; i < generatedList.length; i++ ){
    setTimeout(turnActive, (i+1) * 1000, i);
    setTimeout(turnInactive, (i+1) * 1000 + 600, i);
  }

  setTimeout(function(){
    $('*').css('pointer-events', 'all');
  }, generatedList.length * 1000 + 600);
}

function turnActive(i){
  $(panelIds[generatedList[i]]).css('background-color', activeColors[generatedList[i]]);
}

function turnInactive(i){
  $(panelIds[generatedList[i]]).css('background-color', notActiveColors[generatedList[i]]);
}

function checkSequence(clickId){
  if(($(clickId).attr('value') != generatedList[iterator]) && generatedList.length > iterator ){
    console.log('first if');
    iterator = -1;
    displaySequence(generatedList);
    $('#score-field').css('color', 'red');

    setTimeout(function(){
      $('#score-field').css('color', 'white');
    }, 1000);

  }else if (generatedList.length - 1 <= iterator) {
    console.log('end of iterations');
    iterator = -1;
    generateNext(generatedList);
    displaySequence(generatedList);
    $('#score-field').html(generatedList.length);

  }else{
    console.log('ok');
  }
  iterator++;
  console.log(iterator);
}
