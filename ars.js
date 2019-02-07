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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let story = parser.parse(loadFile('story.ars'));
let nScenes = story.length;
let objects = {};

async function play_animation(){
    console.log("start");
    for(let i = 0; i < nScenes; i++){
        // start afresh for a scene
        document.getElementById("screen").innerHTML = "";
        document.getElementById("assets").innerHTML = "";
        console.log("ahaaa");

        let scene = story[i];
        // process declarations
        let bg_url = scene["declarations"]["background"];
        document.getElementById("screen").innerHTML += "<a-image src="+bg_url+" width='1.5' height='1'></a-image>";
        let actors = scene["declarations"]["objects"];
        for(let j = 0; j < actors.length; j++){
            let id = Object.keys(actors[j])[0];
            document.getElementById("assets").innerHTML += "<a-asset-item id="+id+" src="+actors[j][id]+"></a-asset-item>";
        }

        // process attributes
        let attrs = scene["attributes"];
        for(let j = 0; j < attrs.length; j++){
            let attr = attrs[j];
            document.getElementById("screen").innerHTML += "<a-entity gltf-model="+'#'+attr["actor"]+" position='0 0 0.4' scale='0.5 0.5 0.5' id="+attr["actor"]+"></a-entity>";
            objects[attr["actor"]] = {};
            objects[attr["actor"]]["position"] = '0 0 0.4';
        }

        // process actions
        let actions = scene["actions"];
        for(let j = 0; j < actions.length; j++){
            if("subtitle" in actions[j]){
                document.getElementById("screen").innerHTML += '<a-entity id="temp" text="value: '+actions[j]["subtitle"]+';" align="center" baseline="bottom" geometry="primitive: plane; width: 2; height: auto" position="0 0 1"></a-entity>';
            } else if("action" in actions[j]){
                if(actions[j]["action"] == "dialog"){
                    document.getElementById("screen").innerHTML += '<a-entity id="temp" text="value: '+actions[j]["parameters"][0]+';" align="center" baseline="bottom" geometry="primitive: plane; width: 2; height: auto" position="0 1 1"></a-entity>';
                }
            }

            await sleep(3000);
            // delete the action
            document.getElementById("temp").outerHTML = "";
        }
    }
}


let m = document.querySelector("a-marker");
m.addEventListener("markerFound", play_animation);
