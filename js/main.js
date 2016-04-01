var generatedList = [];
var iterator = 0;
var strict = false;
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

    for( var i = 1; i <= 4; i++){
      $(panelIds[i]).css('background-color', notActiveColors[i]);
    }

  });

  $('.clickable-color').mousedown(function(){
    $(this).css('background-color', activeColors[$(this).attr('value')]);
    $(this).children("audio").trigger('play');
  });

  $('.clickable-color').mouseup(function(){
    $(this).css('background-color', notActiveColors[$(this).attr('value')]);
    $(this).children("audio").trigger('pause');
    $(this).children("audio").prop('currentTime', 0);
    checkSequence(this);
  });

  $('.clickable-color').mouseleave(function(){
    $(this).css('background-color', notActiveColors[$(this).attr('value')]);
  });

  $('#strict').on('click', function(){
    console.log('heyoh');
    strict = !strict;
    if(strict){
      $('#indicator').css('background-color', 'red');
      $(this).css('background-color', 'red');
    }else{
      $('#indicator').css('background-color', 'inherit');
      $(this).css('background-color', 'green');
    }

  });
});

function rand(){
  return Math.floor(Math.random() * 4 + 1);
}

function generateNext(generatedList){
  generatedList.push(rand());
}

function displaySequence(generatedList){
  $('.clickable-color').css('pointer-events', 'none');

  for(var i = 0; i < generatedList.length; i++ ){
    setTimeout(turnActive, (i+1) * 1000, i);
    setTimeout(turnInactive, (i+1) * 1000 + 600, i);
  }

  setTimeout(function(){
    $('.clickable-color').css('pointer-events', 'all');
  }, generatedList.length * 1000 + 600);
}

function turnActive(i){
  $(panelIds[generatedList[i]]).css('background-color', activeColors[generatedList[i]]);
  $(panelIds[generatedList[i]] + "> audio").trigger('play');
}

function turnInactive(i){
  $(panelIds[generatedList[i]]).css('background-color', notActiveColors[generatedList[i]]);
  $(panelIds[generatedList[i]] + "> audio").trigger('pause');
  $(panelIds[generatedList[i]] + "> audio").prop('currentTime', 0);
}

function checkSequence(clickId){
  if(iterator >= 19){
    alert("You won!");
    $('#reset').trigger('click');
  }

  if(($(clickId).attr('value') != generatedList[iterator]) && generatedList.length > iterator ){
    iterator = -1;
    displaySequence(generatedList);
    $('#score-field').css('color', 'red');

    setTimeout(function(){
      $('#score-field').css('color', 'white');
    }, 1000);

    if(strict){
      alert('You lost!');
      $('#reset').trigger('click');
    }


  }else if (generatedList.length - 1 <= iterator) {
    iterator = -1;
    generateNext(generatedList);
    displaySequence(generatedList);
    $('#score-field').html(generatedList.length);

  }else{

  }

  iterator++;

}
