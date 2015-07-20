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

//DOM Buttons
var $playButton = $('#play-button');
var $hitButton = $('#hit-button');
var $stayButton = $('#stay-button');

var bankroll = 500;
var totalBet = 0;
var discarded = [];
var player = [];
var dealer = [];
var dealerScore = 0;
var playerScore = 0;
var dealRoundCounter = 1;
var $prompter = $("#prompter p");
var dealTimeDelay = 8000;
var gameOver = false;


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
			$(".bet").off("click");
			$(".bet").css("cursor", "default");
			console.log("clicked");
			setStatus("Round Start");
		});
		break;

	case "Round Start":
		dealRound();
		console.log("Player: ", player, " Dealer: ", dealer);
		//First, get the score, determine whether it is blackjack. If it is not, then ask to hit or stay
		playerScore = getHandScore(player);
		dealerScore = getHandScore(dealer);
		console.log("Player Score: " + playerScore + "; Dealer Score: " + dealerScore);
		checkForWinner(player, dealer);
		$prompter.html("Current Score: " + playerScore + "<br>Would you like to hit or stay?");
		//HIT
		$hitButton.on("click", function () {
				console.log("Hit Button clicked!");
				hit(player);
			})
			//STAY
		$stayButton.on("click", function () {
			console.log("Stay Button clicked!");
			stay();
			setStatus("Dealers Turn");
		});
		break;


	case "Dealers Turn":
		$('#d-card-face-down').hide();
		$('#d-card-1').show();
		getHandScore(dealer);
		while (dealerScore < 17) {
			dealerHit(dealer);
		}
		if (dealerScore >= 17) {
			checkForWinner();
		}
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
		}
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

var Card = function (suit, rank, image, value) {
	this.rank = rank;
	this.suit = suit;
	this.image = image;
	this.value = value;

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
	var values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

	m = ranks.length * suits.length;

	// Set array of cards.

	this.cards = [n * m];

	// Fill the array with 'n' packs of cards.

	for (i = 0; i < n; i++) {
		for (j = 0; j < suits.length; j++) {
			for (k = 0; k < ranks.length; k++) {
				this.cards[i * m + j * ranks.length + k] = new Card(suits[j], ranks[k], imgUrls[j * ranks.length + k], values[k]);
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

//******************** Update the player's score ********************
//Description: adds the values of all cards in the hand, then runs checkForWinner

function getHandScore(array) {
	var score = 0;

	for (var i = 0; i < array.length; i++) {
		score += array[i].value;
	}
	return score;
}

// **************** CHECK SCORE **********************
//Description: checks through each winning scenario. The order is very important. 
//This should be ran everytime the dealer hits.

function checkForWinner() {
	if (playerScore === 21) {
		$prompter.html("BlackJack. You win 1.5x your total bet!!");
		bankroll += (totalBet * 1.5);
		totalBet = 0;
		gameOver = true;
	} else if (playerScore === 21 && dealerScore === 21) {
		$prompter.html("Both the dealer and the player hit BlackJack. <br>PUSH!");
		bankroll += totalBet;
		totalBet = 0;
		gameOver = true;
	} else if (playerScore > 21) {
		$prompter.html("Player busts. You Lose!");
		bankroll -= totalBet;
		totalBet = 0;
		gameOver = true;
	} else if (dealerScore > 21) {
		$prompter.html("Dealer busts. <br> You Win!!");
		gameOver = true;
	} else if (playerScore > dealerScore) {
		$prompter.html("You win!!");
		gameOver = true;
	} else if (dealerScore > playerScore) {
		$prompter.html("Dealer wins!");
		gameOver = true;
	} else if (dealerScore === playerScore) {
		$prompter.html("Push");
		gameOver = true;
	} else {
		gameOver = false;
	}
}

//**************** BLACKJACK **********************

function blackjack(score) {
	if (score === 21) {
		return this.blackjack = true;
	} else {
		return this.blackjack = false;
	}
}

//*****************  HIT  *****************************
//Description: takes card from deck, adds it to player array

function hit(array) {
		var newCard = stackAddCard(stackDeal(), player);
		var playerHitCard = $('<img id="p-card-' + player.length + '" class="card">');
		playerHitCard.attr('src', player[player.length - 1].image);
		playerHitCard.appendTo('#myHand');
		playerScore = getHandScore(player);
		if (playerScore > 21) {
			for (var i = 0; i < player.length; i++) {
				if (player[i].value === 11) {
					player[i].value = 1;
				}
			}
		}
		playerScore = getHandScore(player);
		$prompter.html("Current Score: " + playerScore + "<br>Hit or Stay?")
		if (playerScore > 21) {
			console.log("Player Score: " + playerScore + "; Dealer Score: " + dealerScore);
			checkForWinner();
		}
	}
	//****************** Dealer Hit **********************

function dealerHit(dealerArray) {
	var newCard = stackAddCard(stackDeal(), dealer);
	var dealerHitCard = $('<img id="d-card-' + dealer.length + '" class="card">');
	dealerHitCard.attr('src', dealer[dealer.length - 1].image);
	dealerHitCard.appendTo('#dealer');
	dealerScore = getHandScore(dealer);
	if (dealerScore > 21) {
		for (var i = 0; i < dealer.length; i++) {
			if (dealer[i].value === 11) {
				dealer[i].value = 1;
			}
		}
	}
	playerScore = getHandScore(player);
	console.log("Player Score: " + playerScore + "; Dealer Score: " + dealerScore);
	console.log("Dealer Hand: " + dealer);
	checkForWinner();
}

//***************** STAY ****************************

function stay() {

	$prompter.html("Dealer's Turn");

}

//************** GAME RESET ***************************'
/*Description: if gameOver = true, then the following must happen.....
 * 1.player and dealer hands must be moved to discarded pile
 * 2.totalBet must be set to 0
 * 3.totalBet should be either added or subtracted to bankroll
 * 4.New game should be started, skipping startModal() and instead prompting user to place bet
 */

function gameReset() {
	if (gameOver === true) {
		for (var i = 0; i < player.length; i++) {
			for (var j = 0; j < dealer.length; j++) {
				discarded.push(dealer[j]);
			}
			discarded.push(player[i]);
		}
		player = [];
		dealer = [];
		bankroll =
			setStatus("Round Start");
	}
}