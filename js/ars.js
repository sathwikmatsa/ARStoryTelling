function loadFile(filePath) {
  let result = null;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status === 200){
    result = xmlhttp.responseText;
  }
  return result;
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

let assets = document.getElementById("assets");
let story = JSON.parse(loadFile('story.json'));

let nModels = story['models'].length;
let nScenes = story['scenes'].length;

for(let i = 0; i < nModels; i++){
    assets.appendChild(createElementFromHTML(`<a-asset-item id="${'m'+story['models'][i]['id']}" src="assets/${story['models'][i]['filename']}"></a-asset-item>`));
}

function configure_object(id, t, r, s){
    let el = document.querySelector('#'+id);
    el.object3D.scale.set(s.x, s.y, s.z);
    el.object3D.position.set( t.x, t.y, t.z );
}

async function play_animation(){
    console.log("********START********");
    for(let i = 0; i < nScenes; i++){
        // start afresh for a scene
        document.getElementById("screen").innerHTML = "";
        console.log("ahaaa");

        let scene = story['scenes'][i];

        // base scene
        let base = scene['base'];
        let nObj = base.length;
        for(let i = 0; i < nObj; i++){
            document.getElementById("screen").appendChild(createElementFromHTML(`<a-entity gltf-model="${'#m'+base[i].id}" id="${'e'+base[i].id}"></a-entity>`));
            configure_object('e'+base[i].id, base[i]['translation'], base[i]['rotationQ'], base[i]['scale'])
        }

        // process actions
        let actions = scene["actions"];
        let nActions = actions.length;
        for(let j = 0; j < nActions; j++){
            console.log("play"+j);
            if("subtitle" == actions[j]['type']){
                document.getElementById("screen").appendChild(createElementFromHTML('<a-entity id="temp" text="value: '+actions[j]["value"]+';" align="center" baseline="bottom" geometry="primitive: plane; width: 4; height: auto" position="0 1 7"></a-entity>'));
                await sleep(3000);
                document.getElementById("temp").outerHTML = "";
            } else if("move" == actions[j]['type']){
                let obj = 'e'+actions[j]['id'];
                let f = actions[j]['from'];
                let t = actions[j]['to'];
                document.getElementById(obj).appendChild(createElementFromHTML(`
                <a-animation
                    attribute="position"
                    dur="2000"
                    from="${f.x+' '+f.y+' '+f.z}"
                    to="${t.x+' '+t.y+' '+t.z}"
                ></a-animation>
                    `))
            }
        }
    }
    console.log("********END********")
}

function createElementFromHTML(htmlString){
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

let m = document.querySelector("a-marker");
m.addEventListener("markerFound", play_animation);
