require('dotenv').config();
const SlackBotModule = require('slackbots');
const ChatDataHandler = require('./ChatDataHandler');

const CHANEL_NAME = 'general';

class SlackBot {
    constructor() {
        this._chatDataHandler = new ChatDataHandler({});
        this.token = `${process.env.SLACK_AUTH_TOKEN}`;
        this.botName = `${process.env.NOT_NAME}`;
        this.chanelName = `${process.env.CHANEL_NAME}`;
        this.bot = {};
        this.messageCallback = () => {};
        this.botParams = {
            icon_emoji: ':eyes:'
        };
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
        const firstMessage = `Hello! I can determine your gender by image :female_sign::male_sign:
Or if I can’t, I will tell you a joke about Chuck Norris. :face_with_raised_eyebrow:`;

        this.bot.postMessageToChannel(this.chanelName, firstMessage, this.botParams);
    }

    sendMessage(message) {
        this.bot.postMessageToChannel(this.chanelName, message, this.botParams);
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

        this.gettedImagePath

        this.messageCallback(chatData);
    }
}

module.exports = SlackBot;

//
// const bot = new SlackBotModule({
//     token: `${process.env.SLACK_AUTH_TOKEN}`,
//     name: 'jokebot'
// });
//
// //start handler
// bot.on('start', () => {
//     const firstMessage = `Hello! I can determine your gender by image.
//                          Or if I can’t, I will tell you a joke about Chuck Norris`;
//     const params = {
//         icon_emoji: ':eyes:'
//     };
//
//     bot.postMessageToChannel(CHANEL_NAME, firstMessage, params);
// });
//
// //error handler
// bot.on('error',(err) => console.log(err));
//
// //message handler
// bot.on('message', (data) => {
//     // console.log('pass message');
//     // console.log(data);
//
//     if(data.type !== 'message'){
//         return;
//     }
//     // chuckJoke();
//     // handleMessage(data.text);
// });
//
// function handleMessage(message){
//     if(message.includes(' chucknorris')){
//
//         console.log('pass chucknorris');
//         chuckJoke();
//     }
// }
//
// //tell a chuck norris joke
// function chuckJoke(){
//     Axios.get('http://api.icndb.com/jokes/random/')
//         .then(res => {
//             const joke = res.data.value.joke;
//             const params = {
//                 icon_emoji: ':laughing:'
//             };
//             bot.postMessageToChannel('general',
//                 `Chuck Norris: ${joke}`,
//                 params);
//         })
// }