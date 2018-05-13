// Theme Windows10 //

const windowsTheme = ()=> {
    // Découverte du theme Windows 10 //

    const checkTheme = () => {
        if (window.Windows) {

            var uiSettings = new Windows.UI.ViewManagement.UISettings();
            var color = uiSettings.getColorValue(Windows.UI.ViewManagement.UIColorType.background)
            if (color.b === 0) {
                return "dark"
            } else {
                return "light"
            }
        }
    }

    let theme = checkTheme();

    // Passage en theme Dark si necessaire //

    const nav = document.querySelector('#nav');
    const body = document.querySelector('#body');

    if (theme == "dark") {
        body.classList.add("darkmodecontainer");
        nav.classList.add("darkmodenav");
    }
}

export default windowsTheme;