import {
	writeData,
	readData,
	data,
} from './data.js'

readData();

import renderPuisAct from './pa.render.js';
import calcPuisAct from './pa.calc.js';
import renderPuisReact from './pr.render.js';
import calcPuisReact from './pr.calc.js';
import renderTens from './u.render.js';
import calcTens from './u.calc.js';

// Affichage a cibler //

const container = document.querySelector("#container");
const tabCalcPuisAct = document.getElementById("tabCalcPuisAct");
const tabCalcPuisReact = document.getElementById("tabCalcPuisReact");
const tabCalcTens = document.getElementById("tabCalcTens");

// RAZ Bandeau //

const removeActive = () => {
	writeData();
	tabCalcPuisAct.classList.remove("active");
	tabCalcPuisReact.classList.remove("active");
	tabCalcTens.classList.remove("active");
}

// Bascule Calculette Puissance Active //

tabCalcPuisAct.onclick = () => {
	data.start = "calcpa";
	renderPuisAct();
	calcPuisAct();
	removeActive();
	tabCalcPuisAct.classList.add("active");
};

// Bascule Calculette Puissance Reactive //

tabCalcPuisReact.onclick = () => {
	data.start = "calcpr";
	renderPuisReact();
	calcPuisReact();
	removeActive();
	tabCalcPuisReact.classList.add("active");
};


// Bascule Calculette Tension //

tabCalcTens.onclick = () => {
	data.start = "calctens";
	renderTens();
	calcTens();
	removeActive();
	tabCalcTens.classList.add("active");
};


// Lancement par défaut //

switch (data.start) {
	case "calcpa":
		renderPuisAct();
		calcPuisAct();
		tabCalcPuisAct.classList.add("active");
		break;
	case "calcpr":
		renderPuisReact();
		calcPuisReact();
		tabCalcPuisReact.classList.add("active");
		break;
	case "calctens":
		renderTens();
		calcTens();
		tabCalcTens.classList.add("active");
		break;
};

const footer = document.querySelector('#footer');

if (navigator.share) {

	footer.innerHTML = `
	<button class="btn btn-sm btn-dark mr-2" onClick="location.href='mailto:gael.piconcely@free.fr?subject=Retour utilisateur'">
	<i class="fa fa-envelope-open" aria-hidden="true"></i>
</button>
<button class="btn btn-sm btn-dark mr-2" onClick="location.href='https://twitter.com/salsagael'">
	<i class="fa fa-twitter" aria-hidden="true"></i>
</button>
<button class="btn btn-sm btn-dark mr-2" onClick="location.href='https://paypal.me/PICONCELY'">
	<i class="fa fa-paypal" aria-hidden="true"></i>
</button>
<button class="btn btn-sm btn-dark mr-2" onClick="" type="button" id="shareBtn">
	<i class="fa fa-share" aria-hidden="true"></i>
</button>
	`

	const shareButton = document.querySelector('#shareBtn');

	shareButton.onclick = (e) => {
		e.preventDefault();
		navigator.share({
				title: 'Transducteur',
				text: 'Une calculette pratique pour les capteurs de mesure',
				url: window.location.href
			}).then(() => {
				console.log('Thanks for sharing!');
			})
			.catch(err => {
				console.log(`Couldn't share because of`, err.message);
			});
	}

} else {
	console.log('Share API not supported');
}
