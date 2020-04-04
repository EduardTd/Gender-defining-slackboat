const ImageService = require('./services/ImageService');
const ChatDataHandler = require('./ChatDataHandler');
const SlackBot = require('./SlackBot');
const Gender = require('./Gender');
const JokeService = require('./services/JokeService');

class Chat {
    constructor() {
        this._slackBot = new SlackBot();
        this._gender = new Gender();
        this._jokeService = new JokeService();
    }

    initialize() {
        this._slackBot.initialize(
            this.messageCallback.bind(this)
        );
    }

    messageCallback(chatData) {
        const { downloadUrl } = new ChatDataHandler(chatData).imageInfo;
        const imageService = new ImageService(downloadUrl);

        imageService
            .getMatImage()
            .then(this.genderResolver.bind(this))
            .catch(this.sendJoke.bind(this));
    }

    genderResolver(matImage) {
        const genderSuggestion = this._gender.define(matImage);
        const accuracyInfo = this._gender.accuracyInfo;

        this._slackBot.sendMessage(
            `You are ${genderSuggestion} \r\n Determination accuracy: \r\n ${accuracyInfo}`
        );
    }

    sendJoke() {
        this._jokeService
            .getJoke()
            .then((message) => {
                this._slackBot.sendMessage(message);
            });
    }

}

module.exports = Chat;