require('dotenv').config();
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

const IMAGE_DIRECTORY = '../../public/images';

class ImageService {

    /**
     * @param {String} downloadUrl
     * @param {String} imageName
     */
    constructor(downloadUrl, imageName) {
        this.downloadUrl = downloadUrl;
        this.imageName = imageName;
        this.downloadedImg = null;
        this.writer = null;
    }

    async getImagePath() {
        await this.download();
        this.save();

        return new Promise((resolve, reject) => {
            this.writer.on('finish', () => {
                resolve(this.getPath())
            });
            this.writer.on('error', (error) => {
                reject
            });
        });
    }

    async download() {
        if (!this.downloadUrl) {
            throw new Error('No downloadUrl');
        }

        this.downloadedImg = await Axios({
            url: this.downloadUrl,
            method: 'GET',
            responseType: 'stream',
            headers: {
                Authorization: `Bearer ${process.env.SLACK_AUTH_TOKEN}`
            }
        });

        return this;
    }

    save() {
        if (!this.imageName || ! this.downloadedImg || !this.downloadedImg.data) {
            throw new Error('No imageName or downloadedImg');
        }

        this.writer = this.getWriter();

        this.downloadedImg.data.pipe(this.writer);
    }

    getWriter() {
        const path = this.getPath();

        return Fs.createWriteStream(path);
    }

    getPath() {
        return Path.resolve(__dirname, IMAGE_DIRECTORY, this.imageName);
    }
}

module.exports = ImageService;