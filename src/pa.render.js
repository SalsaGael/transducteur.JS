import {data} from './data.js';

const renderPuisAct = ()=> {
    container.innerHTML = `
<div class="intercal">
    <p class="mb-1">
        <a>Calcul des valeurs pour 100√3 V 0°</a>
    </p>
    <div class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text text-light bg-secondary">Puissance HT</label>
        </div>
        <input type="number" id="paHT" placeholder="Entrez la valeur" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        <div class="input-group-apppend">
        <span class="input-group-text text-light bg-secondary">MW</span>
        </div>
    </div>

    <div class="input-group mb-2">
        <div class="input-group-prepend">
           <label class="input-group-text text-light bg-primary">Courant BT</label>
        </div>
            <input type="number" id="iaBT" placeholder="Entrez la valeur" class="form-control" aria-label="Small"
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
</div>

<div class="intercal">
<p class="mb-1">
    <a>Paramètres</a>
</p>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label for "KU" class="input-group-text">Tension HT / BT</label>
    </div>
    <select id='KU' class="custom-select" value="">
    <option value="200">20 kV / 100 V</option>
    <option value="450">45 kV / 100 V</option>
    <option value="600">60 kV / 100V</option>
    <option value="630">63 kV / 100V</option>
    <option value="900">90 kV / 100 V</option>
    <option value="1500">150 kV / 100V</option>
    <option value="2200">220 kV / 100V</option>
    <option value="2250">225 kV / 100V</option>
    <option value="4000">400 kV / 100V</option>
    </select>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="pTC">Courant primaire TC</label>
    </div>
    <input class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id='pTC' type="number" value=""
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
        <option value="1">Circuit 1 A</option>
        <option value="5">Circuit 5 A</option>
    </select>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="fpaHT">Famille BT</label>
    </div>
    <select id="fpaHT" class="custom-select" value="">
        <option value="0">Plage réglée</option>
        <option value="1">P1 602,2</option>
        <option value="2">P2 744,8</option>
        <option value="3">P3 866</option>
        <option value="4">P4 1039</option>
        <option value="5">P5 1212</option>
        <option value="6">P6 1464</option>
        <option value="8">P8 1732</option>
        <option value="9">P9 2148</option>
    </select>
    <div class="input-group-apppend">
        <span class="input-group-text">± W</span>
    </div>
</div>
<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="paMaxHT">Plage HT réglée</label>
    </div>
    <input class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id='paMaxHT' type="number" value="" />
    <div class="input-group-apppend">
        <span class="input-group-text">± MW</span>
    </div>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label for "smaMin" class="input-group-text">Sortie procédé</label>
    </div>
    <select id='smaMin' class="custom-select" value="">
    <option value="-20">-20</option>
    <option value="-10">-10</option>
    <option value="-5">-5</option>
    <option value="0">0</option>
    <option value="4">4</option>
    </select>
    <span class="input-group-text">à</span>
    <select id='smaMax' class="custom-select" value="">
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="20">20</option>
    </select>
    <div class="input-group-apppend">
    <span class="input-group-text">mA</span>
</div>
</div>
</div>
 `
};

export default renderPuisAct; 