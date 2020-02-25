import { writeData, readData, data } from "./js/data.js";

import shareAPI from "./js/shareAPI.js";
import installPWA from "./js/installPWA.js";
import renderPuisAct from "./js/pa.render.js";
import calcPuisAct from "./js/pa.calc.js";
import renderPuisReact from "./js/pr.render.js";
import calcPuisReact from "./js/pr.calc.js";
import renderTens from "./js/u.render.js";
import calcTens from "./js/u.calc.js";
import windowsTheme from "./js/windowsAPI.js";

import Hammer from "./js/hammer.js";

import cssreset from "./css/reset.css";
import cssbootstrap from "./css/bootstrap.css";
import css from "./css/main.css";

// Application //

document.addEventListener("DOMContentLoaded", function() {
  // Force HTTPS pour Service Worker //

  if (navigator.serviceWorker) {
    if (location.origin == "http://192.168.1.10:8080") {
      console.log("Réseau local, https non requis, mais SW non activable");
    } else if (location.origin == "http://127.0.0.1:8080") {
      console.log("Machine locale, https non requis, et SW activable");
    } else if (location.origin == "http://localhost:8080") {
      console.log("Machine locale, https non requis, et SW activable");
    } else if (location.protocol == "https:") {
      console.log("https déja activé");
    } else {
      console.log("Passage en https nécessaire");
      location.href =
        "https:" +
        window.location.href.substring(window.location.protocol.length);
    }
  }

  // Elements affichage a cibler //
  const body = document.querySelector("#body");
  const nav = document.querySelector("#nav");
  const tabCalcPuisAct = document.getElementById("tabCalcPuisAct");
  const tabCalcPuisReact = document.getElementById("tabCalcPuisReact");
  const tabCalcTens = document.getElementById("tabCalcTens");
  const container = document.querySelector("#container");
  const menu = document.querySelector("#menu");
  const theme = document.querySelector("#theme");
  const footer = document.querySelector("#footer");
  const tabCalcPuisActReduct = document.getElementById("tabCalcPuisActReduct");
  const tabCalcPuisReactReduct = document.getElementById(
    "tabCalcPuisReactReduct"
  );
  const tabCalcTensReduct = document.getElementById("tabCalcTensReduct");
  const menubtn = document.querySelector("#menubtn");

  // RAZ Bandeau //

  const removeActive = () => {
    writeData();
    tabCalcPuisAct.classList.remove("active");
    tabCalcPuisReact.classList.remove("active");
    tabCalcTens.classList.remove("active");
    tabCalcPuisActReduct.classList.remove("active");
    tabCalcPuisReactReduct.classList.remove("active");
    tabCalcTensReduct.classList.remove("active");
    themeApply();
  };

  // Bascule Calculette Puissance Active //

  const bascCalcPussAct = () => {
    data.start = "calcpa";
    renderPuisAct();
    calcPuisAct();
    removeActive();
    tabCalcPuisAct.classList.add("active");
    tabCalcPuisActReduct.classList.add("active");
  };

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
  };

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
  };

  tabCalcTens.onclick = () => {
    bascCalcTens();
  };

  tabCalcTensReduct.onclick = () => {
    bascCalcTens();
  };

  // Gestion Panneau Menu //

  const toggleMenu = () => {
    menu.classList.toggle("show");
    menubtn.classList.toggle("active");
  };

  const showMenu = () => {
    if (data.timer == 0) {
      data.timer = 1;
      menu.classList.add("show");
      menubtn.classList.add("active");
      setTimeout(function() {
        data.timer = 0;
        menu.classList.remove("show");
        menubtn.classList.remove("active");
      }, 10000);
    } else {
      menu.classList.add("show");
      menubtn.classList.add("active");
    }
  };

  const hideMenu = () => {
    menu.classList.remove("show");
    menubtn.classList.remove("active");
  };

  menubtn.onclick = e => {
    e.stopPropagation();
    e.preventDefault();
    if (data.timer == 0) {
      showMenu();
    } else {
      toggleMenu();
    }
  };

  body.onclick = () => {
    hideMenu();
  };

  menu.onclick = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  // Gestion du tactile //

  var hammertime = new Hammer(container);

  hammertime.on("swiperight", function(e) {
    showMenu();
  });

  hammertime.on("swipeleft", function(e) {
    hideMenu();
  });

  // Passage en theme Dark si necessaire //

  // Application du thème //

  const themeApply = () => {
    const bloccalc = document.querySelector("#bloccalc");
    const blocset = document.querySelector("#blocset");
    if (data.theme == "dark") {
      body.style.setProperty("background-color", "rgba(0, 0, 0, 1)");
      bloccalc.style.setProperty("color", "white");
      blocset.style.setProperty("color", "white");
      nav.style.setProperty("background-color", "rgba(23, 162, 184, 1)");
      nav.style.setProperty("color", "black");
      footer.style.setProperty("background-color", "rgba(23, 162, 184, 1)");
      menu.style.setProperty("background-color", "rgba(23, 162, 184, 0.95)");
      menu.style.setProperty("color", "white");
    } else if (data.theme == "orange") {
      body.style.setProperty("background-color", "rgba(70, 70, 70, 1)");
      bloccalc.style.setProperty("color", "white");
      blocset.style.setProperty("color", "white");
      nav.style.setProperty("background-color", "rgba(255, 130, 0, 9)");
      footer.style.setProperty("background-color", "rgba(255, 130, 0, 0.9)");
      menu.style.setProperty("background-color", "rgba(255, 130, 0, 0.9)");
      menu.style.setProperty("color", "black");
    } else {
      body.style.setProperty("background-color", "rgba(220, 220, 220, 0.1)");
      bloccalc.style.setProperty("color", "initial");
      blocset.style.setProperty("color", "initial");
      nav.style.setProperty("background-color", "rgba(220, 220, 220, 0.7)");
      footer.style.setProperty("background-color", "rgba(220, 220, 220, 0.8)");
      menu.style.setProperty("background-color", "rgba(220, 220, 220, 0.9)");
      menu.style.setProperty("color", "black");
    }
  };

  // Selection du thème //

  theme.addEventListener("change", function() {
    data.themeselect = theme.value;
    if (data.themeselect == "system") {
      // Vérification du  Theme Windows 10 //
      windowsTheme();
    } else {
      data.theme = theme.value;
    }
    writeData();
    themeApply();
  });

  // Lancement par défaut //

  const defStart = async () => {
    // Chargement des données Sauv ou par défaut //

    await readData();

    if (!data.start) {
      bascCalcPussAct();
    } else {
      if (data.start === "calcpa") {
        bascCalcPussAct();
      } else if (data.start === "calcpr") {
        bascCalcPussReact();
      } else if (data.start === "calctens") {
        bascCalcTens();
      }
    }

    // Theme de lancement //"

    if (window.Windows) {
      theme.innerHTML = `
				<option value="system">Système</option>
				<option value="light">Clair</option>
				<option value="dark">Sombre</option>
				<option value="orange">Orange</option>
			`;
      if (data.themeselect == "system") {
        windowsTheme();
      }
      themeApply();
      theme.value = data.themeselect;
    } else {
      themeApply();
      theme.value = data.themeselect;
    }
  };

  defStart();

  // Ajout de Share API si disponible Androïd / Windows 10 UWP //

  shareAPI();

  // Ajout du bouton Insatll PWA si disponible //

  if (window.Windows || window.Android) {
    console.log("Pas d'install PWA");
  } else {
    installPWA();
  }

  // This is the service worker with the Advanced caching

  // Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

  // Check compatibility for the browser we're running this in

  if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
      console.log(
        "[PWA Builder] active service worker found, no need to register"
      );
    } else {
      // Register the service worker
      navigator.serviceWorker
        .register("sw.js", {
          scope: "./"
        })
        .then(function(reg) {
          console.log(
            "[PWA Builder] Service worker has been registered for scope: " +
              reg.scope
          );
        });
    }
  }
});
