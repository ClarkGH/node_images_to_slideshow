const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const ffmpegPath = require('ffmpeg-static').path || ffmpeg.setFfmpegPath('./node_modules/ffmpeg-static/ffmpeg'); // Set the path to the ffmpeg binary

function processSlideshow() {
  return new Promise((resolve, reject) => {
    const outputFilePath = path.join(__dirname, 'slideshow.mp4');
    const IMAGE_INPUTS = './images/image%2d.jpeg';

    console.log('Here we a go.');

    ffmpeg()
      .input(IMAGE_INPUTS)
      .output(outputFilePath)
      .videoCodec('libx264')
      .outputFPS(1)
      .frames(5)
      .on('end', () => resolve(outputFilePath))
      .on('error', (err) => reject(err))
      .run();
  });
}

processSlideshow()
  .then((outputFilePath) => console.log(`Slideshow processed successfully: ${outputFilePath}`))
  .catch((err) => console.error(`Error processing slideshow: ${err}`));
