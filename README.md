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

run [ui.html](https://github.com/sathwikmatsa/ARStorytelling/blob/master/main.html) on a http server, load models and add actions and finally click on *export* to generate story.json.

![load object](https://user-images.githubusercontent.com/30603669/54220530-a10c1a00-4517-11e9-9380-4780a89aaf39.png)

![position and scale](https://user-images.githubusercontent.com/30603669/54220577-baad6180-4517-11e9-9ab4-c71834ce55de.png)

run [main.html](https://github.com/sathwikmatsa/ARStorytelling/blob/master/main.html) on localhost.

point the camera feed to [kanji marker](https://user-images.githubusercontent.com/30603669/51952745-b34a6100-245f-11e9-8da1-f7962c1972a5.png) to visualize the story.

## Files / Directories
+ ```main.html``` - visualizer
+ ```assets``` - models directory
+ ```js/*``` - three.js libraries
+ ```ui.html``` - gui for building ars app
+ ```js/backend.js``` - js for ui.html
+ ```css/``` - stylesheets
+ ```composer.json``` & ```index.php``` - heroku build (cloud deployment)
+ ```experimenting with AR.js``` - testing out AR.js
+ ```story.json``` - input story

*obsolete for GUI*

+ ```story.ars``` - sample ars file
+ ```ars_language_specification.txt``` - informal language specification
+ ```parser_grammar.pegjs``` - grammar written in PEG
+ ```parser.js``` - generated parser as per parser_grammar.pegjs using [PEG.js](https://pegjs.org/)
+ ```ars.js``` - interpreter

## Roadmap
- ~~redesign user input method by replacing text program input with graphical user interface where user can~~:
  + ~~load objects into the playground~~
  + ~~visualize at different camera positions~~
  + ~~adjust position and scale of objects~~
  + ~~set subtitles~~
  + ~~specify motions~~
- ~~rewrite the interpreter to evaluate input from GUI~~
- ~~MVP~~
- test, debug and refactor
- deploy to heroku
