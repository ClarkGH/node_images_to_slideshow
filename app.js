const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static').path || ffmpeg.setFfmpegPath('./node_modules/ffmpeg-static/ffmpeg'); // Set the path to the ffmpeg binary
const path = require('path');

function processSlideshow(imageFilePath, slideDuration) {
  return new Promise((resolve, reject) => {
    const outputFilePath = path.join(__dirname, 'slideshow.mp4');


    ffmpeg(imageFilePath)
      .inputOptions(['-loop 1'])
      .output(outputFilePath)
      .videoCodec('libx264')
      .outputFPS(1 / slideDuration)
      .on('end', () => resolve(outputFilePath))
      .on('error', (err) => reject(err))
      .run();
  });
}

const imageFilePath = path.join(__dirname, 'images/tuhtle.jpeg');
const slideDuration = 5;

processSlideshow(imageFilePath, slideDuration)
  .then((outputFilePath) => console.log(`Slideshow processed successfully: ${outputFilePath}`))
  .catch((err) => console.error(`Error processing slideshow: ${err}`));
