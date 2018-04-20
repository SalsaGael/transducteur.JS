// Force HTTPS

if (location.origin == 'http://192.168.1.10:5500') {
  console.log('Réseau local, https non requis, mais SW non activable');
} else if (location.origin == 'http://127.0.0.1:5500') {
  console.log('Machine locale, https non requis, et SW activable');
} else if (location.protocol == 'https:') {
  console.log('https déja activé');
} else {
  console.log('Passage en https nécessaire');
  location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}


//This is the service worker with the Cache-first network
if (navigator.serviceWorker) {
  //Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
  if (navigator.serviceWorker.controller) {
    console.log("SW déja présent, inutile de l'enregister")
  } else {
    //Register the ServiceWorker
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', {
        scope: './'
      }).then(function (reg) {console.log('SW enregistré pour ce scope :' + reg.scope)})
    })
  }
} else {
  console.log("SW indisponible avec ce Navigateur")
}