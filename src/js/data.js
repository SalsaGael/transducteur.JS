import "babel-polyfill";
import "whatwg-fetch";

// To add to window

let data;
let data_json;

const writeData = () => {
  data_json = JSON.stringify(data);
  localStorage.setItem("donnees", data_json);
};

const readData = async () => {
  if (localStorage.donnees) {
    console.log("Données déja présente en local storage");
    data_json = localStorage.getItem("donnees");
    data = JSON.parse(data_json);
    data.timer = 0;
  } else {
    data = await fetch("../data.json")
      .then(resp => resp.json())
      .catch(err => {
        console.log(`Impossible d'importer les données`, err);
      });
    writeData();
    console.log("Import des données par défaut");
  }
};

export { data, readData, writeData };
