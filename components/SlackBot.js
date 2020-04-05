const SlackBotModule = require('slackbots');
const ChatDataHandler = require('./ChatDataHandler');

class SlackBot {
    constructor() {
        this._chatDataHandler = new ChatDataHandler({});
        this.token = `${process.env.SLACK_AUTH_TOKEN}`;
        this.botName = `${process.env.BOT_NAME}`;
        this.chanelName = `${process.env.CHANEL_NAME}`;
        this.bot = {};
        this.messageCallback = () => {};
        this.botParams = {
            icon_emoji: ':eyes:'
        };
        this.firstMessage = `Hello! I can determine your gender by image :female_sign::male_sign:
Or if I can’t, I will tell you a joke about Chuck Norris. :face_with_raised_eyebrow:`
    }

    initialize(messageCallback) {
        this.messageCallback = messageCallback;
        this.bot = new SlackBotModule({
            token: this.token,
            name: this.botName
        });

        this.eventListeners();
    }

    eventListeners() {
        this.bot.on('start', this.startHandler.bind(this));
        this.bot.on('error', this.errorHandler.bind(this));
        this.bot.on('message', this.messageHandler.bind(this));
    }

    startHandler() {
        this.bot.postMessageToChannel(
            this.chanelName,
            this.firstMessage,
            this.botParams
        );
    }

    sendMessage(message) {
        this.bot.postMessageToChannel(
            this.chanelName,
            message,
            this.botParams
        );
    }

    errorHandler(error) {
        console.log(error);
    }

    messageHandler(chatData) {
        if(
            chatData.username === this.botName ||
            chatData.type !== 'message' ||
            !this._chatDataHandler.hasAvailableImage(chatData)
        ){
            return;
        }

        this.messageCallback(chatData);
    }
}

module.exports = SlackBot;
