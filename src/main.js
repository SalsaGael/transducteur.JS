	import {
		writeData,
		readData,
		data,
	} from './js/data.js'

	import renderPuisAct from './js/pa.render.js';
	import calcPuisAct from './js/pa.calc.js';
	import renderPuisReact from './js/pr.render.js';
	import calcPuisReact from './js/pr.calc.js';
	import renderTens from './js/u.render.js';
	import calcTens from './js/u.calc.js';
	import windowsTheme from './js/windowsAPI.js';
	import shareAPI from './js/shareAPI.js';
	import Hammer from './js/hammer.js';

	import cssreset from './css/reset.css';
	import cssbootstrap from './css/bootstrap.css';
	import css from './css/main.css';

document.addEventListener('DOMContentLoaded', function () {

	// Force HTTPS pour Service Worker //
	if (navigator.serviceWorker) {
		if (location.origin == 'http://192.168.1.10:5500') {
			console.log('Réseau local, https non requis, mais SW non activable');
		} else if (location.origin == 'http://127.0.0.1:5500') {
			console.log('Machine locale, https non requis, et SW activable');
		} else if (location.protocol == 'https:') {
			console.log('https déja activé');
		} else {
			console.log('Passage en https nécessaire');
			location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
		}
	}

	// Import des données antérieure ou de base //

	readData();

	// Applicationq //

	// Elements affichage a cibler //

	const body = document.querySelector('#body');
	const nav = document.querySelector('#nav');
	const tabCalcPuisAct = document.getElementById("tabCalcPuisAct");
	const tabCalcPuisReact = document.getElementById("tabCalcPuisReact");
	const tabCalcTens = document.getElementById("tabCalcTens");
	const container = document.querySelector("#container");
	const menu = document.querySelector('#menu');
	const theme = document.querySelector('#theme');
	const footer = document.querySelector('#footer');
	const tabCalcPuisActReduct = document.getElementById("tabCalcPuisActReduct");
	const tabCalcPuisReactReduct = document.getElementById("tabCalcPuisReactReduct");
	const tabCalcTensReduct = document.getElementById("tabCalcTensReduct");
	const burger = document.querySelector('#burger');
	const menubtn = document.querySelector('#menubtn');
	// RAZ Bandeau //

	const removeActive = () => {
		writeData();
		tabCalcPuisAct.classList.remove("active");
		tabCalcPuisReact.classList.remove("active");
		tabCalcTens.classList.remove("active");
		tabCalcPuisActReduct.classList.remove("active");
		tabCalcPuisReactReduct.classList.remove("active");
		tabCalcTensReduct.classList.remove("active");
	}

	// Bascule Calculette Puissance Active //

	const bascCalcPussAct = () => {
		data.start = "calcpa";
		renderPuisAct();
		calcPuisAct();
		removeActive();
		tabCalcPuisAct.classList.add("active");
		tabCalcPuisActReduct.classList.add("active");
	}

	tabCalcPuisAct.onclick = () => {
		bascCalcPussAct();
	};

	tabCalcPuisActReduct.onclick = () => {
		bascCalcPussAct();
	};

	// Bascule Calculette Puissance Reactive //

	const bascCalcPussReact = () => {
		data.start = "calcpr";
		renderPuisReact();
		calcPuisReact();
		removeActive();
		tabCalcPuisReact.classList.add("active");
		tabCalcPuisReactReduct.classList.add("active");
	}

	tabCalcPuisReact.onclick = () => {
		bascCalcPussReact();
	};

	tabCalcPuisReactReduct.onclick = () => {
		bascCalcPussReact();
	};


	// Bascule Calculette Tension //

	const bascCalcTens = () => {
		data.start = "calctens";
		renderTens();
		calcTens();
		removeActive();
		tabCalcTens.classList.add("active");
		tabCalcTensReduct.classList.add("active");
	}

	tabCalcTens.onclick = () => {
		bascCalcTens();
	};

	tabCalcTensReduct.onclick = () => {
		bascCalcTens();
	};

	// Lancement par défaut //

	switch (data.start) {
		case "calcpa":
			bascCalcPussAct();
			break;
		case "calcpr":
			bascCalcPussReact();
			break;
		case "calctens":
			bascCalcTens();
			break;
	};

	// Gestion Panneau Menu //

	data.timer = false;

	const showMenu = () => {
		if (data.timer == false) {
			data.timer = true;
			menu.classList.add("show");
			menubtn.classList.add("active");
			setTimeout(function () {
				data.timer = false;
				menu.classList.remove("show");
				menubtn.classList.remove("active");
			}, 10000)
		} else {
			menu.classList.add("show");
			menubtn.classList.add("active");
		}
	};

	const toggleMenu = () => {
		menu.classList.toggle("show");
		menubtn.classList.toggle("active");
	};

	const hideMenu = () => {
		menu.classList.remove("show");
		menubtn.classList.remove("active");
	};

	menubtn.onclick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (data.timer == false) {
			showMenu();
		} else {
			toggleMenu();
		}
	};

	body.onclick = () => {
		hideMenu();
	};

	menu.onclick = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};

	// Gestion du tactile //

	var hammertime = new Hammer(container);

	hammertime.on('swiperight', function (e) {
		showMenu();
	});

	hammertime.on('swipeleft', function (e) {
		hideMenu();
	});

	// Passage en theme Dark si necessaire //

	// Si W10 ajout de la selection "système" //"

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

	// Application du thème //

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

	// Theme enregistré au lancement //

	themeApply();
	theme.value = data.themeselect;

	// Selection du thème //

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

	// Ajout de Share API si disponible (Androïd) //

	shareAPI();

	//This is the service worker with the Cache-first network

	if (navigator.serviceWorker) {
		//Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
		if (navigator.serviceWorker.controller) {
			console.log("SW déja présent, inutile de l'enregister")
		} else {
			//Register the ServiceWorker
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('./sw.js', {
					scope: './'
				}).then(function (reg) {
					console.log('SW enregistré pour ce scope :' + reg.scope)
				})
			})
		}
	} else {
		console.log("SW indisponible avec ce Navigateur")
	}
})