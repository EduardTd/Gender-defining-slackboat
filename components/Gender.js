const OpenCV = require('opencv4nodejs');
const Face = require('./Face');
const LoadGenderNet = require('./dnn/LoadGenderNet');

const MODEL_MEAN_VALUES = [ 78.4263377603, 87.7689143744, 114.895847746 ];
const IMAGE_SIZE = [ 227, 227 ];
const GENDER_LIST = ['male :female_sign:', 'female :female_sign:'];

class Gender {

    /**
     * @param {String} imagePath
     */
    constructor(imagePath) {
        this.imagePath = imagePath;
        this.results = [];
    }

    get definition() {
        this.define();

        return this.getGenderSignificance();
    }

    get report() {
        const [ male, female ] = this.results;

        return `male: ${male}  female: ${female}`;
    }

    define() {
        const genderNet = new LoadGenderNet();
        const inputBlob = this.getImageBlob();

        genderNet.setInput(inputBlob);
        const outputBlob = genderNet.forward();

        this.results = outputBlob.getDataAsArray()[0];
    }

    getGenderSignificance() {
        const greatestValueIndex = this.argMax(this.results);

        return GENDER_LIST[greatestValueIndex];
    }

    getFace() {
        const image = this.loadImage();

        return new Face(image).data;
    }

    getImageBlob() {
        const face = this.getFace();
        // OpenCV.imshowWait('face', face);
        // OpenCV.destroyAllWindows();
        const size = new OpenCV.Size(...IMAGE_SIZE);
        const vec3 = new OpenCV.Vec(...MODEL_MEAN_VALUES);

        return OpenCV.blobFromImage(face, 1, size, vec3, false);
    }

    loadImage() {
        return OpenCV.imread(this.imagePath);
    }

    argMax(array) {
        return array.reduce((bestIndexSoFar, currentValue, currentIndex, collectionArray) => {
            if (currentValue > collectionArray[bestIndexSoFar]) {
                return currentIndex;
            }

            return bestIndexSoFar;
        }, 0);
    };
}

module.exports = Gender;