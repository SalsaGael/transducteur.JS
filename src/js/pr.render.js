import data from './data.js';

const renderPuisReact = ()=> {
    container.innerHTML = `
    <div class="bloccalc">
    <p class="mb-1">
    <a>Calcul des valeurs pour 100/√3 V φ=90°</a>
</p>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text text-light bg-secondary input-ant">Puissance HT</label>
    </div>
    <input type="number" id="prHT" placeholder="Entrez la valeur" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
    <div class="input-group-append">
        <span class="input-group-text text-light bg-secondary input-post">Mvar</span>
    </div>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text text-light bg-primary input-ant">Courant BT</label>
    </div>
    <input type="number" id="irBT" placeholder="Entrez la valeur" class="form-control" aria-label="Small"
        aria-describedby="inputGroup-sizing-sm">
    <div class="input-group-append">
        <span class="input-group-text text-light bg-primary input-post">A</span>
    </div>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text text-light bg-success input-ant">Sortie procédé</label>
    </div>
    <input type="number" id="sma" placeholder="Entrez la valeur" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
    <div class="input-group-append">
        <span class="input-group-text text-light bg-success input-post">mA</span>
    </div>
</div>
</div>
<div class="blocset">
<p class="mb-1">
    <a>Paramètres</a>
</p>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label for "KU" class="input-group-text">Tension HT / BT</label>
    </div>
    <select id="KU" class="custom-select" value="">
    <option value="150">15 kV / 100 V</option>
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
    <input class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="pTC" type="number" value=""
    />
    <div class="input-group-append">
        <label class="input-group-text" for="pTC">A</label>
    </div>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label for="sTC" class="input-group-text">Secondaire TC</label>
    </div>
    <select class="custom-select" id="sTC">
    <option value="1">Circuit 1 A</option>
    <option value="5">Circuit 5 A</option>
    </select>
</div>

<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="fprHT">Famille BT</label>
    </div>
    <select id="fprHT" class="custom-select" value="">
        <option value="0">Plage réglée</option>
        <option value="1">Q1  303,1</option>
        <option value="2">Q2  372,4</option>
        <option value="3">Q3  433</option>
        <option value="4">Q4  519,6</option>
        <option value="5">Q5  602,2</option>
        <option value="6">Q6  848,7</option>
        <option value="7">Q7  731,8</option>
        <option value="8">Q8  866</option>
        <option value="9">Q9  1074</option>
    </select>
    <div class="input-group-append">
        <span class="input-group-text">± var</span>
    </div>
</div>
<div class="input-group mb-2">
    <div class="input-group-prepend">
        <label class="input-group-text" for="prMaxHT">Plage HT</label>
    </div>
    <input class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id='prMaxHT' type="number" value="" />
    <div class="input-group-append">
        <span class="input-group-text">± Mvar</span>
    </div>
</div>

<div class="input-group mb-2">
<div class="input-group-prepend">
    <label for "smaMin" class="input-group-text">Sortie</label>
</div>
<select id='smaMin' class="custom-select" value="">
<option value="-20">-20</option>
<option value="-10">-10</option>
<option value="-5">-5</option>
<option value="0">0</option>
<option value="4">4</option>
</select>
<span class="input-group-text input-group-middle">à</span>
<select id='smaMax' class="custom-select" value="">
<option value="5">5</option>
<option value="10">10</option>
<option value="20">20</option>
</select>
<div class="input-group-append">
<span class="input-group-text">mA</span>
</div>
</div>
</div>
 `}

 export default renderPuisReact;