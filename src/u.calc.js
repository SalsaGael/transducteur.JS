import {
    writeData,
    readData,
    data,
} from './data.js'

const calcTens = () => {

    // Liaison avec le DOM //

    let vHT = document.getElementById("vHT");
    let uHT = document.getElementById("uHT");
    let vBT = document.getElementById("vBT");
    let vsma = document.getElementById("vsma");
    let fuHTS = document.getElementById("fuHTS");
    let fuHT0 = document.getElementById("fuHT0");
    let fuHT1 = document.getElementById("fuHT1");
    let fuHT2 = document.getElementById("fuHT2");
    let KU = document.getElementById("KU");
    let uMin = document.getElementById("uMin");
    let uMax = document.getElementById("uMax");
    let smaMinU = document.getElementById("smaMinU");
    let smaMaxU = document.getElementById("smaMaxU");

    smaMinU.value = data.smaMinU;
    smaMaxU.value = data.smaMaxU;
    fuHTS.value = data.fuHTS;
    KU.value = data.KU;

    // Calcul des constantes //

    function calcConst() {

        // Calculer les constantes //

        let smaPlageU = smaMaxU.value - smaMinU.value;
        let vMin = uMin.value / Math.sqrt(3);
        let vMax = uMax.value / Math.sqrt(3);
        let bvMin = uMin.value * 1000 / KU.value / Math.sqrt(3);
        let bvMax = uMax.value * 1000 / KU.value / Math.sqrt(3);
        let buMin = uMin.value * 1000 / KU.value;
        let buMax = uMax.value * 1000 / KU.value;
        let faMin = smaPlageU * (1 - Math.pow(bvMax, 2) / (Math.pow(bvMax, 2) - Math.pow(bvMin, 2)));
        let faMax = smaPlageU / (Math.pow(bvMax, 2) - Math.pow(bvMin, 2));
        let faMoo = (smaPlageU - faMin) / faMax;
        let faTot = Math.sqrt(faMoo);

        // Stocker les datas constantes //
        data.smaPlageU = parseFloat(smaPlageU);
        data.KU = parseFloat(KU.value);
        data.uMin = parseFloat(uMin.value);
        data.uMax = parseFloat(uMax.value);
        data.faMin = parseFloat(faMin);
        data.faMax = parseFloat(faMax);
        data.faMoo = parseFloat(faMoo);
        data.faTot = parseFloat(faTot);
        data.smaMinU = parseFloat(smaMinU.value);
        data.smaMaxU = parseFloat(smaMaxU.value);
    }

    // Sélection famille //

    const razAff = () => {
        calcConst();
        if (data.fuHTS == 0) {
            fuHTS.value = 0;
            data.uMin = parseFloat(uMin.value);
            data.uMax = parseFloat(uMax.value);
        } else if (data.fuHTS == 1) {
            fuHTS.value = 1;
            uMin.value = 0;
            uMax.value = Math.round(data.KU * 124 / 10) / 100;
            data.uMin = parseFloat(uMin.value);
            data.uMax = parseFloat(uMax.value);
        } else if (data.fuHTS == 2) {
            fuHTS.value = 2;
            uMin.value = Math.round(data.KU * 78 / 10) / 100;
            uMax.value = Math.round(data.KU * 121.25 / 10) / 100;
            data.uMin = parseFloat(uMin.value);
            data.uMax = parseFloat(uMax.value);
        }
        vHT.placeholder = `Entrez la valeur`;
        vHT.value = ``;
        uHT.placeholder = `Entrez la valeur`;
        uHT.value = ``;
        vsma.placeholder = `Entrez la valeur`;
        vsma.value = ``;
        vBT.placeholder = `Entrez la valeur`;
        vBT.value = ``;
        writeData();
    }

    razAff();

    // Evenements //

    // Changement de Famille //

    fuHTS.addEventListener('change', function () {
        data.fuHTS = fuHTS.value;
        razAff()
    });

    // Changement de plage réglée //

    uMin.addEventListener('change', function () {
        data.fuHTS = 0;
        razAff()
    });

    uMax.addEventListener('change', function () {
        data.fuHTS = 0;
        razAff()
    });

    // Changement rapport TT //

    KU.addEventListener('change', function () {
        razAff();
    });

    // Changement des valeurs Min Max de sortie mA //

    smaMinU.addEventListener('change', function () {
        razAff();
    });

    smaMaxU.addEventListener('change', function () {
        razAff();
    });

    // Calcul et affichage des valeurs  //

    uHT.addEventListener('change', function () {
        calcConst();

        data.uHT = parseFloat(uHT.value * 1000);
        data.vHT = data.uHT / Math.sqrt(3);
        data.vBT = data.uHT / Math.sqrt(3) / data.KU;
        data.sma = ((data.vBT * data.vBT * data.faMax) + data.faMin);

        vHT.placeholder = Math.round(data.vHT / 10) / 100;
        vHT.value = Math.round(data.vHT / 10) / 100;
        vBT.placeholder = Math.round(data.vBT * 100) / 100;
        vBT.value = Math.round(data.vBT * 100) / 100;
        vsma.placeholder = Math.round((data.sma + data.smaMinU) * 100) / 100;
        vsma.value = Math.round((data.sma + data.smaMinU) * 100) / 100;

        writeData();
    });

    vHT.addEventListener('change', function () {
        calcConst();

        data.vHT = parseFloat(vHT.value * 1000);
        data.uHT = data.vHT * Math.sqrt(3);
        data.vBT = data.vHT / data.KU;
        data.sma = ((data.vBT * data.vBT * data.faMax) + data.faMin);

        uHT.placeholder = Math.round(data.uHT * 1000) / 1000;
        uHT.value = Math.round(data.uHT / 10) / 100;
        vBT.placeholder = Math.round(data.vBT * 100) / 100;
        vBT.value = Math.round(data.vBT * 100) / 100;
        vsma.placeholder = Math.round((data.sma + data.smaMinU) * 100) / 100;
        vsma.value = Math.round((data.sma + data.smaMinU) * 100) / 100;

        writeData();
    });

    vBT.addEventListener('change', function () {
        calcConst();

        data.vBT = parseFloat(vBT.value);
        data.vHT = data.vBT * data.KU;
        data.uHT = data.vBT * data.KU * Math.sqrt(3);
        data.sma = ((data.vBT * data.vBT * data.faMax) + data.faMin);

        vHT.placeholder = Math.round(data.vHT * 1000) / 1000;
        vHT.value = Math.round(data.vHT / 10) / 100;
        uHT.placeholder = Math.round(data.uHT * 1000) / 1000;
        uHT.value = Math.round(data.uHT / 10) / 100;
        vsma.placeholder = Math.round((data.sma + data.smaMinU) * 100) / 100;
        vsma.value = Math.round((data.sma + data.smaMinU) * 100) / 100;

        writeData();
    });

    vsma.addEventListener('change', function () {
        calcConst();


        data.sma = parseFloat(vsma.value) - data.smaMinU;
        data.vHT = Math.sqrt((data.sma - data.faMin) / data.faMax) * data.KU;
        data.uHT = Math.sqrt((data.sma - data.faMin) / data.faMax) * data.KU * Math.sqrt(3);
        data.vBT = Math.sqrt((data.sma - data.faMin) / data.faMax);

        vHT.placeholder = Math.round(data.vHT * 1000) / 1000;
        vHT.value = Math.round(data.vHT / 10) / 100;
        uHT.placeholder = Math.round(data.uHT * 1000) / 1000;
        uHT.value = Math.round(data.uHT / 10) / 100;
        vBT.placeholder = Math.round(data.vBT * 100) / 100;
        vBT.value = Math.round(data.vBT * 100) / 100;

        writeData();
    });
};

export default calcTens;