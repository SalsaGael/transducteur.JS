import {
	writeData,
	readData,
	data,
} from './data.js'

import renderPuisAct from './pa.render.js';
import calcPuisAct from './pa.calc.js';
import renderPuisReact from './pr.render.js';
import calcPuisReact from './pr.calc.js';
import renderTens from './u.render.js';
import calcTens from './u.calc.js';

readData();

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

// Ajout Share API pour les navigateurs compatibles //

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



// Dark mode //

// Découverte du theme Windows 10 //

const checkForDarkTheme = () => {
	if (window.Windows) {

		var uiSettings = new Windows.UI.ViewManagement.UISettings();
		var color = uiSettings.getColorValue(Windows.UI.ViewManagement.UIColorType.background)
		if (color.b === 0) {
			return "dark"
		} else {
			return "light"
		}
	}
}

let themeWindows = checkForDarkTheme();

// Passage en theme Dark //

const nav = document.querySelector('#nav');
const body = document.querySelector('#body');

if (themeWindows == "dark") {
	body.classList.add("darkmodebg");
	nav.classList.add("darkmodecolor");
} else {
	body.classList.remove("darkmodebg");
	nav.classList.remove("darkmodecolor");
}


// TitleBar Color W10 //

function changeAppTitleBarColor(backgroundColor, foregroundColor, buttonBackgroundColor, buttonForegroundColor,
	buttonHoverBackgroundColor, buttonHoverForegroundColor, buttonPressedBackgroundColor,
	buttonPressedForegroundColor, inactiveBackgroundColor, inactiveForegroundColor,
	buttonInactiveBackgroundColor, buttonInactiveForegroundColor) {

	if (window.Windows && Windows.UI.ViewManagement.ApplicationView) {
		var customColors = {
			backgroundColor: backgroundColor,
			foregroundColor: foregroundColor,
			buttonBackgroundColor: buttonBackgroundColor,
			buttonForegroundColor: buttonForegroundColor,
			buttonHoverBackgroundColor: buttonHoverBackgroundColor,
			buttonHoverForegroundColor: buttonHoverForegroundColor,
			buttonPressedBackgroundColor: buttonPressedBackgroundColor,
			buttonPressedForegroundColor: buttonPressedForegroundColor,
			inactiveBackgroundColor: inactiveBackgroundColor,
			inactiveForegroundColor: inactiveForegroundColor,
			buttonInactiveBackgroundColor: buttonInactiveBackgroundColor,
			buttonInactiveForegroundColor: buttonInactiveForegroundColor
		};

		var titleBar = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
		titleBar.backgroundColor = customColors.backgroundColor;
		titleBar.foregroundColor = customColors.foregroundColor;
		titleBar.inactiveBackgroundColor = customColors.inactiveBackgroundColor;
		titleBar.inactiveForegroundColor = customColors.inactiveForegroundColor;
	}
}

var backgroundColor = {
	a: 255,
	r: 23,
	g: 162,
	b: 184
};
var foregroundColor = {
	a: 255,
	r: 0,
	g: 0,
	b: 0
};
var inactiveBackgroundColor = {
	a: 255,
	r: 23,
	g: 162,
	b: 184
};
var inactiveForegroundColor = {
	a: 255,
	r: 100,
	g: 100,
	b: 100
};


var buttonBackgroundColor = {
	a: 255,
	r: 23,
	g: 162,
	b: 184
};
var buttonForegroundColor = {
	a: 255,
	r: 0,
	g: 0,
	b: 0
};
var buttonHoverBackgroundColor = {
	a: 255,
	r: 23,
	g: 162,
	b: 184
};
var buttonHoverForegroundColor = {
	a: 255,
	r: 255,
	g: 255,
	b: 255
};

var buttonPressedBackgroundColor = {
	a: 255,
	r: 23,
	g: 162,
	b: 184
};
var buttonPressedForegroundColor = {
	a: 255,
	r: 0,
	g: 0,
	b: 0
};

var buttonInactiveBackgroundColor = {
	a: 255,
	r: 23,
	g: 162,
	b: 184
};
var buttonInactiveForegroundColor = {
	a: 255,
	r: 100,
	g: 100,
	b: 100
};

changeAppTitleBarColor(backgroundColor, foregroundColor, buttonBackgroundColor, buttonForegroundColor, buttonHoverBackgroundColor, buttonHoverForegroundColor, buttonPressedBackgroundColor, buttonPressedForegroundColor, inactiveBackgroundColor, inactiveForegroundColor, buttonInactiveBackgroundColor, buttonInactiveForegroundColor);