let parser = PARSER;
function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status === 200) {
    result = xmlhttp.responseText;
  }
  return result;
}

let story = parser.parse(loadFile('story.ars'));
alert(JSON.stringify(story), null, 2);
console.log(story)
