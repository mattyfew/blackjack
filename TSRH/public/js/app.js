var ddData = [
	{
		text: "Fight the Power",
		value: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Rebel_Alliance_logo.svg/2000px-Rebel_Alliance_logo.svg.png",
		selected: false,
		description: "Discussions related to government, mass media, basically anything Snowden",
		imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Rebel_Alliance_logo.svg/2000px-Rebel_Alliance_logo.svg.png"
	},
	{
		text: "Da Bomb",
		value: "http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-46991-256px-a71.png",
		selected: false,
		description: "When $hit is blowin' up!",
		imageSrc: "http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-46991-256px-a71.png"
	},
	{
		text: "Keep an Eye Out",
		value: "http://www.sinapsiroma.it/site/images/yootheme/demo/default/frontpage/sorveglianza.png",
		selected: true,
		description: "Be on the lookout...",
		imageSrc: "http://www.sinapsiroma.it/site/images/yootheme/demo/default/frontpage/sorveglianza.png"
	},
	{
		text: "Fresh",
		value: "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=34025608",
		selected: false,
		description: "Only the freshest content",
		imageSrc: "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=34025608"
	},
	{
		text: "News",
		value: "http://www.cfgforensics.com/images/icons/investigation_icon.png",
		selected: false,
		description: "News clippin",
		imageSrc: "http://www.cfgforensics.com/images/icons/investigation_icon.png"
	},
	{
		text: "Lightning",
		value: "http://www.wyklejanietablic.pl/cc/icon_927.png",
		selected: false,
		description: "This just in!",
		imageSrc: "http://www.wyklejanietablic.pl/cc/icon_927.png"
	}
];

$(document).foundation();

$(document).ready(function() {
	$('#iconDropDown').ddslick({
		data: ddData,
		width: "100%",
		height: 190,
		background: "#FFFFFF",
		onSelected: function(selectedData) {
			name="dropdown_url" 
		}
	})
});

$('.vote').click(function () {
	$(this).toggleClass('on');
});