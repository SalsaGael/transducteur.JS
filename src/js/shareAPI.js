// Ajout Share API standard W3C ou WinRT //

const shareAPI = () => {
  // Afficher ou non le bouton partage //

  const menulist = document.querySelector("#menulist");

  if (navigator.share || window.Windows) {
    let li = document.createElement("li");
    li.classList.add("m-4");
    li.innerHTML = `<button class="btn btn-dark theme-icon" type="button" id="sharebtn">
        <i class="fa fa-share" aria-hidden="true"></i>
    </button>
    <a>Partager</a>
    `;
    menulist.append(li);

    // Partager //

    const shareButton = document.querySelector("#sharebtn");
    shareButton.onclick = e => {
      if (navigator.share) {
        e.preventDefault();
        navigator
          .share({
            title: "Transducteur",
            text: "Une calculette pratique pour les capteurs de mesure",
            url: window.location.href
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch(err => {
            console.log(`Couldn't share because of`, err.message);
          });
      } else if (window.Windows) {
        const DataTransferManager =
          window.Windows.ApplicationModel.DataTransfer.DataTransferManager;

        const dataTransferManager = DataTransferManager.getForCurrentView();
        dataTransferManager.addEventListener("datarequested", ev => {
          const data = ev.request.data;

          data.properties.title = title;
          data.properties.url = url;
          data.setText(text);
        });

        DataTransferManager.showShareUI();

        return true;
      }
    };
  } else {
    console.log("Share API W3C or WinRT Share not supported");
  }
};

export default shareAPI;
