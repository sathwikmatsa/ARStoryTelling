let BASE_SCENE = 0
let ACTIONS = 1

let MODE = BASE_SCENE

let info = document.getElementById('info');
let toolbar = document.getElementById('toolbar');
let complete = document.getElementById('complete');
let exp = document.getElementById('export');
let add = document.getElementById('add');
let curr_scene = "";

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
            <a href="javascript:control.setMode( 'translate' );">SUBTITLE</a>
            <a href="javascript:control.setMode( 'rotate' );">MONOLOGUE</a>
            <a href="javascript:control.setMode( 'scale' );">MOVE</a>
            `;
        toolbar.innerHTML = act_html_string;

        // complete
        complete.textContent = 'COMPLETED SCENE';

        // add button
        add.textContent = 'SELECTED: NONE';
        add.disabled = true;

        // export button
        exp.style.display = 'inline';
    }

}

function add_to_sidebar(type, id){
    if (type == MODEL){

    }
}

render_topbar();

// event listeners

complete.addEventListener('click', () => {
    MODE = (MODE == BASE_SCENE) ? ACTIONS : BASE_SCENE;
    render_topbar();
    console.log(output);
});

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
