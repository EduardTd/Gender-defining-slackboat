const GetJoke = require('../requests/GetJoke');

class JokeService {
    constructor() {
        this._jokeRequest =  new GetJoke();

        this.jokeData = null;
        this.defaultMessage = 'Pocket for jokes is empty :skull:'
    }

    async getJoke() {
        await this.download();

        return new Promise((resolve) => {
            try {
                return resolve(
                    this.getJokeString()
                )
            } catch (error) {
                console.log(error);

                return resolve(this.defaultMessage);
            }
        });
    }

    async download() {
        this.jokeData = await this._jokeRequest.response;
    }

    getJokeString() {
        return this.jokeData.data.value.joke.replace(/&quot;/g,'"');
    }
}

module.exports = JokeService;