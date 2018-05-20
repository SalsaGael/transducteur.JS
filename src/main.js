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

const body = document.querySelector('#body');
const nav = document.querySelector('#nav');
const tabCalcPuisAct = document.getElementById("tabCalcPuisAct");
const tabCalcPuisReact = document.getElementById("tabCalcPuisReact");
const tabCalcTens = document.getElementById("tabCalcTens");
const container = document.querySelector("#container");
const menu = document.querySelector('#menu');
const menulist = document.querySelector('#menulist');
const theme = document.querySelector('#theme');
const footer = document.querySelector('#footer');
const tabCalcPuisActReduct = document.getElementById("tabCalcPuisActReduct");
const tabCalcPuisReactReduct = document.getElementById("tabCalcPuisReactReduct");
const tabCalcTensReduct = document.getElementById("tabCalcTensReduct");
const menubtn = document.querySelector('#menubtn');
const burger = document.querySelector('#burger');

// RAZ Bandeau //

const removeActive = () => {
	menu.classList.remove("show");
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

tabCalcPuisActReduct.onclick = () => {
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

tabCalcPuisReactReduct.onclick = () => {
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

tabCalcTensReduct.onclick = () => {
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

// Gestion Panneau Menu //

data.timer = false;

menubtn.onclick = (e) => {
	e.stopPropagation();
	e.preventDefault();
	if (data.timer == false) {
	data.timer = true;
	menu.classList.add("show");
	setTimeout(function () {
		data.timer = false;
		menu.classList.remove("show");
	}, 5000)} else {
	menu.classList.toggle("show");	
	}
};

body.onclick = () => {
	menu.classList.remove("show");
};

menu.onclick = (e) => {
	e.stopPropagation();
	e.preventDefault();
};

// Ajout de Share API si disponible //

shareAPI();

// Passage en theme Dark si necessaire //

if (window.Windows) {
	theme.innerHTML = `
	<option value="light">Clair</option>
	<option value="dark">Sombre</option>
	<option value="system">Système</option>
	`
	if (data.themeselect == "system") {
		windowsTheme();
	}
}

theme.value = data.themeselect;

const themeApply = () => {
	if (data.theme == "dark") {
		body.classList.add("darkmodecontainer");
		nav.classList.add("darkmodenav");
		menu.classList.add("darkmodenav");
		footer.classList.add("darkmodenav");
	} else {
		body.classList.remove("darkmodecontainer");
		nav.classList.remove("darkmodenav");
		menu.classList.remove("darkmodenav");
		footer.classList.remove("darkmodenav");
	}
};

themeApply();

theme.addEventListener('change', function () {
	data.themeselect = theme.value;
	if (data.themeselect == "light") {
		data.theme = "light";
	} else if (data.themeselect == "dark") {
		data.theme = "dark";
	} else if (data.themeselect == "system") {
		// Vérification du  Theme Windows 10 //
		windowsTheme();
	};
	writeData();
	themeApply();
})