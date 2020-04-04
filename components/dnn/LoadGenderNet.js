const Fs = require('fs');
const Path = require('path');
const OpenCV = require('opencv4nodejs');

class LoadGenderNet {
    constructor() {
        this.modelsDirectory = '../../public/trainedModels';
        this.protoName = 'gender_deploy.prototxt';
        this.modelName = 'gender_net.caffemodel';
    }

    get network() {
        const { prototxt, modelFile} = this.pathResolver();

        if (!Fs.existsSync(prototxt) || !Fs.existsSync(modelFile)) {
            throw new Error('exiting');
        }

        return OpenCV.readNetFromCaffe(prototxt, modelFile);
    }

    pathResolver() {
        const modelPath = Path.resolve(__dirname, this.modelsDirectory);
        const prototxt = Path.resolve(modelPath, this.protoName);
        const modelFile = Path.resolve(modelPath, this.modelName);

        return {
            prototxt,
            modelFile
        }
    }
}

module.exports = LoadGenderNet;