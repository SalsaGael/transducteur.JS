
const data_default = require('../data_default.json');
let data_json;
let data;

const writeData = ()=> {
    data_json = JSON.stringify(data);
    localStorage.removeItem("donnees")
    localStorage.setItem("donnees", data_json);
}

const readData = ()=> {
    if (localStorage.donnees) {
        console.log("local storage OK");
        data_json = localStorage.getItem("donnees");
        data = JSON.parse(data_json);
    } else {
        console.log("no local storage");
        data_json = JSON.stringify(data_default);
        localStorage.setItem("donnees", data_json);
        data = JSON.parse(data_json);
            }
    };

readData()

export {writeData, readData, data, data_json};