const Axios = require('axios');

class GetChatImage {
    /**
     * @param {String} downloadUrl
     */
    constructor(downloadUrl) {
        this.downloadUrl = downloadUrl;
    }

    get response() {
        return Axios({
            url: this.downloadUrl,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${process.env.SLACK_AUTH_TOKEN}`
            }
        });
    }
}

module.exports = GetChatImage;