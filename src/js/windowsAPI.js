import {
	data,
} from './data.js'

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

    data.theme = checkTheme();
}

export default windowsTheme;