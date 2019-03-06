# ARStorytelling
Extension for WebAR framework to ease the development of storytelling AR applications.

https://arstorytelling.herokuapp.com

## Try it on Mobile
1. Open this [kanji marker image](https://user-images.githubusercontent.com/30603669/51952745-b34a6100-245f-11e9-8da1-f7962c1972a5.png) in your desktop browser.
2. Open this [augmented reality webapp](https://arstorytelling.herokuapp.com) in your phone browser, and point it at your screen.

**You are done!** It will open a webpage which read the phone webcam, localize a kanji marker and add 3d on top of it.

note: the webapp is updated to show recent progress.

## Dependencies
This project is built on top of [AR.js](https://github.com/jeromeetienne/AR.js), so it is marker based. The marker can be on a print or screen. But print is preferred.

It works on all platforms. It runs on any browser with WebGL and WebRTC.

The story can be expressed as per the format specification in [ars_language_specification.txt](https://github.com/sathwikmatsa/ARStorytelling/blob/master/ars_language_specification.txt)

## Usage
```
git clone https://github.com/sathwikmatsa/ARStorytelling.git
cd ARStorytelling
```
run [main.html](https://github.com/sathwikmatsa/ARStorytelling/blob/master/main.html) on localhost.

point the camera feed to [kanji marker](https://user-images.githubusercontent.com/30603669/51952745-b34a6100-245f-11e9-8da1-f7962c1972a5.png) to visualize the story.

## Files
+ ```composer.json``` & ```index.php``` - heroku build (cloud deployment)
+ ```experimenting with AR.js``` - testing out AR.js
+ ```story.ars``` - sample ars file
+ ```ars_language_specification.txt``` - informal language specification
+ ```parser_grammar.pegjs``` - grammar written in PEG
+ ```parser.js``` - generated parser as per parser_grammar.pegjs using [PEG.js](https://pegjs.org/)
+ ```ars.js``` - interpreter
+ ```main.html``` - visualizer

## Roadmap
- ~~render landspace/base environment~~
- ~~render subtitles and dialogs~~
- ~~scale objects to fit within a specified bounding box~~
- redesign user input method by replacing text program input with graphical user interface where user can:
  + drag and drop objects into the playground
  + visualize at different camera positions
  + adjust position and scale of objects
  + set subtitles and dialogs
  + specify motions
