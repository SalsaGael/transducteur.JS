import {
    writeData,
    readData,
    data,
} from './data.js'

    const calcPuisReact = ()=> {
     
    const prHT = document.getElementById("prHT");
    const irBT = document.getElementById("irBT");
    const sma = document.getElementById("sma");
    const KU = document.getElementById("KU");
    const pTC = document.getElementById("pTC");
    const sTC = document.getElementById("sTC");
    const prMaxHT = document.getElementById("prMaxHT");
    const prMaxHTS = document.getElementById("prMaxHTS");
    const prMaxHT1 = document.getElementById("prMaxHT1");
    const prMaxHT2 = document.getElementById("prMaxHT2");
    const prMaxHT3 = document.getElementById("prMaxHT3");
    const prMaxHT4 = document.getElementById("prMaxHT4");
    const prMaxHT5 = document.getElementById("prMaxHT5");
    const prMaxHT6 = document.getElementById("prMaxHT6");
    const prMaxHT7 = document.getElementById("prMaxHT7");
    const prMaxHT8 = document.getElementById("prMaxHT8");
    const prMaxHT9 = document.getElementById("prMaxHT9");
    const smaMin = document.getElementById("smaMin");
    const smaMax = document.getElementById("smaMax");


    // Calcul des constantes //

    function calcConst() {

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
        data.prMaxHT = parseFloat(prMaxHT.value);
        data.prMaxHT1 = 303.1 * KP / 1000000;
        data.prMaxHT2 = 372.4 * KP / 1000000;
        data.prMaxHT3 = 433 * KP / 1000000;
        data.prMaxHT4 = 519.6 * KP / 1000000;
        data.prMaxHT5 = 606.2 * KP / 1000000;
        data.prMaxHT6 = 848.7 * KP / 1000000;
        data.prMaxHT7 = 731.8 * KP / 1000000;
        data.prMaxHT8 = 866 * KP / 1000000;
        data.prMaxHT9 = 1074 * KP / 1000000;
        writeData();
        prMaxHT1.value = data.prMaxHT1;
        prMaxHT2.value = data.prMaxHT2;
        prMaxHT3.value = data.prMaxHT3;
        prMaxHT4.value = data.prMaxHT4;
        prMaxHT5.value = data.prMaxHT5;
        prMaxHT6.value = data.prMaxHT6;
        prMaxHT7.value = data.prMaxHT7;
        prMaxHT8.value = data.prMaxHT8;
        prMaxHT9.value = data.prMaxHT9;
    }

    calcConst();

    // Actualisation du DOM sur changement de valeurs paramétres //

        // DOM Actualisation //

        function ActuaDOM() {
            calcConst();
            data.prMaxHT = parseFloat(prMaxHTS.value);
            prMaxHT.value = Math.round(data.prMaxHT * 100) / 100;
            writeData();
            prHT.placeholder = `Entrez la valeur`;
            prHT.value = ``;
            irBT.placeholder = `Entrez la valeur`;
            irBT.value = ``;
            sma.placeholder = `Entrez la valeur`;
            sma.value = ``;
        }

     document.getElementById("KU").addEventListener('change', ActuaDOM);
     document.getElementById("pTC").addEventListener('change', ActuaDOM);
     document.getElementById("sTC").addEventListener('change', ActuaDOM);
     document.getElementById("prMaxHTS").addEventListener('change', ActuaDOM);
 
    // Calcul et affichage des valeurs de sorties //

    document.getElementById("prHT").addEventListener('change', function () {
        calcConst();
        data.prHT = prHT.value * 1000000;
        data.irBT = data.prHT / (data.KU * 100 * Math.sqrt(3)) / data.KI;
        data.sma = (data.prHT / ((data.prMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);
   
        irBT.placeholder = Math.round(data.irBT * 1000) / 1000;
        irBT.value = Math.round(data.irBT * 1000) / 1000;
        sma.placeholder = Math.round(data.sma * 100) / 100;
        sma.value = Math.round(data.sma * 100) / 100;
        writeData();
    });
   
    document.getElementById("irBT").addEventListener('change', function () {
        calcConst();
        data.irBT = irBT.value;
        data.prHT = data.irBT * data.KI * (data.KU * 100) * Math.sqrt(3);
        data.sma = (data.prHT / ((data.prMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);
   
        prHT.placeholder = Math.round(data.prHT / 10000) / 100;
        prHT.value = Math.round(data.prHT / 10000) / 100;
        sma.placeholder = Math.round(data.sma * 100) / 100;
        sma.value = Math.round(data.sma * 100) / 100;
        writeData();
    });
   
     document.getElementById("sma").addEventListener('change', function () {
        calcConst();
        data.sma = sma.value - ((data.smaMin + data.smaMax) / 2);
        data.prHT = (data.sma) * (data.prMaxHT * 1000000 / data.smaPlage);
        data.irBT = (data.sma) * (data.prMaxHT * 1000000 / data.smaPlage) / (data.KU * 100 * Math.sqrt(3)) / data.KI;
   
        prHT.placeholder = Math.round(data.prHT / 10000) / 100;
        prHT.value = Math.round(data.prHT / 10000) / 100;
        irBT.placeholder = Math.round(data.irBT * 1000) / 1000;
        irBT.value = Math.round(data.irBT * 1000) / 1000;
        writeData();
    });
 };

 export default calcPuisReact;