let info = document.getElementById('info');
let toolbar = document.getElementById('toolbar');
let complete = document.getElementById('complete');
let exp = document.getElementById('export');
let add = document.getElementById('add');
let scenes = document.getElementById('scenes');

function render_topbar(){
    if (MODE == BASE_SCENE) {
        // info
        info.textContent = 'STAGE1 : Add models and position them appropriately to form a base scene';

        // toolbar
        let bs_html_string = `
            <a href="javascript:control.setMode( 'translate' );">translate</a>
            <a href="javascript:control.setMode( 'rotate' );">rotate</a>
            <a href="javascript:control.setMode( 'scale' );">scale</a>
            <a href="javascript:control.setSize( control.size + 0.1 );">increase size</a>
            <a href="javascript:control.setSize( Math.max( control.size - 0.1, 0.1 ) );">decrease size</a>
            `;
        toolbar.innerHTML = bs_html_string;

        // complete
        complete.textContent = 'COMPLETED BASE SCENE';

        // add button
        add.disabled = false;
        add.textContent = 'ADD NEW MODEL';
    } else {
        // info
        info.textContent = 'STAGE2 : Add actions to complete the scene';

        // toolbar
        let act_html_string = `
            <a id="myBtn1">SUBTITLE</a>
            <a id="myBtn2">MONOLOGUE</a>
            <a id='move' onclick='fmove();'>MOVE</a>
            `;
        toolbar.innerHTML = act_html_string;

        // complete
        complete.textContent = 'COMPLETED SCENE';

        // add button
        add.textContent = 'SELECTED: NONE';
        add.disabled = true;

        // export button
        exp.style.display = 'inline';
        setButton();
    }
}

function add_to_sidebar(type, id){
    if (!C_SCENE){
        let new_scene = document.createElement('div');
        new_scene.className = 'scene-div';
        C_SCENE = `scene-${++N_SCENES}`;
        new_scene.id = C_SCENE;
        scenes.insertBefore(new_scene, add);

    }

    let scene_div = document.getElementById(C_SCENE);
    if (type == MODEL){
        let p_tag = document.createElement('p');
        p_tag.textContent = `MODEL: ${id}`;
        scene_div.appendChild(p_tag);

    } else if (type == SUBTITLE){
        let p_tag = document.createElement('p');
        p_tag.textContent = `SUBTITLE: ${id}`;
        scene_div.appendChild(p_tag);
    } else {
        let p_tag = document.createElement('p');
        p_tag.textContent = `MOVE: ${id}`;
        scene_div.appendChild(p_tag);
    }
}

render_topbar();

// event listeners

complete.addEventListener('click', () => {
    if (MODE == BASE_SCENE) {
        capture_base_scene();
    }
    MODE = (MODE == BASE_SCENE) ? ACTIONS : BASE_SCENE;
    if (MODE == BASE_SCENE) {
        C_SCENE = undefined;
        clean_objects();
    }
    render_topbar();
    console.log(output);
});

function fmove(){
    // toolbar
    let bs_html_string = `
        <label for="object">object id:</label>
        <input type="number" id="object" name="object" required>
        <label for="from">from:</label>
        <input type="text" id="from" name="from" required>
        <button onclick='getpos(document.getElementById("object").value, "from")'>Set From</button>
        <label for="to">to:</label>
        <input type="text" id="to" name="to" required>
        <button onclick='getpos(document.getElementById("object").value, "to")'>Set To</button>
        <button onclick='sendmove(document.getElementById("object").value, document.getElementById("from").value, document.getElementById("to").value);'>DONE</button>
        `;
    toolbar.innerHTML = bs_html_string;

}

exp.addEventListener('click', () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "story.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

// utilities

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
