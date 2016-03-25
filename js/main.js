var generatedList = [];
var notActiveColors = {1: '#823333', 2: '#065D06' , 3: '#24245F' , 4: '#777719' };

$(document).ready(function(){
  console.log('click');

  $('#game-blue').on('click', function(){

  });

});

function rand(){
  return Math.floor(Math.random() * 4 + 1);
}

function generateNext(generatedList){
  generatedList.push(rand);

  for(var i = 0; i < generatedList.length; i++){

  }
}
