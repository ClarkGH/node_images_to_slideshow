const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const videoshow = require('videoshow');
const fs = require('fs');
const IMAGE_DIRECTORY = 'images/';

// Set path to the ffmpeg binaries or break functionality.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const images = fs.readdirSync(IMAGE_DIRECTORY)
  .filter(file => file.endsWith('.jpeg'))
  .map(file => IMAGE_DIRECTORY + file);

const videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
};

videoshow(images, videoOptions)
  .audio('mixkit-tech-house-vibes-130.mp3')
  .save('slideshow.mp4')
  .on('start', (command) => {
    console.log('ffMPEG slideshow process started:', command);
  })
  .on('error', (err, _, stderr) => {
    console.error('Error:', err);
    console.error('ffMPEG StdError:', stderr);
  })
  .on('end', (output) => {
    console.error('Slideshow created in:', output);
  });
