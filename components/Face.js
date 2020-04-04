const openCV = require('opencv4nodejs');

class Face {
    /**
     * @param {Mat} image
     */
    constructor(image) {
        this.image = image;
    }

    /**
     * @returns {Mat}
     */
    get data() {
        return this.getFaceImage();
    }

    getFaceImage() {
        const faceRects = this.getFaceRects();

        if (!faceRects.length) {
            throw new Error('failed to detect faces');
        }

        return this.image.getRegion(faceRects[0]);
    }

    getFaceRects() {
        const classifier = new openCV.CascadeClassifier(openCV.HAAR_FRONTALFACE_ALT2);

        return classifier.detectMultiScale(this.image).objects;
    }
}

module.exports = Face;
