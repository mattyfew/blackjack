console.log("Linked, you're good");

//The Deck of Cards

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

var Card = function (suit, rank, image) {
	this.rank = rank;
	this.suit = suit;
	this.image = image;

	this.toString = cardToString;
	//this.createNode = cardCreateNode;

}

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

function stackMakeDeck(n) {

	var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
		"10", "J", "Q", "K"];
	var suits = ["C", "D", "H", "S"];
	var imgUrls = ["img/cards/c01.png", "img/cards/c02.png", "img/cards/c03.png", "img/cards/c04.png", "img/cards/c05.png", "img/cards/c06.png", "img/cards/c07.png", "img/cards/c08.png", "img/cards/c09.png", "img/cards/c10.png", "img/cards/c11.png", "img/cards/c12.png", "img/cards/c13.png", "img/cards/d01.png", "img/cards/d02.png", "img/cards/d03.png", "img/cards/d04.png", "img/cards/d05.png", "img/cards/d06.png", "img/cards/d07.png", "img/cards/d08.png", "img/cards/d09.png", "img/cards/d10.png", "img/cards/d11.png", "img/cards/d12.png", "img/cards/d13.png", "img/cards/h01.png", "img/cards/h02.png", "img/cards/h03.png", "img/cards/h04.png", "img/cards/h05.png", "img/cards/h06.png", "img/cards/h07.png", "img/cards/h08.png", "img/cards/h09.png", "img/cards/h10.png", "img/cards/h11.png", "img/cards/h12.png", "img/cards/h13.png", "img/cards/s01.png", "img/cards/s02.png", "img/cards/s03.png", "img/cards/s04.png", "img/cards/s05.png", "img/cards/s06.png", "img/cards/s07.png", "img/cards/s08.png", "img/cards/s09.png", "img/cards/s10.png", "img/cards/s11.png", "img/cards/s12.png", "img/cards/s13.png"];
	var i,j,k;
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

function stackDeal() {

	if (this.cards.length > 0)
		return this.cards.shift();
	else
		return null;
}

stackMakeDeck(1);
$('#test').append('<img id="theImg" src=' + cards[08].image "/>")