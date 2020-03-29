const Fs = require('fs');
const Path = require('path');
const OpenCV = require('opencv4nodejs');

module.exports = function () {
  const modelPath = Path.resolve(__dirname, '../../public/trainedModels');

  const prototxt = Path.resolve(modelPath, 'gender_deploy.prototxt');
  const modelFile = Path.resolve(modelPath, 'gender_net.caffemodel');

  if (!Fs.existsSync(prototxt) || !Fs.existsSync(modelFile)) {
    throw new Error('exiting');
  }

  return OpenCV.readNetFromCaffe(prototxt, modelFile);
};
