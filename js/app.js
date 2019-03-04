/*
 * Create a list that holds all of your cards
 */

var cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// shuffle cards
cards = shuffle(cards);

var deck = $(".deck");

// add card elements to DOM
addCardsToDeck(cards, deck);


// Function to construct card elements and insert into Deck
function addCardsToDeck(cards, deck){
    var elements = [];
    for (var card of cards) {
        var element = $("<li class='card' </li>");
        element.append(`<i class='fa ${card}'></i>`);
        elements.push(element);
    }
    deck.append(elements);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var selectedCard = null;
var selectedElement = null;

var matchPairCounter = 0;

var movesCounter = 0;

// event listener for card click
$('.card').click(function(){

    //Fix double selected card problem!!!
    // TO DO

    var currentElement = $(this);
    var iconElement = this.children;
    var currentCard = iconElement[0].className.split(' ')[1];
    
    $(this).addClass("open show");

    if (selectedCard === null){
        selectedElement = $(this);
        selectedCard = currentCard;
    }
    else {
        if (currentCard === selectedCard){
            currentElement.removeClass("open show");
            currentElement.addClass("match");
            selectedElement.removeClass("open show");
            selectedElement.addClass("match");
            resetMove();
            matchPairCounter++;
            checkStatus();
        }
        else {
            selectedElement.addClass("wrong");
            currentElement.addClass("wrong");
            setTimeout(function(){
                selectedElement.removeClass("open show wrong");
                currentElement.removeClass("open show wrong");
                resetMove();
            }, 700);
        }
        movesCounter++;
        $('.moves').text(movesCounter);
    }
});

// reset the move 
function resetMove() {
    this.selectedCard = null;
    this.selectedElement = null;
}

function checkStatus() {
    if (matchPairCounter == 8) {
        console.log("End of the Game");
    }
}