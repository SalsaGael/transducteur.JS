// Ajout Share API standard W3C //

const shareAPI = () => {

    const footer = document.querySelector('#footer');

    if (navigator.share) {

        footer.innerHTML = `
	        <button class="btn btn-sm btn-dark mr-2" onClick="location.href='mailto:gael.piconcely@free.fr?subject=Retour utilisateur'">
	            <i class="fa fa-envelope-open" aria-hidden="true"></i>
            </button>
            <button class="btn btn-sm btn-dark mr-2" onClick="location.href='https://twitter.com/salsagael'">
	            <i class="fa fa-twitter" aria-hidden="true"></i>
            </button>
            <button class="btn btn-sm btn-dark mr-2" onClick="location.href='https://paypal.me/PICONCELY/2'">
	            <i class="fa fa-paypal" aria-hidden="true"></i>
            </button>
            <button class="btn btn-sm btn-dark mr-2" onClick="" type="button" id="shareBtn">
	            <i class="fa fa-share" aria-hidden="true"></i>
            </button>
        `

        const shareButton = document.querySelector('#shareBtn');
            
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