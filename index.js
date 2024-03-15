import inquirer from 'inquirer'; 


const playGame = async () => {
    let cardSuits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    let cardValues = [2, 3, 4, 5,6, 7, 8, 9, "J", "Q", "K", "A"];
    let deck = [];
    let playerCard = [];
    let dealerCard = [];
    let play = true;
    let firstTime = true;
    let chips = 0;

    while(play) {
        if(firstTime == true) {
        let {chips: totalChips} = await inquirer.prompt([{
            type: 'input',
            name: 'chips',
            message: 'How much money you have want to play',
            validate: (input) => !isNaN(parseInt(input, 10)) || 'How much money you have want to play' //ask the user to put their all money they want to play
        }]);
        chips = totalChips;
        firstTime = false; // ask the user to put their all money they want to play just for the first time
        }
        

        const { bet } = await inquirer.prompt([{
            type: 'input',
            name: 'bet',
            message: 'Please put your bet',
            validate: (input) => !isNaN(parseInt(input, 10)) || 'Please put your bet' //ask the user to put their bet then parse from string to integers
        }]);


        getDeck();
        shuffle(deck);

        playerCard = dealCards(deck, 2);
        dealerCard = dealCards(deck, 2); 

        displayPlayerHand(playerCard);
        displayDealerHand(dealerCard);

        if (getScore(playerCard) === getScore(dealerCard)) {
            console.log("You tie!!!, you got nothing");
          } else if (getScore(playerCard) > getScore(dealerCard)) {
            console.log(`You win!!!, received ${bet} chips`);
            chips += bet * 2;  
          } else {
            console.log(`You lose!!!, you lose ${bet} chips`);
            chips -= bet
            if(chips < 0){
                chips =0;
                console.log(`You lose all your money!!`);
            }; 
          }
      
          console.log(`You currently have ${chips} chips`);
      
          const playAgain = await inquirer.prompt([{
            name: 'Yes',
            type: 'confirm',
            message: 'Wanna play more (Yes/No)?'
          }]);
          
          if (!playAgain.Yes) {
            console.log(`You got total ${chips} chips`);
            break;
          }  
    }

function getDeck(){
    deck = [];
    for(let suitCount =0; suitCount < cardSuits.length; suitCount++){
        for(let cardValueCount =0; cardValueCount < cardValues.length; cardValueCount++){
            deck.push({suit: cardSuits[suitCount], value: cardValues[cardValueCount]});
        }
    }
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0;i--) {
            const random = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[random]] = [deck[random], deck[i]];
    }
    return deck;
}

function getValue(card) {
    if(card.value === "A") {
        return 1;
    }
    else if (card.value in ["J", "Q", "K"]){
        return 0;
    }
    else return card.value;
}

function  getScore(cards) {
    let score = 0;
    cards.forEach( card => {
        score += getValue(card);
    })
    return score % 10;
}

function dealCards(deck, numCards) {
    const hand = [];
    for (let _ = 0; _ < numCards; _++) {
      hand.push(deck.pop());
    }
    return hand;
}

function displayPlayerHand (cards) {
    let hand = '';
    cards.forEach((card,index) => {
        hand += `${card.suit}-${card.value}`;
        if (index !== cards.length - 1){
            hand += ', '
        }
    })
    console.log(`You got ${hand}` )
}

function displayDealerHand (cards) {
    let hand = '';
    cards.forEach((card,index) => {
        hand += `${card.suit}-${card.value}`;
        if (index !== cards.length - 1){
            hand += ', '
        }
    })
    console.log(`The dealer got ${hand}` )
}

}
playGame() //start the game




