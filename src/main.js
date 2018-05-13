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
import windowsTheme from './windowsAPI.js';
import shareAPI from './shareAPI.js';

// Import des données antérieure ou de base //

readData();

// Applicationq //

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

// Ajout de Share API si disponible //

shareAPI();

// Theme Windows 10 //

windowsTheme();