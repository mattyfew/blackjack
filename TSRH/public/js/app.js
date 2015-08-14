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
		value: 2,
		selected: false,
		description: "When $hit is blowin' up!",
		imageSrc: "http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-46991-256px-a71.png"
	},
	{
		text: "Keep an Eye Out",
		value: 3,
		selected: true,
		description: "Be on the lookout...",
		imageSrc: "http://openuhclassschedulehelper.github.io/uimockup/eye.svg"
	},
	{
		text: "Fresh",
		value: 4,
		selected: false,
		description: "Only the freshest content",
		imageSrc: "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=34025608"
	},
	{
		text: "News",
		value: 5,
		selected: false,
		description: "News clippin",
		imageSrc: "http://www.cfgforensics.com/images/icons/investigation_icon.png"
	},
	{
		text: "Lightning",
		value: 6,
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
		}
	})
});