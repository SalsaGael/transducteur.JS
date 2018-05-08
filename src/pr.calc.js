import {
    writeData,
    data
} from './data.js'

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
    prMaxHT.value = Math.round(data.prMaxHT * 100) / 100;
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
        data.prMaxHT1 = 303.1 * KP / 1000000;
        data.prMaxHT2 = 372.4 * KP / 1000000;
        data.prMaxHT3 = 433 * KP / 1000000;
        data.prMaxHT4 = 519.6 * KP / 1000000;
        data.prMaxHT5 = 606.2 * KP / 1000000;
        data.prMaxHT6 = 848.7 * KP / 1000000;
        data.prMaxHT7 = 731.8 * KP / 1000000;
        data.prMaxHT8 = 866 * KP / 1000000;
        data.prMaxHT9 = 1074 * KP / 1000000;

        if (data.fprHT == 0) {
            data.prMaxHT = prMaxHT.value;
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
        };
        writeData();

    }

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
        prMaxHT.value = Math.round(data.prMaxHT * 100) / 100;
    }

    // DOM Actualisation //

    KU.addEventListener('change', razAff);

    pTC.addEventListener('change', razAff);

    sTC.addEventListener('change', razAff);

    smaMin.addEventListener('change', razAff);

    smaMax.addEventListener('change', razAff);

    fprHT.addEventListener('change', function () {
        data.fprHT = parseFloat(fprHT.value);
        razAff();
    });

    // Changement de plage réglée //

    prMaxHT.addEventListener('change', function () {
        data.fprHT = 0;
        razAff();
    });

    // Calcul et affichage des valeurs de sorties //

    prHT.addEventListener('change', function () {
        calcConst();
        data.prHT = prHT.value * 1000000;
        data.irBT = data.prHT / (data.KU * 100 * Math.sqrt(3)) / data.KI;
        data.sma = (data.prHT / ((data.prMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);

        irBT.placeholder = Math.round(data.irBT * 1000) / 1000;
        irBT.value = Math.round(data.irBT * 1000) / 1000;
        sma.placeholder = Math.round(data.sma * 100) / 100;
        sma.value = Math.round(data.sma * 100) / 100;
    });
    
    irBT.addEventListener('change', function () {
        calcConst();
        data.irBT = irBT.value;
        data.prHT = data.irBT * data.KI * (data.KU * 100) * Math.sqrt(3);
        data.sma = (data.prHT / ((data.prMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);

        prHT.placeholder = Math.round(data.prHT / 10000) / 100;
        prHT.value = Math.round(data.prHT / 10000) / 100;
        sma.placeholder = Math.round(data.sma * 100) / 100;
        sma.value = Math.round(data.sma * 100) / 100;
    });

    sma.addEventListener('change', function () {
        calcConst();
        data.sma = sma.value - ((data.smaMin + data.smaMax) / 2);
        data.prHT = (data.sma) * (data.prMaxHT * 1000000 / data.smaPlage);
        data.irBT = (data.sma) * (data.prMaxHT * 1000000 / data.smaPlage) / (data.KU * 100 * Math.sqrt(3)) / data.KI;

        prHT.placeholder = Math.round(data.prHT / 10000) / 100;
        prHT.value = Math.round(data.prHT / 10000) / 100;
        irBT.placeholder = Math.round(data.irBT * 1000) / 1000;
        irBT.value = Math.round(data.irBT * 1000) / 1000;
    });
 };

export default calcPuisReact;