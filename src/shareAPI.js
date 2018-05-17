// Ajout Share API standard W3C //

const shareAPI = () => {

    if (navigator.share) {

        let li = document.createElement('li');
        li.classList.add("m-4");
        li.innerHTML = `<button class="btn btn-dark" onClick="" type="button" id="sharebtn">
        <i class="fa fa-share" aria-hidden="true"></i>
    </button>
    <a>Partager</a>
    `
        menulist.append(li);
 
        const renderShare = `<li><button class="btn btn-dark" onClick="" type="button" id="shareBtn">
        <i class="fa fa-share" aria-hidden="true"></i>
    </button>
    <a>Partager l'application</a>
    </li>`
	    
        const shareButton = document.querySelector('#sharebtn');
            
        shareButton.onclick = (e) => {
            e.preventDefault();
            navigator.share({
                title: 'Transducteur',
                text: 'Une calculette pratique pour les capteurs de mesure',
                url: window.location.href
                }).then(() => {
                    console.log('Thanks for sharing!');
                })
                .catch(err => {
                    console.log(`Couldn't share because of`, err.message);
                });
            }

    } else {            
        console.log('Share API W3C not supported');
    }
}

export default shareAPI;