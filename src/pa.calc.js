import {
    writeData,
    data
} from './data.js';

const calcPuisAct = () => {

    const paHT = document.getElementById("paHT");
    const iaBT = document.getElementById("iaBT");
    const sma = document.getElementById("sma");
    const KU = document.getElementById("KU");
    const pTC = document.getElementById("pTC");
    const sTC = document.getElementById("sTC");
    const paMaxHT = document.getElementById("paMaxHT");
    const fpaHT = document.getElementById("fpaHT");
    const smaMin = document.getElementById("smaMin");
    const smaMax = document.getElementById("smaMax");

    KU.value = data.KU;
    pTC.value = data.pTC;
    sTC.value = data.sTC;
    fpaHT.value = data.fpaHT;
    paMaxHT.value = Math.round(data.paMaxHT * 100) / 100;
    smaMin.value = data.smaMin;
    smaMax.value = data.smaMax;
    
    // Calcul des constantes //

    const calcConst = ()=> {

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
        data.paMaxHT1 = 606.2 * KP / 1000000;
        data.paMaxHT2 = 744.8 * KP / 1000000;
        data.paMaxHT3 = 866 * KP / 1000000;
        data.paMaxHT4 = 1039 * KP / 1000000;
        data.paMaxHT5 = 1212 * KP / 1000000;
        data.paMaxHT6 = 1464 * KP / 1000000;
        data.paMaxHT8 = 1732 * KP / 1000000;
        data.paMaxHT9 = 2148 * KP / 1000000;

        if (data.fpaHT == 0) {
            data.paMaxHT = paMaxHT.value;
            fpaHT.value = 0;
        } else if (data.fpaHT == 1) {
            data.paMaxHT = data.paMaxHT1;
            fpaHT.value = 1;
        } else if (data.fpaHT == 2) {
            data.paMaxHT = data.paMaxHT2;
            fpaHT.value = 2;
        } else if (data.fpaHT == 3) {
            data.paMaxHT = data.paMaxHT3;
            fpaHT.value = 3;
        } else if (data.fpaHT == 4) {
            data.paMaxHT = data.paMaxHT4;
            fpaHT.value = 4;
        } else if (data.fpaHT == 5) {
            data.paMaxHT = data.paMaxHT5;
            dfpaHT.value = 5;
        } else if (data.fpaHT == 6) {
            data.paMaxHT = data.paMaxHT6;
            fpaHT.value = 6;
        } else if (data.fpaHT == 7) {
            data.paMaxHT = data.paMaxHT7;
            fpaHT.value = 7;
        } else if (data.fpaHT == 8) {
            data.paMaxHT = data.paMaxHT8;
            fpaHT.value = 8;
        } else if (data.fpaHT == 9) {
            data.paMaxHT = data.paMaxHT9;
            fpaHT.value = 9;
        };
        writeData();
    }

    // Actualisation du DOM sur changement de valeurs paramétres //

    // Effacement Caculette //

    const razAff = () => {
        paHT.placeholder = `Entrez la valeur`;
        paHT.value = ``;
        iaBT.placeholder = `Entrez la valeur`;
        iaBT.value = ``;
        sma.placeholder = `Entrez la valeur`;
        sma.value = ``;
        calcConst();
        paMaxHT.value = Math.round(data.paMaxHT * 100) / 100;
    }

    // DOM Actualisation //

    KU.addEventListener('change', razAff);

    pTC.addEventListener('change', razAff);

    sTC.addEventListener('change', razAff);

    smaMin.addEventListener('change', razAff);

    smaMax.addEventListener('change', razAff);

    fpaHT.addEventListener('change', function () {
        data.fpaHT = fpaHT.value;
        razAff();
    });

    // Changement de plage réglée //

    paMaxHT.addEventListener('change', function () {
        data.fpaHT = 0;
        razAff();
    });

    // Calcul et affichage des valeurs de sorties //

    paHT.addEventListener('change', function () {
        calcConst();
        data.paHT = paHT.value * 1000000;
        data.iaBT = data.paHT / (data.KU * 100 * Math.sqrt(3)) / data.KI;
        data.sma = (data.paHT / ((data.paMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);

        iaBT.placeholder = Math.round(data.iaBT * 1000) / 1000;
        iaBT.value = Math.round(data.iaBT * 1000) / 1000;
        sma.placeholder = Math.round(data.sma * 100) / 100;
        sma.value = Math.round(data.sma * 100) / 100;
    });

    iaBT.addEventListener('change', function () {
        calcConst();
        data.iaBT = iaBT.value;
        data.paHT = data.iaBT * data.KI * (data.KU * 100) * Math.sqrt(3);
        data.sma = (data.paHT / ((data.paMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);

        paHT.placeholder = Math.round(data.paHT / 10000) / 100;
        paHT.value = Math.round(data.paHT / 10000) / 100;
        sma.placeholder = Math.round(data.sma * 100) / 100;
        sma.value = Math.round(data.sma * 100) / 100;
    });

    sma.addEventListener('change', function () {
        calcConst();
        data.sma = sma.value - ((data.smaMin + data.smaMax) / 2);
        data.paHT = (data.sma) * (data.paMaxHT * 1000000 / data.smaPlage);
        data.iaBT = (data.sma) * (data.paMaxHT * 1000000 / data.smaPlage) / (data.KU * 100 * Math.sqrt(3)) / data.KI;

        paHT.placeholder = Math.round(data.paHT / 10000) / 100;
        paHT.value = Math.round(data.paHT / 10000) / 100;
        iaBT.placeholder = Math.round(data.iaBT * 1000) / 1000;
        iaBT.value = Math.round(data.iaBT * 1000) / 1000;
    });
};

export default calcPuisAct;