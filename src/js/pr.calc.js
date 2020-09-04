import {
  writeData,
  data
} from "./data.js";

const calcPuisReact = () => {
  const prHT = document.getElementById("prHT");
  const irBT = document.getElementById("irBT");
  const sma = document.getElementById("sma");
  const KU = document.getElementById("KU");
  const pTC = document.getElementById("pTC");
  const sTC = document.getElementById("sTC");
  const prMaxHT = document.getElementById("prMaxHT");
  const fprHT = document.getElementById("fprHT");
  const smaMin = document.getElementById("smaMin");
  const smaMax = document.getElementById("smaMax");

  KU.value = data.KU;
  pTC.value = data.pTC;
  sTC.value = data.sTC;
  fprHT.value = data.fprHT;
  smaMin.value = data.smaMin;
  smaMax.value = data.smaMax;

  // Calcul des constantes //

  const calcConst = () => {
    // Calculer les constantes //

    const KI = pTC.value / sTC.value;
    const KP = KU.value * KI;

    // Stocker les datas constantes //

    data.KU = parseFloat(KU.value);
    data.KI = KI;
    data.KP = KP;
    data.pTC = parseFloat(pTC.value);
    data.sTC = parseFloat(sTC.value);
    data.smaMin = parseFloat(smaMin.value);
    data.smaMax = parseFloat(smaMax.value);
    data.smaPlage = (data.smaMax - data.smaMin) / 2;
    data.prMaxHT1 = 303.1 * KP;
    data.prMaxHT2 = 372.4 * KP;
    data.prMaxHT3 = 433 * KP;
    data.prMaxHT4 = 519.6 * KP;
    data.prMaxHT5 = 606.2 * KP;
    data.prMaxHT6 = 848.7 * KP;
    data.prMaxHT7 = 731.8 * KP;
    data.prMaxHT8 = 866 * KP;
    data.prMaxHT9 = 1074 * KP;

    if (data.fprHT == 0) {
      data.prMaxHT = prMaxHT.value * 1000000;
      fprHT.value = 0;
    } else if (data.fprHT == 1) {
      data.prMaxHT = data.prMaxHT1;
      fprHT.value = 1;
    } else if (data.fprHT == 2) {
      data.prMaxHT = data.prMaxHT2;
      fprHT.value = 2;
    } else if (data.fprHT == 3) {
      data.prMaxHT = data.prMaxHT3;
      fprHT.value = 3;
    } else if (data.fprHT == 4) {
      data.prMaxHT = data.prMaxHT4;
      fprHT.value = 4;
    } else if (data.fprHT == 5) {
      data.prMaxHT = data.prMaxHT5;
      fprHT.value = 5;
    } else if (data.fprHT == 6) {
      data.prMaxHT = data.prMaxHT6;
      fprHT.value = 6;
    } else if (data.fprHT == 7) {
      data.prMaxHT = data.prMaxHT7;
      fprHT.value = 7;
    } else if (data.fprHT == 8) {
      data.prMaxHT = data.prMaxHT8;
      fprHT.value = 8;
    } else if (data.fprHT == 9) {
      data.prMaxHT = data.prMaxHT9;
      fprHT.value = 9;
    }

    data.irMaxBT =
      Math.round(
        (data.prMaxHT / (data.KU * 100 * Math.sqrt(3)) / data.KI) * 100
      ) / 100;

    writeData();
  };

  // Actualisation du DOM sur changement de valeurs paramétres //

  // Effacement Caculette //

  const razAff = () => {
    prHT.placeholder = `Entrez la valeur`;
    prHT.value = ``;
    irBT.placeholder = `Entrez la valeur`;
    irBT.value = ``;
    sma.placeholder = `Entrez la valeur`;
    sma.value = ``;
    calcConst();
    prMaxHT.value = Math.round(data.prMaxHT / 1000) / 1000;
    prMaxHT.placeholder = Math.round(data.prMaxHT / 1000) / 1000;
  };

  razAff();

  // DOM Actualisation //

  KU.addEventListener("change", razAff);

  pTC.addEventListener("change", razAff);

  sTC.addEventListener("change", razAff);

  smaMin.addEventListener("change", razAff);

  smaMax.addEventListener("change", razAff);

  fprHT.addEventListener("change", function () {
    data.fprHT = fprHT.value;
    razAff();
  });

  // Changement de plage réglée //

  prMaxHT.addEventListener("change", function () {
    data.fprHT = 0;
    razAff();
  });

  // Calcul et affichage des valeurs de sorties //
  // Entrée hors limite //
  const horsLimite = () => {
    prHT.placeholder = "Hors limite";
    prHT.value = "Hors limite";
    irBT.placeholder = "Hors limite";
    irBT.value = "Hors limite";
    sma.placeholder = "Hors limite";
    sma.value = "Hors limite";
  };

  // Affichage des résultats //
  const affResult = () => {
    prHT.placeholder = Math.round(data.prHT / 1000) / 1000;
    prHT.value = Math.round(data.prHT / 1000) / 1000;
    irBT.placeholder = Math.round(data.irBT * 1000) / 1000;
    irBT.value = Math.round(data.irBT * 1000) / 1000;
    sma.placeholder = Math.round(data.sma * 100) / 100;
    sma.value = Math.round(data.sma * 100) / 100;
    writeData();
  };

  prHT.addEventListener("change", function () {
    calcConst();
    if (prHT.value * 1000000 > data.prMaxHT) {
      horsLimite();
    } else if (prHT.value * 1000000 < -data.prMaxHT) {
      horsLimite();
    } else {
      data.prHT = prHT.value * 1000000;
      data.irBT = data.prHT / (data.KU * 100 * Math.sqrt(3)) / data.KI;
      data.sma =
        data.prHT / (data.prMaxHT / data.smaPlage) +
        (data.smaMin + data.smaMax) / 2;
      affResult();
    }
  });

  irBT.addEventListener("change", function () {
    calcConst();
    if (irBT.value > data.irMaxBT) {
      horsLimite();
    } else if (irBT.value < -data.irMaxBT) {
      horsLimite();
    } else {
      data.irBT = irBT.value;
      data.prHT = data.irBT * data.KI * (data.KU * 100) * Math.sqrt(3);
      data.sma =
        data.prHT / (data.prMaxHT / data.smaPlage) +
        (data.smaMin + data.smaMax) / 2;
      affResult();
    }
  });

  sma.addEventListener("change", function () {
    calcConst();
    if (sma.value > data.smaMax) {
      horsLimite();
    } else if (sma.value < data.smaMin) {
      horsLimite();
    } else {
      data.sma = sma.value;
      data.prHT =
        (data.sma - (data.smaMin + data.smaMax) / 2) *
        (data.prMaxHT / data.smaPlage);
      data.irBT =
        ((data.sma - (data.smaMin + data.smaMax) / 2) *
          (data.prMaxHT / data.smaPlage)) /
        (data.KU * 100 * Math.sqrt(3)) /
        data.KI;
      affResult();
    }
  });
};

export default calcPuisReact;