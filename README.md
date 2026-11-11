# Images to Slideshow Converter
## What is this?
API made in node.js that converts a list of images to an mp4, and returns a video buffer.

## Stack
This app is connected to "shotlify" via an Amazon s3 container, a lambda, and Redis.

## How to use
This is half-done, might never be completed. Download an mp3 or track of your choosing instead of the one hard-coded in. You'll have to do the piping to connect this to Shotlify if you don't want to use FFmpeg in your terminal.

## Libs used
1. [FluentFFmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
2. [VideoShow](https://github.com/h2non/videoshow)
3. [ESlint](https://eslint.org/)

## Legalese

### Royalty Free Music:
While the music is royalty free, it is not free for me to distribute. I cannot supply you with the mp3 as a download source. MixKit doesn't like that.

Tech House vibes
by Alejandro Magaña (A. M.)
Snag it from [MixKit](https://mixkit.co/free-stock-music/)

### ffMPEG GPL Stuff
ffMPEG falls under under the public GPL 2.0 license.

Be advised that there are patents not currently collecting royalties, but this is subject to change.

See patents for H.264, AAC and MP3 encoders.

### My Stuff
MIT License

Copyright (c) 2023 Clark Hinchcliff

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
