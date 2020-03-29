const ImageService = require('./components/services/ImageService');
const ChatDataHandler = require('./components/ChatDataHandler');
const SlackBot = require('./components/SlackBot');
const Gender = require('./components/Gender');

const slackBot = new SlackBot();
const initialDefiner = (chatData) => {
    const { downloadUrl, imageName } = new ChatDataHandler(chatData).imageInfo;
    const imageService = new ImageService(downloadUrl, imageName);

    imageService.getImagePath()
        .then(path => {
            const gender = new Gender(path);
            const genderSuggestion = gender.definition;

            slackBot.sendMessage(`You are ${genderSuggestion}. Result - ${gender.report}`);
        })
        .catch((error) => {
            throw new Error(error);
        });
};

slackBot.initialize(initialDefiner);
