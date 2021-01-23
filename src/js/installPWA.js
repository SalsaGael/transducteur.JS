// Install PWA //

const installPWA = () => {
  if (window.chrome) {
    let deferredPrompt = null;

    window.addEventListener("beforeinstallprompt", e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      const menulist = document.querySelector("#menulist");
      let li = document.createElement("li");
      li.classList.add("m-4");
      li.innerHTML = `<button class="btn btn-dark theme-icon" id="installButton">
        <img src="/images/plus-solid.svg">
      </button>
      <a> Installer la PWA</a>
    `;
      menulist.append(li);

      const install = async () => {
        deferredPrompt.prompt();
        console.log(deferredPrompt);
        deferredPrompt.userChoice.then(function(choiceResult) {
          if (choiceResult.outcome === "accepted") {
            console.log("Your PWA has been installed");
          } else {
            console.log("User chose to not install your PWA");
          }
          deferredPrompt = null;
        });
      };

      const installButton = document.querySelector("#installButton");

      installButton.onclick = e => {
        e.preventDefault();
        install();
      };
    });
  } else if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false) {
    const menulist = document.querySelector("#menulist");
    let li = document.createElement("li");
    li.classList.add("m-4");
    li.innerHTML = `<button class="btn btn-dark theme-icon" id="installButton">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </button>
      <a> Installer la PWA</a>
    `;
    menulist.append(li);

    const install = () => {
      alert(
        'Cliquer sur l\'icone "Partager" de Safari et choisir "Sur l\'écran d\'accueil"'
      );
    };

    const installButton = document.querySelector("#installButton");

    installButton.onclick = e => {
      e.preventDefault();
      install();
    };
  } else {
    console.log("Pas d'installation possible");
  }
};

export default installPWA;
