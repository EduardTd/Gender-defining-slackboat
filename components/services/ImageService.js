const OpenCV = require('opencv4nodejs');
const GetChatImage = require('../requests/GetChatImage');

class ImageService {
    /**
     * @param {String} downloadUrl
     */
    constructor(downloadUrl) {
        this.downloadUrl = downloadUrl;
        this.downloadedImage = null;
        this.imgBuffer = null;
    }

    /**
     * @returns {Promise<Mat>}
     */
    async getMatImage() {
        await this.download();
        this.setImgBuffer();

        return new Promise((resolve, reject) => {
            try {
                return resolve(
                    OpenCV.imdecode(this.imgBuffer)
                )
            } catch (error) {
                return reject(error);
            }
        });
    }

    async download() {
        if (!this.downloadUrl) {
            throw new Error('No downloadUrl');
        }

        this.downloadedImage = await new GetChatImage(this.downloadUrl).response;

        return this;
    }

    setImgBuffer() {
        if (!this.downloadedImage || !this.downloadedImage.data) {
            return this;
        }

        this.imgBuffer = this.downloadedImage.data;
    }
}

module.exports = ImageService;