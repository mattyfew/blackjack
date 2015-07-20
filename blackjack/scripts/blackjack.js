$(document).ready(function () {
	startModal();
});

function startModal() {
	$("#play-button").hide();
	$('#startmodal').foundation('reveal', 'open');
	$("#startmodal .button").on('click', function () {
		$('#startmodal').foundation('reveal', 'close');
		var numDecks = $('#pickdecks').val();
		stackMakeDeck(numDecks);
		stackShuffle();
		setStatus("Round Init");
	});
}

var $playButton = $('#play-button')
var bankroll = 500;
var totalBet = 0;
var discarded = [];
var player = [];
var dealer = [];
var dealerScore = 0;
var playerScore = 0;
var dealRoundCounter = 1;
var $prompter = $("#prompter p");
var dealTimeDelay = 3000;


$currentBet = $("#player-bet p");
$bankRollDisplay = $("#bankroll p");

function setStatus(currentStatus) {
	console.log(currentStatus);
	switch (currentStatus) {

	case "Round Init":
		stackShuffle(1);
		$("#dealer-actions-extra").addClass("disabled");
		console.log(cards);
		$prompter.html("Please place your bets<br/>and click PLAY");
		placeBets();
		$playButton.on("click", function () {
			console.log("clicked");
			setStatus("Round Start");
		});
		break;

	case "Round Start":
		dealRound();
		console.log("Player: ", player, " Dealer: ", dealer);
		//player.handGetScore();
		$prompter.html("Would you like to hit or stay?");
		break;


	case "Deal":
		break;
	}
}

function dealRound() {

	// Deal a card to the player or the dealer based on the counter.
	while (dealRoundCounter < 5) {
		switch (dealRoundCounter) {
		case 1:
			stackAddCard(stackDeal(), player);
			var pCard1 = $('<img id="p-card-1" class="card">');
			pCard1.attr('src', player[0].image);
			pCard1.appendTo('#myHand');
			break;
		case 2:
			stackAddCard(stackDeal(), dealer);
			var dCard1 = $('<img id="d-card-1" class="card">');
			var dCardFaceDown = $('<img id="d-card-face-down" class="card">');
			dCard1.attr('src', dealer[0].image);
			dCardFaceDown.attr('src', 'img/card-face-down-blue.png');
			$(dCard1).hide();
			dCardFaceDown.appendTo('#dealer');
			dCard1.appendTo('#dealer');
			break;
		case 3:
			stackAddCard(stackDeal(), player);
			var pCard2 = $('<img id="p-card-2" class="card">');
			pCard2.attr('src', player[1].image);
			pCard2.appendTo('#myHand');
			break;

		case 4:
			stackAddCard(stackDeal(), dealer);
			var dCard2 = $('<img id="d-card-2" class="card">');
			dCard2.attr('src', dealer[1].image);
			dCard2.appendTo('#dealer');
			break;

			//        default:

			// No more cards to deal, play the round.

			//            playRound();
			//            return;
			//            break;
		}

		// Update the player's score.

		if (player.handGetScore() == 21) {
			
			$prompter.html("Blackjack, You Win!");
		} else
			$prompter.html("Your current score is " + player.handGetScore());

		// Set a timer for the next call.

		dealRoundCounter++;
		setTimeout(dealRound, dealTimeDelay);
	}
}

//******************************Deck Constructor***************

function Stack() {

	var deck = [];

	this.cards = new Array();

	this.makeDeck = stackMakeDeck;
	this.shuffle = stackShuffle;
	this.deal = stackDeal;
	this.draw = stackDraw;
	this.addCard = stackAddCard;
	this.combine = stackCombine;
	this.cardCount = stackCardCount;
}

//***************************Card Constructor*********************

var Card = function (suit, rank, image) {
	this.rank = rank;
	this.suit = suit;
	this.image = image;

	this.toString = cardToString;
	//this.createNode = cardCreateNode;

}

//*****************toString***********************************

function cardToString() {

	var rank, suit;

	switch (this.rank) {
	case "A":
		rank = "Ace";
		break;
	case "2":
		rank = "Two";
		break;
	case "3":
		rank = "Three";
		break;
	case "4":
		rank = "Four";
		break;
	case "5":
		rank = "Five";
		break;
	case "6":
		rank = "Six";
		break;
	case "7":
		rank = "Seven";
		break;
	case "8":
		rank = "Eight";
		break;
	case "9":
		rank = "Nine";
		break;
	case "10":
		rank = "Ten";
		break;
	case "J":
		rank = "Jack"
		break;
	case "Q":
		rank = "Queen"
		break;
	case "K":
		rank = "King"
		break;
	default:
		rank = null;
		break;
	}

	switch (this.suit) {
	case "C":
		suit = "Clubs";
		break;
	case "D":
		suit = "Diamonds"
		break;
	case "H":
		suit = "Hearts"
		break;
	case "S":
		suit = "Spades"
		break;
	default:
		suit = null;
		break;
	}

	if (rank == null || suit == null)
		return "";

	return rank + " of " + suit;
}

