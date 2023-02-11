const Redis = require('ioredis');
const ffmpeg = require('fluent-ffmpeg');

const redis = new Redis();
const inputChannel = 'images';
const outputChannel = 'video';
const output = 'video.mp4';

async function processImages(images) {
  ffmpeg()
    .input(images.map((img, i) => `img${i}.jpg`))
    .inputOptions(['-framerate 1/5'])
    .outputOptions([
      '-c:v libx264',
      '-vf scale=1280:-1'
    ])
    .output(output)
    .on('end', () => {
      console.log('Video processing finished!');
      redis.publish(outputChannel, output);
    })
    .on('error', (err) => console.error('Error during processing: ', err))
    .run();
}

redis.on('message', function(channel, message) {
  switch (channel) {
    case inputChannel:
      const images = JSON.parse(message);
      processImages(images);
      break;
    default:
      console.error(`Unknown channel: ${channel}`);
  }
});

redis.subscribe(inputChannel);
