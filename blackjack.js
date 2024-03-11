let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0; 
let hidden;
let deck;
let cananother_c = true; 
let betAmount = 0;
let playerMoney = 1000; 

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
    document.getElementById('placeBet').addEventListener('click', placeBet);
    document.getElementById('restart').addEventListener('click', restartGame);
}

document.getElementById("betAmount").setAttribute("max", playerMoney);

function restartGame() {
    betAmount = 0;
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    cananother_c = true;
    resetCards();
    buildDeck(); 
    shuffleDeck(); 
    startGame();

let hiddenCardImg = document.createElement("img");
hiddenCardImg.id = "hidden";
hiddenCardImg.src = "C:/Users/tadys/OneDrive/Plocha/programko/html/Black-Jack/cards/BACK.png";
hiddenCardImg.style.height = "200px";
hiddenCardImg.style.width = "150px";
hiddenCardImg.style.margin = "1px";
hiddenCardImg.style.borderRadius = "5%";

let dealerCardsDiv = document.getElementById("dealer-cards");
dealerCardsDiv.insertBefore(hiddenCardImg, dealerCardsDiv.firstChild);

document.getElementById("results").innerText = "";
document.getElementById("dealer-sum").innerText = "";
document.getElementById("your-sum").innerText = "";
document.getElementById("betAmount").disabled = false;
document.getElementById("betAmount").value = "";
document.getElementById("placeBet").disabled = false;
}

function placeBet() {
    let inputBet = parseInt(document.getElementById('betAmount').value);
        if (!isNaN(inputBet) && inputBet > 0) {
betAmount = Math.min(inputBet, playerMoney);
document.getElementById('betAmount').value = betAmount;
document.getElementById('betAmount').disabled = true;
document.getElementById('placeBet').disabled = true;
    } else {alert("Prosím, zadejte platnou částku sázky.");
}}

function resetCards() {
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("your-cards").innerHTML = "";
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }}}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("another_c").addEventListener("click", another_c);
    document.getElementById("stop").addEventListener("click", stop);
}

function another_c() {
    if (!cananother_c) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        cananother_c = false;
    }}

function stop() {
dealerSum = reduceAce(dealerSum, dealerAceCount); 
yourSum = reduceAce(yourSum, yourAceCount);

cananother_c = false;
document.getElementById("hidden").src = "./cards/" + hidden + ".png";

let message = "";
let textColor = ""; 
let textSize = ""; 

if (yourSum > 21) {
message = "Prohrál jsi!";
textColor = "red";
textSize = "24px";
playerMoney -= betAmount; 
} else if (dealerSum > 21) {
message = "Vyhrál jsi!";
textColor = "gold";
textSize = "24px"; 
playerMoney += betAmount * 2; 
}
else if (yourSum == dealerSum) {
message = "Remíza!";
textColor = "blue";
textSize = "24px"; 
} else if (yourSum > dealerSum) {
message = "Vyhrál jsi!";
textColor = "gold";
textSize = "24px"; 
playerMoney += betAmount * 2; 
} else if (yourSum < dealerSum) {
message = "Prohrál jsi!";
textColor = "red";
textSize = "24px"; 
playerMoney -= betAmount;
}

document.getElementById("dealer-sum").innerText = dealerSum;
document.getElementById("your-sum").innerText = yourSum;
document.getElementById("results").innerText = message;
document.getElementById("playerMoney").innerText = playerMoney; 

let vysledkyElement = document.getElementById("results");
vysledkyElement.style.color = textColor;
vysledkyElement.style.fontSize = textSize;
}

function getValue(card) {

    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}