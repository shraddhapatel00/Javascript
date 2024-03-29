/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,gamePlaying,lastDice;
init();


document.querySelector('.dice1').style.display= 'none';
document.querySelector('.dice2').style.display= 'none';

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        var dice1 = Math.floor(Math.random() * 6) + 1 ;
        var dice2 = Math.floor(Math.random() * 6) + 1 ;
        var dice1DOM= document.querySelector('.dice1');
         dice1DOM.style.display ='block'; 
         dice1DOM.src= 'dice-' +dice1+'.png';
         var dice2DOM= document.querySelector('.dice2');
         dice2DOM.style.display ='block'; 
         dice2DOM.src= 'dice-' +dice2+'.png';
         if(dice1 === 1|| dice2 ===1){ 
            document.querySelector('#name-' + activePlayer).textContent = 'Loser!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.dice1').style.display= 'none';
            document.querySelector('.dice2').style.display= 'none';
            gamePlaying = false;
            
                     }else{
                      
                            roundScore += dice1 +dice2;
                            document.querySelector('#current-'+activePlayer).textContent= roundScore;
                        }
         
    }
   
}
);

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[activePlayer]+= roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        if(scores[activePlayer] >= document.getElementById("wscore").value && document.getElementById("wscore").value> 0 ){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.dice').style.display= 'none';
            gamePlaying = false;
           }
           else{
          
            nextPlayer();
           }
    }
   
}
);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
     document.querySelector('.dice').style.display= 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    scores = [0,0];
    roundScore = 0; 
    activePlayer = 0;
    lastDice=0;
gamePlaying =true;
document.getElementById("wscore").textContent = 0;
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.querySelector('#name-0').textContent = 'Player 1';
document.querySelector('#name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}