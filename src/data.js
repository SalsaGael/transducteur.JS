import renderPuisAct from './pa.render.js';
import calcPuisAct from './pa.calc.js';

let data_json;
let data;

const writeData = () => {
    data_json = JSON.stringify(data);
    localStorage.removeItem("donnees")
    localStorage.setItem("donnees", data_json);
}

const readData = () => {
    if (localStorage.donnees) {
        console.log("Données déja présente en local storage");
        data_json = localStorage.getItem("donnees");
        data = JSON.parse(data_json);
    } else {
        fetch('../data.json')
            .then((resp) => {return resp.json()})
            .then((data_import) => {
                data = data_import;
                data_json = JSON.stringify(data);
                writeData();
                renderPuisAct();
                calcPuisAct();
                tabCalcPuisAct.classList.add("active");
                console.log("Pas de cache en local storage, données par défault importées")
            })
            .catch(err => {
                console.log(`Impossible d'importer les données`, err);
            })
    }
};

export {
    writeData,
    readData,
    data,
}