//***************** stack MAKE DECK***********************************

function stackMakeDeck(n) {

	var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
		"10", "J", "Q", "K"];
	var suits = ["C", "D", "H", "S"];
	var imgUrls = ["img/cards/c01.png", "img/cards/c02.png", "img/cards/c03.png", "img/cards/c04.png", "img/cards/c05.png", "img/cards/c06.png", "img/cards/c07.png", "img/cards/c08.png", "img/cards/c09.png", "img/cards/c10.png", "img/cards/c11.png", "img/cards/c12.png", "img/cards/c13.png", "img/cards/d01.png", "img/cards/d02.png", "img/cards/d03.png", "img/cards/d04.png", "img/cards/d05.png", "img/cards/d06.png", "img/cards/d07.png", "img/cards/d08.png", "img/cards/d09.png", "img/cards/d10.png", "img/cards/d11.png", "img/cards/d12.png", "img/cards/d13.png", "img/cards/h01.png", "img/cards/h02.png", "img/cards/h03.png", "img/cards/h04.png", "img/cards/h05.png", "img/cards/h06.png", "img/cards/h07.png", "img/cards/h08.png", "img/cards/h09.png", "img/cards/h10.png", "img/cards/h11.png", "img/cards/h12.png", "img/cards/h13.png", "img/cards/s01.png", "img/cards/s02.png", "img/cards/s03.png", "img/cards/s04.png", "img/cards/s05.png", "img/cards/s06.png", "img/cards/s07.png", "img/cards/s08.png", "img/cards/s09.png", "img/cards/s10.png", "img/cards/s11.png", "img/cards/s12.png", "img/cards/s13.png"];
	var i, j, k;
	var m;

	m = ranks.length * suits.length;

	// Set array of cards.

	this.cards = [n * m];

	// Fill the array with 'n' packs of cards.

	for (i = 0; i < n; i++) {
		for (j = 0; j < suits.length; j++) {
			for (k = 0; k < ranks.length; k++) {
				this.cards[i * m + j * ranks.length + k] = new Card(suits[j], ranks[k], imgUrls[j * ranks.length + k]);
			}
		}
	}
}

//*****************************SHUFFLE*******************************

function stackShuffle(n) {

	var i, j, k;
	var temp;

	// Shuffle the stack 'n' times.

	for (i = 0; i < n; i++)
		for (j = 0; j < this.cards.length; j++) {
			k = Math.floor(Math.random() * this.cards.length);
			temp = this.cards[j];
			this.cards[j] = this.cards[k];
			this.cards[k] = temp;
		}
}

var Chip = function (amount, location) {
	this.amount = amount;
	this.location = location;
}

//***************************stack DEAL*******************************

function stackDeal() {

	if (this.cards.length > 0)
		return this.cards.shift();
	else
		return null;
}

//*********************** PLACE BETS ****************************

function placeBets() {
	$(".bet").on('click', function () {
		var amount = $(this).val();
		if (bankroll >= amount) {
			totalBet += amount;
			bankroll -= amount;
			$bankRollDisplay.html("$" + bankroll);
			$currentBet.html("$" + totalBet);
			if (totalBet > 0) {
				$playButton.show();
			}
			console.log(totalBet);
			console.log(bankroll);
		} else {
			alert("Sorry you are out of credits");
		}
	})
};

//****************ADD CARD To garbage pile*********

function stackAddCard(card, array) {

	array.push(card);
}

//****************GET NEXT CARD******************

function getNextCard() {

	// If there are no cards left, start a new deck.

	if (cards.length == 0) {
		alert("No more cards in deck, please reset");
		newDeck();
	} else {

		return cards.stackDeal();
	}
}

////*****************  HIT  *****************************
//
//function hit(card, array) {
//	card = getNextCard();
//	stackAddCard(card, array);
//}
//
////************************* GET SCORE ************************

function handGetScore() {

	var i, total;

	total = 0;

	// Total card values counting Aces as one.

	for (i = 0; i < this.length; i++)
		if (this[i].rank == "A")
			total++;
		else {
			if (this[i].rank == "J" || this[i].rank == "Q" ||
				this[i].rank == "K") {
				total += 10;
			} else {
				total += parseInt(this[i].rank, 10);
			}
		}

		// Change as many ace values to 11 as possible.

	for (i = 0; i < this.length; i++)
		if (this.rank == "A" && total <= 11)
			total += 10;

	return total;
}