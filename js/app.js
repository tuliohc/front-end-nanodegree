var cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var selectedCard = null;
var selectedElement = null;
var selectedCardId = null;
var matchPairCounter = 0;
var movesCounter = 0;
var starsCounter = 3;
var deck = $(".deck");
// jquery timer: https://github.com/walmik/timer.jquery
var timer; 

// shuffle cards
cards = shuffle(cards);


// add card elements to DOM
addCardsToDeck(cards, deck);


// Function to construct card elements and insert into Deck
function addCardsToDeck(cards, deck) {
    var elements = [];
    var id = 1;
    for (var card of cards) {
        var element = $(`<li class='card' id='card${id}'</li>`);
        element.append(`<i class='fa ${card}'></i>`);
        elements.push(element);
        id++;
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

// event listener for card click
var cardClick = function() {

    startCounter();

    var currentElement = $(this);
    currentElement.off();

    var iconElement = this.children;
    var currentCard = iconElement[0].className.split(' ')[1];
    var currentCardId = currentElement.attr('id');


    showCard(currentElement);

    // check if it's the first card
    if (selectedCard === null) {
        selectedElement = currentElement;
        selectedCard = currentCard;
        selectedCardId = currentCardId;
    }
    // it's the second card
    else {
        movesCounter++;
        updateScore();
        if (currentCard === selectedCard) {       
            currentElement.removeClass("open show");
            currentElement.addClass("match");
            selectedElement.removeClass("open show");
            selectedElement.addClass("match");
            resetMove();
            matchPairCounter++;
            checkStatus();
        }
        else {
            $('.card').off();
            selectedElement.addClass("wrong");
            currentElement.addClass("wrong");
            
            setTimeout(function(){
                selectedElement.removeClass("open show wrong");
                currentElement.removeClass("open show wrong");
                resetMove();
                $('.card').click(cardClick);
            }, 700);
        }
    }
  
}

$('.card').click(cardClick);

// event listener for restart button
$('.restart').click(function() {
    gameReset();
})

// reset the move 
function resetMove() {
    selectedCard = null;
    selectedElement = null;
}

// check the game status... if there is 8 matched pairs, the game is over
function checkStatus() {
    if (matchPairCounter == 8) {
        timer.timer('pause');
        $('#totalscore').text(`You finished the game in ${timer.data('seconds')} seconds with ${movesCounter} moves and ${starsCounter} star(s)`);
        $('#myModal').modal({backdrop: 'static', keyboard: false});
        
    }
}

// add class that reveal the card
function showCard(element) {
    element.addClass("open show");
}

// updates the move and star numbers at score panel
function updateScore() {
    $('.moves').text(movesCounter);
    if (movesCounter > 10 && movesCounter <= 15 ) {
        $('#thirdStar').removeClass('fa fa-star');
        $('#thirdStar').addClass('fa fa-star-o');
        starsCounter = 2;
    }
    else if (movesCounter > 15) {
        $('#secondStar').removeClass('fa fa-star');
        $('#secondStar').addClass('fa fa-star-o');
        starsCounter = 1;
    }
    // you should have at least 1 star
}

// check if the card is selected twice
function doubleSelect(element) {
    return element.attr('id') === selectedCardId ? true : false;
}

// reset the game reloading the window
function gameReset() {
    location.reload();
}

// starts the game counter
function startCounter() {
    timer = $('#timer').timer();
}


