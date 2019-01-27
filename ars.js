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

let ars = loadFile('story.ars');

while(ars.trim().length != 0){
    let i,j;
    let screenplay = {}, elems;
    // extract next scene
    i = ars.indexOf('<scene>');
    j = ars.indexOf('</scene>');
    let scene = ars.substring(i+7, j);
    ars = ars.slice(j+8);

    //process setup tag
    i = scene.indexOf('<setup>');
    j = scene.indexOf('</setup>');
    let setup = scene.substring(i+7, j).trim();
    elems = setup.split(";");
    for(let k=0; k<elems.length-1; k++){
        let elem = elems[k].trim();
        let property = elem.split(":")[0].trim();
        if(property === "background"){
            screenplay["background"] = elem.split(":")[1].trim().slice(1,-1);
        } else if(property === "objects"){
            let objs = [];
            i = elem.indexOf('{');
            j = elem.indexOf('}');
            let actors = elem.substring(i+1, j);
            actors = actors.split(",");
            for(let m=0; m<actors.length; m++){
                let url_p = actors[m].split(":")[0].trim().slice(1,-1);
                let id_p = actors[m].split(":")[1].trim();
                objs.push({url: url_p, id: id_p});
            }
            screenplay["objects"] = objs;
        }
    }

    //process onload
    i = scene.indexOf('<onload>');
    j = scene.indexOf('</onload>');
    let onload = scene.substring(i+8, j).trim();
    elems = onload.split(";");
    for(let k=0; k<elems.length-1; k++){
        let elem = elems[k];
        elem = elem.split("->");
        let id = elem[0].trim();
        screenplay[id] = {};
        let properties = elem[1].split(",");
        for(let m=0; m<properties.length; m++){
            let property = properties[m];
            screenplay[id][property.split(":")[0].trim()] = property.split(":")[1].trim()
        }
    }

    //process play
    i = scene.indexOf('<play>');
    j = scene.indexOf('</play>');
    let play = scene.substring(i+6, j).trim();
    elems = play.split(";");
    let frames = [];
    for(let k=0; k<elems.length-1; k++){
        let elem = elems[k].trim();
        frames.push(elem);
    }
    screenplay["play"] = frames;

    console.log(screenplay);
    alert("check console for full screenplay object\n"+JSON.stringify(screenplay, null, 4));
}

