const ffprobePath = require('@ffprobe-installer/ffprobe').path
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const videoshow = require('videoshow')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const TEMP_DIRECTORY = './tmp/'
const PORT = 3000

// Set path to the ffmpeg binaries or break functionality.
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

const videoOptions = {
  fps: 25,
  loop: 5, // seconds.
  transition: true,
  transitionDuration: 1, // seconds.
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

const saveFilesFromBase64 = (base64String, fileName) => {
  const imageBuffer = Buffer.from(base64String.replace(/^data:image\/\w+base64,/, ''), 'base64')
  const filePath = path.join(TEMP_DIRECTORY, fileName)

  // Write the image to tmp.
  fs.writeFileSync(filePath, imageBuffer)
}

// Server
app.use(express.json())

app.post('/slideshow', (req, res) => {
  const { images } = req.body

  // Save Files.
  images.forEach((imageSource, i) => {
    return saveFilesFromBase64(imageSource, `image0${i}.jpeg`)
  })

  // Get File Locations.
  const files = fs.readdirSync(TEMP_DIRECTORY).map(file => path.join(TEMP_DIRECTORY, file))

  // Create video, send response, and delete files.
  videoshow(files, videoOptions)
    .audio('mixkit-tech-house-vibes-130.mp3')
    .save('slideshow.mp4')
    .on('start', (command) => {
      console.log('ffMPEG slideshow process started:', command)
    })
    .on('error', (err, _, stderr) => {
      console.error('Error:', err)
      console.error('ffMPEG StdError:', stderr)
    })
    .on('end', (output) => {
      console.log('Slideshow created:', output)
      res.json({ slideshow: fs.readFileSync('slideshow.mp4') })
      console.log('response sent, cleaning up files')
      fs.readdirSync(TEMP_DIRECTORY).forEach(file => {
        fs.unlinkSync(path.join(TEMP_DIRECTORY, file))
      })
      console.log('temporary files deleted')
      fs.unlinkSync('slideshow.mp4')
      console.log('slideshow.mp4 file deleted')
    })
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
