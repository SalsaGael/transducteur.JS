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


// Timeline //

const timeLine = ()=> {

    var lastKnownSession = null;
    var adaptiveCardTemplate = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "backgroundImage": null,
        "body": [
            {
                "type": "Container",
                "items": [
                    {
                        "type": "TextBlock",
                        "text": null,
                        "weight": "bolder",
                        "size": "large",
                        "wrap": true,
                        "maxLines": 3
                    },
                    {
                        "type": "TextBlock",
                        "text": null,
                        "size": "default",
                        "wrap": true,
                        "maxLines": 3
                    }
                ]
            }
        ]
    };
    
async function addTimelineActivity(id, title, bodyText, imagePath, activationUri) {
    if (!window.Windows) {
        return false;
    }

    var imageUrl = window.location.protocol + '//' + window.location.host + imagePath;

    // build adaptive card
    var cardJson = Object.assign({}, adaptiveCardTemplate);
    cardJson.backgroundImage = imageUrl;
    cardJson.body[0].items[0].text = title;
    cardJson.body[0].items[1].text = bodyText;
    var adaptiveCard = Windows.UI.Shell.AdaptiveCardBuilder.createAdaptiveCardFromJson(JSON.stringify(cardJson));

    var channel = Windows.ApplicationModel.UserActivities.UserActivityChannel.getDefault();

    // create and save activity
    var activity = await channel.getOrCreateUserActivityAsync(id);
    activity.visualElements.content = adaptiveCard;
    activity.visualElements.displayText = bodyText;
    activity.activationUri = new Windows.Foundation.Uri(activationUri);

    await activity.saveAsync();

    if (lastKnownSession && lastKnownSession.close) {
        lastKnownSession.close();
    }

    lastKnownSession = activity.createSession();
}

var id = "";
var title = "";
var bodyText = "";
var imagePath = "";
var activationUri = "";

addTimelineActivity(id, title, bodyText, imagePath, activationUri);
}

export {
    windowsTheme,
    timeLine,
}