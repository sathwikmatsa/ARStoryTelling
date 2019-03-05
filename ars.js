let parser = PARSER;
function loadFile(filePath) {
  let result = null;
  let xmlhttp = new XMLHttpRequest();
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

function createElementFromHTML(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

async function get_bbox(id){
    console.log(id);
    // get three.js object from aframe entity
    let el = document.querySelector('#'+id);
    while(! el.hasLoaded){
        await sleep(1000);
    }
    await sleep(500);
    let obj = el.getObject3D('mesh');

    // compute bounding box
    let bbox = new THREE.Box3().setFromObject(obj);
    return bbox;
}

function setScale(sizeO, id, v){
    let sizeB;
    if(v === undefined){
        sizeB = properties["base"]["bbox"].getSize(); // get the size of the bounding box of the base
    } else {
        sizeB = v;
    }
    let ratio = sizeB.divide( sizeO ); // get the ratio of the sizes
    let scale_ratio = ratio[Object.keys(ratio).reduce((a, b) => ratio[a] < ratio[b] ? a : b)];
    console.log("scale ratio: "+scale_ratio);

    // updating scale
    let el = document.querySelector('#'+id+'_e');
    console.log("before update:");
    let p_scale = el.getAttribute('scale');
    console.log(p_scale);
    let n_scale = p_scale.multiplyScalar(scale_ratio);
    console.log("new scale:")
    console.log(n_scale);
    el.object3D.scale.set(n_scale.x, n_scale.y, n_scale.z);
    console.log("after update:")
    console.log(el.getAttribute('scale'));
}

function get_top_position(id){
    let el = document.querySelector('#'+id+'_e');
    let p = el.getAttribute('position');
    let p_copy = JSON.parse(JSON.stringify(p));
    p_copy.y += properties[id]["bbox"].getSize().y + 0.1;
    return p_copy.x+" "+p_copy.y+" "+p_copy.z;
}

let properties = {};

async function play_animation(){
    console.log("********START********");
    for(let i = 0; i < nScenes; i++){
        // start afresh for a scene
        properties = {};
        document.getElementById("screen").innerHTML = "";
        document.getElementById("assets").innerHTML = "";
        console.log("ahaaa");

        let scene = story[i];
        // process declarations

        // base section
        let base_url = scene["declarations"]["base"]["url"];
        document.getElementById("assets").appendChild(createElementFromHTML("<a-asset-item id='base' src="+base_url+"></a-asset-item>"));
        document.getElementById("screen").appendChild(createElementFromHTML("<a-entity gltf-model="+'#base'+" id='base_e'></a-entity>"));
        properties["base"] = {};
        let base_bbox = await get_bbox('base_e');
        let base_size = base_bbox.getSize();
        console.log("initial size of base: ");console.log(base_size);
        setScale(base_size ,"base", new THREE.Vector3( 3, 2, 3 ));
        // recompute bbox after scaling
        properties["base"]["bbox"] = await get_bbox('base_e');
        console.log("look: ");
        console.log(properties["base"]["bbox"]);
        base_bbox = properties["base"]["bbox"];
        base_size = base_bbox.getSize();
        let z_front = 0.1 + base_size.z/2;
        console.log("after scaling: ");console.log(properties["base"]["bbox"].getSize());

        //objects section
        let actors = scene["declarations"]["objects"];
        for(let j = 0; j < actors.length; j++){
            let id = Object.keys(actors[j])[0];
            document.getElementById("assets").appendChild(createElementFromHTML("<a-asset-item id="+id+" src="+actors[j][id]+"></a-asset-item>"));
        }

        // process attributes
        let attrs = scene["attributes"];
        for(let j = 0; j < attrs.length; j++){
            let attr = attrs[j];
            document.getElementById("screen").appendChild(createElementFromHTML("<a-entity gltf-model="+'#'+attr["actor"]+" id="+attr["actor"]+'_e'+"></a-entity>"));
            properties[attr["actor"]] = {};
            let obj_bbox = await get_bbox(attr["actor"]+'_e');
            let obj_size = obj_bbox.getSize();
            setScale(obj_size, attr["actor"]);
            properties[attr["actor"]]["bbox"] = await get_bbox(attr["actor"]+'_e');
            properties[attr["actor"]]["top"] = get_top_position(attr["actor"]);
        }

        // process actions
        let actions = scene["actions"];
        for(let j = 0; j < actions.length; j++){
            console.log("play"+j);
            if("subtitle" in actions[j]){
                document.getElementById("screen").appendChild(createElementFromHTML('<a-entity id="temp" text="value: '+actions[j]["subtitle"]+';" align="center" baseline="bottom" geometry="primitive: plane; width: 4; height: auto" position="0 0 '+z_front+'"></a-entity>'));
            } else if("action" in actions[j]){
                if(actions[j]["action"] == "dialog"){
                    document.getElementById("screen").appendChild(createElementFromHTML('<a-entity id="temp" text="value: '+actions[j]["parameters"][0]+';" align="center" baseline="bottom" geometry="primitive: plane; width: 4; height: auto" position="'+ properties[actions[j]["actor"]]["top"] +'"></a-entity>'));
                }
            }

            await sleep(3000);
            // delete the action
            document.getElementById("temp").outerHTML = "";
        }
    }
    console.log("********END********")
}


let m = document.querySelector("a-marker");
m.addEventListener("markerFound", play_animation);
