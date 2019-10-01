// Ajout Share API standard W3C ou WinRT //

const shareAPI = () => {
  // Afficher ou non le bouton partage //

  if (navigator.share || window.Windows) {
    const menulist = document.querySelector("#menulist");
    let li = document.createElement("li");
    li.classList.add("m-4");
    li.innerHTML = `<button class="btn btn-dark theme-icon" type="button" id="sharebtn">
        <i class="fa fa-share" aria-hidden="true"></i>
    </button>
    <a>Partager la PWA</a>
    `;
    menulist.append(li);

    // Partager //

    const share = async (title, text, url) => {
      if (window.Windows) {
        const DataTransferManager =
          window.Windows.ApplicationModel.DataTransfer.DataTransferManager;

        const dataTransferManager = DataTransferManager.getForCurrentView();
        dataTransferManager.addEventListener("datarequested", ev => {
          const data = ev.request.data;

          data.properties.title = title;
          data.properties.description = text;
          data.setText(url);
        });

        DataTransferManager.showShareUI();

        return true;
      } else if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            text: text,
            url: url
          });

          return true;
        } catch (err) {
          console.error("There was an error trying to share this content");
          return false;
        }
      }
    };

    const shareButton = document.querySelector("#sharebtn");

    shareButton.onclick = e => {
      e.preventDefault();
      share(
        "Transducteur PWA",
        "Calculette pratique pour capteur de mesure",
        "https://transducteur.netlify.com"
      );
    };
  } else {
    console.log("Share API W3C or WinRT Share not supported");
  }
};

export default shareAPI;
