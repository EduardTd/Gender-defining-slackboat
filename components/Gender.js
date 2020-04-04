const OpenCV = require('opencv4nodejs');
const Face = require('./Face');
const LoadGenderNet = require('./dnn/LoadGenderNet');

const MODEL_MEAN_VALUES = [ 78.4263377603, 87.7689143744, 114.895847746 ];
const IMAGE_SIZE = [ 227, 227 ];
const GENDER_LIST = ['male :female_sign:', 'female :female_sign:'];

class Gender {
    constructor() {
        this.matImage = null;
        this.results = [];
        this.setGenderNet();
    }

    get accuracyInfo() {
        const [ male, female ] = this.results;

        return `male - ${male}  female - ${female}`;
    }

    setGenderNet() {
        this.genderNet = new LoadGenderNet().network;
    }

    /**
     * @param {Mat} matImage
     */
    define(matImage) {
        this.setMatImage(matImage);
        const inputBlob = this.getImageBlob();

        this.genderNet.setInput(inputBlob);
        const outputBlob = this.genderNet.forward();

        this.results = outputBlob.getDataAsArray()[0];

        return this.getGenderSignificance();
    }

    setMatImage(matImage) {
        this.matImage = matImage;
    }

    getGenderSignificance() {
        const greatestValueIndex = this.argMax(this.results);

        return GENDER_LIST[greatestValueIndex];
    }

    getFace() {
        return new Face(this.matImage).data;
    }

    getImageBlob() {
        const face = this.getFace();
        const size = new OpenCV.Size(...IMAGE_SIZE);
        const vec3 = new OpenCV.Vec(...MODEL_MEAN_VALUES);

        return OpenCV.blobFromImage(face, 1, size, vec3, false);
    }

    argMax(array) {
        return array.reduce((bestIndexSoFar, currentValue, currentIndex, sourceArray) => {
            if (currentValue > sourceArray[bestIndexSoFar]) {
                return currentIndex;
            }

            return bestIndexSoFar;
        }, 0);
    };
}

module.exports = Gender;