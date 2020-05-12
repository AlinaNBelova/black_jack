let deck = [];
let dealerContainer = document.querySelector("#dealer-hand");
let playerContainer = document.querySelector("#player-hand");
let dealerCardArray = [];
let playerCardArray = [];
let dealerSumScore = 0;
let playerSumScore = 0;
let points =0
let player ="player";
let dealer = "dealer";
let dealButton = document.querySelector('#deal-button');
let hitButton =document.querySelector('#hit-button');
let standButton =document.querySelector('#stand-button');
let dealerPoints= document.querySelector('#dealer-points');
let playerPoints = document.querySelector('#player-points');
let messages = document.querySelector('#messages');
let PlayAgainButton = document.createElement('button');
let Buttons =document.querySelector('.buttons');
Buttons.append(PlayAgainButton);
PlayAgainButton.innerText="Play Again";
PlayAgainButton.hidden =true
let DP =parseInt(dealerPoints.innerText)
let PP =parseInt(playerPoints.innerText)


function getDeck(){
    let suits = ["hearts", "diamonds", "spades", "clubs"];
    let cardValues = [ "ace","2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    suits.forEach(function(suit){
        cardValues.forEach(function(cardValue){
            cardObject = { "cardValue": cardValue, "suit":suit, "cardImage": 'images/' + cardValue + '_of_' + suit + '.png' };
            deck.push(cardObject);
        })
    })
};


function dealCards(hand){
    card = deck.pop()
    console.log(card)
    let newCard =document.createElement('img');
    newCard.setAttribute("src", card.cardImage)
    switch (hand) {
        case "player":
            playerContainer.append(newCard);
            playerCardArray.push(card);
            break;
    
        case "dealer":
            dealerContainer.append(newCard);
            dealerCardArray.push(card);
            break;
            
    };
    return playerCardArray
    return dealerCardArray
    return newCard

} 
function shuffleDeck(array) {
    let ctr =array.length, temp, index;
    while(ctr>0){
        index = Math.floor(Math.random()*ctr);
        ctr --;
        temp=array[ctr];
        array[ctr]=array[index];
        array[index] =temp;
    }
    return array
}

function calculateScore(hand){
    let sumScore=0;

    let CardArray;
    switch (hand) {
        case "dealer":
            CardArray=dealerCardArray;
            points=dealerPoints;
            sumScore=dealerSumScore;

            break;
    
        case "player":
                CardArray=playerCardArray;
                points=playerPoints;
                sumScore=playerSumScore;
            break;
    }

    let ScoreArray = CardArray.map(function(card){
        let score=card.cardValue
        if (score=="jack"|| score=="queen"|| score=="king") {
            score = 10;
            }
        if (score == "ace" && sumScore < 11) {
            score = 11;
            }
            if(score=="ace" && sumScore >=11){
                score =1;
            }
        else{score=parseInt(score)
                };
        sumScore+=score;
        console.log(sumScore);
        
        return sumScore;
        });

    points.textContent =sumScore;
    if (sumScore >21 ){
        messages.textContent=hand + " busts!!!"
        gameOver()
    }
    if(sumScore==21){
        messages.textContent= hand+' is a WINNER!! It is a  Black Jack'
        gameOver()
    } 
    return sumScore;  
}


function gameOver(){
    dealButton.hidden =true;
    hitButton.hidden=true;
    standButton.hidden=true;
    PlayAgainButton.hidden =false;

}

function CheckTheWinner(){
    let DP =parseInt(dealerPoints.innerText)
    let PP =parseInt(playerPoints.innerText )
    console.log(DP)
    console.log(PP)
    if (DP==PP){
        messages.textContent ="It is a push. No one wins "
    }
    else{
        if(DP>PP){
            messages.textContent ="Dealer wins. You loose "
        }else{
            messages.textContent ="You are WINNER"
        }
    }
    
}
function cleanTheTable() {
    dealButton.hidden =false;
    hitButton.hidden=false;
    standButton.hidden=false;
    PlayAgainButton.hidden =true;
    playerCardArray=[];
    dealerCardArray=[];
    messages.innerText ='';
    playerPoints.innerText='';
    dealerPoints.innerText='';
    dealerContainer.innerHTML='';
    playerContainer.innerHTML='';
}


dealButton.addEventListener('click',function(){
    getDeck();
    shuffleDeck(deck);
    dealCards(player);
    dealCards(player);
    calculateScore(player); 
    dealCards(dealer);
    dealCards(dealer);
    calculateScore(dealer);
    dealButton.hidden =true;
})

hitButton.addEventListener('click', function () {
    dealCards(player);
    calculateScore(player);
    
})

standButton.addEventListener('click', function(){
    let x= parseInt(dealerPoints.innerText);
    console.log("I run stand!")
    console.log(x)
    while (x <17){
        dealCards(dealer);
        console.log(calculateScore(dealer));
        x= calculateScore(dealer);
        console.log(x);
    };
    CheckTheWinner();
    standButton.hidden=true;
    gameOver();
});

PlayAgainButton.addEventListener('click', function(){
    cleanTheTable();
})