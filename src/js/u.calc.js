import { writeData, data } from "./data.js";

const calcTens = () => {
  // Liaison avec le DOM //

  let vHT = document.getElementById("vHT");
  let uHT = document.getElementById("uHT");
  let vBT = document.getElementById("vBT");
  let uBT = document.getElementById("uBT");
  let vsma = document.getElementById("vsma");
  let fuHT = document.getElementById("fuHT");
  let fuHT1 = document.getElementById("fuHT1");
  let fuHT2 = document.getElementById("fuHT2");
  let KU = document.getElementById("KU");
  let uMin = document.getElementById("uMin");
  let uMax = document.getElementById("uMax");
  let smaMinU = document.getElementById("smaMinU");
  let smaMaxU = document.getElementById("smaMaxU");

  KU.value = data.KU;
  fuHT.value = data.fuHT;
  smaMinU.value = data.smaMinU;
  smaMaxU.value = data.smaMaxU;

  // Calcul des constantes //

  function calcConst() {
    // Calculer les constantes //

    let smaPlageU = smaMaxU.value - smaMinU.value;
    let bvMin = (uMin.value * 1000) / KU.value / Math.sqrt(3);
    let bvMax = (uMax.value * 1000) / KU.value / Math.sqrt(3);
    let buMin = (uMin.value * 1000) / KU.value;
    let buMax = (uMax.value * 1000) / KU.value;
    let faMin =
      smaPlageU *
      (1 - Math.pow(bvMax, 2) / (Math.pow(bvMax, 2) - Math.pow(bvMin, 2)));
    let faMax = smaPlageU / (Math.pow(bvMax, 2) - Math.pow(bvMin, 2));
    let faMoo = (smaPlageU - faMin) / faMax;
    let faTot = Math.sqrt(faMoo);

    // Stocker les datas constantes //
    data.smaPlageU = Number.parseFloat(smaPlageU);
    data.KU = Number.parseFloat(KU.value);
    data.bvMin = Number.parseFloat(bvMin);
    data.bvMax = Number.parseFloat(bvMax);
    data.faMin = Number.parseFloat(faMin);
    data.faMax = Number.parseFloat(faMax);
    data.faMoo = Number.parseFloat(faMoo);
    data.faTot = Number.parseFloat(faTot);
    data.smaMinU = Number.parseFloat(smaMinU.value);
    data.smaMaxU = Number.parseFloat(smaMaxU.value);
  }

  // Sélection famille //

  const calcFam = () => {
    calcConst();
    if (data.fuHT == 0) {
      data.uMin = uMin.value * 1000;
      data.uMax = uMax.value * 1000;
    } else if (data.fuHT == 1) {
      uMin.value = 0;
      uMax.value = Math.round((data.KU * 124) / 10) / 100;
      data.uMin = 0;
      data.uMax = data.KU * 124;
    } else if (data.fuHT == 2) {
      data.fuHT = 2;
      uMin.value = Math.round((data.KU * 78) / 10) / 100;
      uMax.value = Math.round((data.KU * 121.25) / 10) / 100;
      data.uMin = data.KU * 78;
      data.uMax = data.KU * 121.25;
    }
    data.vMin = data.uMin / Math.sqrt(3);
    data.vMax = data.uMax / Math.sqrt(3);
    writeData();
  };

  calcFam();

  // Evenements //

  // Changement de Famille //

  document.getElementById("fuHT").addEventListener("change", function() {
    data.fuHT = fuHT.value;
    calcFam();
  });

  // Plage réglée //

  document.getElementById("uMin").addEventListener("change", function() {
    data.fuHT = 0;
    fuHT.value = 0;
    calcFam();
  });

  document.getElementById("uMax").addEventListener("change", function() {
    data.fuHT = 0;
    fuHT.value = 0;
    calcFam();
  });

  // Changement rapport TT //

  document.getElementById("KU").addEventListener("change", function() {
    calcFam();
    vHT.placeholder = `Entrez la valeur`;
    vHT.value = ``;
    uHT.placeholder = `Entrez la valeur`;
    uHT.value = ``;
    vsma.placeholder = `Entrez la valeur`;
    vsma.value = ``;
    vBT.placeholder = `Entrez la valeur`;
    vBT.value = ``;
  });

  // Calcul et affichage des valeurs de smaPlageUs //

  // Entrée hors limite //
  const horsLimite = () => {
    vHT.placeholder = "Hors limite";
    vHT.value = "";
    uHT.placeholder = "Hors limite";
    uHT.value = "";
    vBT.placeholder = "Hors limite";
    vBT.value = "";
    uBT.placeholder = "Hors limite";
    uBT.value = "";
    vsma.placeholder = "Hors limite";
    vsma.value = "";
  };

  // Affichage des résultats //
  const affResult = () => {
    uHT.placeholder = Math.round(data.uHT / 10) / 100;
    uHT.value = Math.round(data.uHT / 10) / 100;
    vHT.placeholder = Math.round(data.vHT / 10) / 100;
    vHT.value = Math.round(data.vHT / 10) / 100;
    uBT.placeholder = Math.round(data.uBT * 100) / 100;
    uBT.value = Math.round(data.uBT * 100) / 100;
    vBT.placeholder = Math.round(data.vBT * 100) / 100;
    vBT.value = Math.round(data.vBT * 100) / 100;
    vsma.placeholder = Math.round((data.sma + data.smaMinU) * 100) / 100;
    vsma.value = Math.round((data.sma + data.smaMinU) * 100) / 100;
    writeData();
  };

  document.getElementById("uHT").addEventListener("change", function() {
    calcConst();
    if (uHT.value * 1000 < data.uMin) {
      horsLimite();
    } else if (uHT.value * 1000 > data.uMax) {
      horsLimite();
    } else {
      data.uHT = uHT.value * 1000;
      data.vHT = data.uHT / Math.sqrt(3);
      data.vBT = data.uHT / Math.sqrt(3) / data.KU;
      data.uBT = data.uHT / data.KU;
      console.log(data.faMax, data.faMin, data.vBT);
      data.sma = data.vBT * data.vBT * data.faMax + data.faMin;

      affResult();
    }
  });

  document.getElementById("vHT").addEventListener("change", function() {
    calcConst();
    if (vHT.value * 1000 < data.vMin) {
      horsLimite();
    } else if (vHT.value * 1000 > data.vMax) {
      horsLimite();
    } else {
      data.vHT = vHT.value * 1000;
      data.uHT = data.vHT * Math.sqrt(3);
      data.vBT = data.vHT / data.KU;
      data.uBT = data.vBT * Math.sqrt(3);
      data.sma = Math.pow(data.vBT, 2) * data.faMax + data.faMin;

      affResult();
    }
  });

  document.getElementById("uBT").addEventListener("change", function() {
    calcConst();
    if (uBT.value < data.buMin) {
      horsLimite();
    } else if (uBT.value > data.buMax) {
      horsLimite();
    } else {
      data.uBT = uBT.value;
      data.vBT = data.uBT / Math.sqrt(3);
      data.vHT = (data.uBT / Math.sqrt(3)) * data.KU;
      data.uHT = data.uBT * data.KU;
      data.sma = Math.pow(data.vBT, 2) * data.faMax + data.faMin;

      affResult();
    }
  });

  document.getElementById("vBT").addEventListener("change", function() {
    calcConst();
    if (vBT.value < data.bvMin) {
      horsLimite();
    } else if (vBT.value > data.bvMax) {
      horsLimite();
    } else {
      data.vBT = vBT.value;
      data.uBT = data.vBT * Math.sqrt(3);
      data.vHT = data.vBT * data.KU;
      data.uHT = data.vBT * data.KU * Math.sqrt(3);
      data.sma = Math.pow(data.vBT, 2) * data.faMax + data.faMin;

      affResult();
    }
  });

  document.getElementById("vsma").addEventListener("change", function() {
    calcConst();
    if (vsma.value < data.smaMinU) {
      horsLimite();
    } else if (vsma.value > data.smaMaxU) {
      horsLimite();
    } else {
      data.sma = vsma.value - data.smaMinU;
      data.vHT = Math.sqrt((data.sma - data.faMin) / data.faMax) * data.KU;
      data.uHT =
        Math.sqrt((data.sma - data.faMin) / data.faMax) *
        data.KU *
        Math.sqrt(3);
      data.vBT = Math.sqrt((data.sma - data.faMin) / data.faMax);
      data.uBT = Math.sqrt((data.sma - data.faMin) / data.faMax) * Math.sqrt(3);

      affResult();
    }
  });
};

export default calcTens;
