import {data} from './data.js';

const renderPuisReact = ()=> {
    container.innerHTML = `
    <p class="intercal mb-2">
    <a>Calcul des valeurs pour 57.7/100V 90°</a>
</p>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text text-light bg-secondary">Puissance HT</label>
    </div>
    <input type="number" id="prHT" placeholder="Entrez la valeur" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
    <div class="input-group-apppend">
        <span class="input-group-text text-light bg-secondary">Mvar</span>
    </div>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text text-light bg-primary">Courant BT</label>
    </div>
    <input type="number" id="irBT" placeholder="Entrez la valeur" class="form-control" aria-label="Small"
        aria-describedby="inputGroup-sizing-sm">
    <div class="input-group-apppend">
        <span class="input-group-text text-light bg-primary">A</span>
    </div>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text text-light bg-success">Sortie procédé</label>
    </div>
    <input type="number" id="sma" placeholder="Entrez la valeur" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
    <div class="input-group-apppend">
        <span class="input-group-text text-light bg-success">mA</span>
    </div>
</div>

<p class="intercal mb-2">
    <a>Paramétres</a>
</p>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label for "KU" class="input-group-text">Tension HT / BT</label>
    </div>
    <select id='KU' class="custom-select" value="${data.KU}" />
    <option value="${data.KU}">${data.KU / 10} kV / 100 V</option>
    <option value="4000">400 kV / 100V</option>
    <option value="2200">220 kV / 100V</option>
    <option value="1500">150 kV / 100V</option>
    <option value="900">90 kV / 100 V</option>
    <option value="600">60 kV / 100V</option>
    <option value="200">20 kV / 100 V</option>
    </select>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="pTC">Courant primaire TC</label>
    </div>
    <input class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id='pTC' type="number" value="${data.pTC}"
    />
    <div class="input-group-apppend">
        <label class="input-group-text" for="pTC">A</label>
    </div>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label for="sTC" class="input-group-text">Secondaire TC</label>
    </div>
    <select class="custom-select" id='sTC'>
        <option value="${data.sTC}">Circuit ${data.sTC} A</option>
        <option value="5">Circuit 5 A</option>
        <option value="1">Circuit 1 A</option>
    </select>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="prMaxHTS">Famille BT</label>
    </div>
    <select class="custom-select" id='prMaxHTS'>
        <option id="prMaxHT0" value="${data.prMaxHT}">Plage réglée</option>
        <option id="prMaxHT1" value="${data.prMaxHT1}">Q1 303,1</option>
        <option id="prMaxHT2" value="${data.prMaxHT2}">Q2 372,4</option>
        <option id="prMaxHT3" value="${data.prMaxHT3}">Q3 433</option>
        <option id="prMaxHT4" value="${data.prMaxHT4}">Q4 519,6</option>
        <option id="prMaxHT5" value="${data.prMaxHT5}">Q5 602,2</option>
        <option id="prMaxHT6" value="${data.prMaxHT6}">Q6 848,7</option>
        <option id="prMaxHT7" value="${data.prMaxHT7}">Q7 731,8</option>
        <option id="prMaxHT8" value="${data.prMaxHT8}">Q8 866</option>
        <option id="prMaxHT9" value="${data.prMaxHT9}">Q9 1074</option>
    </select>
    <div class="input-group-apppend">
        <span class="input-group-text">± var</span>
    </div>
</div>
<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="prMaxHT">ou plage HT réglée</label>
    </div>
    <input class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id='prMaxHT' type="number" value="${Math.round(data.prMaxHT * 100) / 100}"
    />
    <div class="input-group-apppend">
        <span class="input-group-text">± Mvar</span>
    </div>
</div>

<div class="input-group mb-2">
<div class="input-group-prepend">
    <label for "smaMin" class="input-group-text">Sortie procédé</label>
</div>
<select id='smaMin' class="custom-select" value="${data.smaMin}" />
<option value="${data.smaMin}">${data.smaMin}</option>
<option value="-20">-20</option>
<option value="-10">-10</option>
<option value="-5">-5</option>
<option value="0">0</option>
<option value="4">4</option>
</select>
<span class="input-group-text">à</span>
<select id='smaMax' class="custom-select" value="${data.smaMax}" />
<option value="${data.smaMax}">${data.smaMax}</option>
<option value="5">5</option>
<option value="10">10</option>
<option value="20">20</option>
</select>
<div class="input-group-apppend">
<span class="input-group-text">mA</span>
</div>
</div>
 `}

 export default renderPuisReact;