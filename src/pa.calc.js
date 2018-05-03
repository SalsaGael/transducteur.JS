import {
    writeData,
    data
} from './data.js';

const calcPuisAct = ()=> {
 
 const paHT = document.getElementById("paHT");
 const iaBT = document.getElementById("iaBT");
 const sma = document.getElementById("sma");
 const KU = document.getElementById("KU");
 const pTC = document.getElementById("pTC");
 const sTC = document.getElementById("sTC");
 const paMaxHT = document.getElementById("paMaxHT");
 const paMaxHTS = document.getElementById("paMaxHTS");
 const paMaxHT1 = document.getElementById("paMaxHT1");
 const paMaxHT2 = document.getElementById("paMaxHT2");
 const paMaxHT3 = document.getElementById("paMaxHT3");
 const paMaxHT4 = document.getElementById("paMaxHT4");
 const paMaxHT5 = document.getElementById("paMaxHT5");
 const paMaxHT6 = document.getElementById("paMaxHT6");
 const paMaxHT8 = document.getElementById("paMaxHT8");
 const paMaxHT9 = document.getElementById("paMaxHT9");
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
     data.paMaxHT = parseFloat(paMaxHT.value);
     data.paMaxHT1 = 606.2 * KP / 1000000;
     data.paMaxHT2 = 744.8 * KP / 1000000;
     data.paMaxHT3 = 866 * KP / 1000000;
     data.paMaxHT4 = 1039 * KP / 1000000;
     data.paMaxHT5 = 1212 * KP / 1000000;
     data.paMaxHT6 = 1464 * KP / 1000000;
     data.paMaxHT8 = 1732 * KP / 1000000;
     data.paMaxHT9 = 2148 * KP / 1000000;
     writeData();
     paMaxHT1.value = data.paMaxHT1;
     paMaxHT2.value = data.paMaxHT2;
     paMaxHT3.value = data.paMaxHT3;
     paMaxHT4.value = data.paMaxHT4;
     paMaxHT5.value = data.paMaxHT5;
     paMaxHT6.value = data.paMaxHT6;
     paMaxHT8.value = data.paMaxHT8;
     paMaxHT9.value = data.paMaxHT9;
 }

 calcConst();

     // Actualisation du DOM sur changement de valeurs paramétres //

        // DOM Actualisation //

        function ActuaDOM() {
            calcConst();
            data.paMaxHT = parseFloat(paMaxHTS.value);
            paMaxHT.value = Math.round(data.paMaxHT * 100) / 100;
            writeData();
        }

     document.getElementById("KU").addEventListener('change', ActuaDOM);
     document.getElementById("pTC").addEventListener('change', ActuaDOM);
     document.getElementById("sTC").addEventListener('change', ActuaDOM);
     document.getElementById("paMaxHTS").addEventListener('change', ActuaDOM);

  document.getElementById("paMaxHTS").addEventListener('change', function () {
     calcConst();
     data.paMaxHT = parseFloat(paMaxHTS.value);
     paMaxHT.value = Math.round(data.paMaxHT * 100) / 100;
     writeData();
     paHT.placeholder = `Entrez la valeur`;
     paHT.value = ``;
     iaBT.placeholder = `Entrez la valeur`;
     iaBT.value = ``;
     sma.placeholder = `Entrez la valeur`;
     sma.value = ``;
 });


 // Calcul et affichage des valeurs de sorties //

 document.getElementById("paHT").addEventListener('change', function () {
     calcConst();
     data.paHT = paHT.value * 1000000;
     data.iaBT = data.paHT / (data.KU * 100 * Math.sqrt(3)) / data.KI;
     data.sma = (data.paHT / ((data.paMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);

     iaBT.placeholder = Math.round(data.iaBT * 1000) / 1000;
     iaBT.value = Math.round(data.iaBT * 1000) / 1000;
     sma.placeholder = Math.round(data.sma * 100) / 100;
     sma.value = Math.round(data.sma * 100) / 100;
     writeData();
 });

 document.getElementById("iaBT").addEventListener('change', function () {
     calcConst();
     data.iaBT = iaBT.value;
     data.paHT = data.iaBT * data.KI * (data.KU * 100) * Math.sqrt(3);
     data.sma = (data.paHT / ((data.paMaxHT * 1000000) / data.smaPlage)) + ((data.smaMin + data.smaMax) / 2);

     paHT.placeholder = Math.round(data.paHT / 10000) / 100;
     paHT.value = Math.round(data.paHT / 10000) / 100;
     sma.placeholder = Math.round(data.sma * 100) / 100;
     sma.value = Math.round(data.sma * 100) / 100;
     writeData();
 });

  document.getElementById("sma").addEventListener('change', function () {
     calcConst();
     data.sma = sma.value - ((data.smaMin + data.smaMax) / 2);
     data.paHT = (data.sma) * (data.paMaxHT * 1000000 / data.smaPlage);
     data.iaBT = (data.sma) * (data.paMaxHT * 1000000 / data.smaPlage) / (data.KU * 100 * Math.sqrt(3)) / data.KI;

     paHT.placeholder = Math.round(data.paHT / 10000) / 100;
     paHT.value = Math.round(data.paHT / 10000) / 100;
     iaBT.placeholder = Math.round(data.iaBT * 1000) / 1000;
     iaBT.value = Math.round(data.iaBT * 1000) / 1000;
     writeData();
 });
 };

 export default calcPuisAct;