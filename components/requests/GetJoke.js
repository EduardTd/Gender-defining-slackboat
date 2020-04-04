const Axios = require('axios');

class GetJoke {
    constructor() {
        this.requestUrl = `${process.env.JOKE_REQUEST_URL}`;
    }

    get response() {
        return Axios.get(this.requestUrl)
    }
}

module.exports = GetJoke;