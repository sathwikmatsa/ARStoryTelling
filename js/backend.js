let camera, scene, renderer, orbit;
let container = document.getElementById('container');
let transformers = {};
let control; // pointed from html
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let objects = [];

init();
render();

function init() {

    // setup renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xb2b2b2 );
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // setup camera
    camera = new THREE.PerspectiveCamera( 50, container.offsetWidth / container.offsetHeight, 1, 3000 );
    camera.position.set( 500, 250, 500 );
    camera.lookAt( 0, 200, 0 );

    // setup scene
    scene = new THREE.Scene();
    scene.add( new THREE.GridHelper( 500, 20 ) );

    // add light
    let light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    // setup orbit controller
    orbit = new THREE.OrbitControls( camera, renderer.domElement );
    orbit.update();
    orbit.addEventListener( 'change', render );

    // on window resize
    window.addEventListener( 'resize', onWindowResize, false );

    // setup control updater
    window.addEventListener( 'mousedown', update_controller, false );
}

function onWindowResize() {

    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( container.offsetWidth, container.offsetHeight );

    render();

}

function update_controller( event ) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = ( (event.clientX - container.offsetLeft) / container.offsetWidth ) * 2 - 1;
    mouse.y = - ( (event.clientY - container.offsetTop) / container.offsetHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects( objects, true );

    if ( intersects.length > 0 ) {

        let obj = intersects[0];
        if ( obj.object.type !== 'Scene' ) {

            obj = obj.object.parent;

        } else {

            obj = obj.object;
        }
        // traverse upwards to find root node
        while( obj.type !== 'Scene' ) {
            obj = obj.parent;
        }

        control = transformers[obj.id];
        console.log('controller updated! '+ obj.id);

    }

}

function render() {

    renderer.render( scene, camera );

}

//////////////////////////////////////////////////////////

let new_scene_btn = document.getElementById( 'new_scene' );
let file_input = document.getElementById( 'file-input' );

new_scene_btn.addEventListener( 'click', function(){

    file_input.click();

} );

document.getElementById('file-input').addEventListener( 'change', function(evt) {

    let filename = evt.target.files[0].name;
    let path = "assets/"+filename;
    console.log(path);
    // Instantiate a loader
    let loader = new THREE.GLTFLoader();
    // Load a glTF resource
    loader.load(
        // resource URL
        path,
        // called when the resource is loaded
        function ( gltf ) {

            console.log(gltf.scene.id);

            // instantiate new controller and bind it to the object
            let new_control = new THREE.TransformControls( camera, renderer.domElement );
            new_control.addEventListener( 'change', render );
            new_control.addEventListener( 'dragging-changed', function ( event ) {

                orbit.enabled = ! event.value;

            } );

            new_control.attach( gltf.scene );
            scene.add( gltf.scene );
            objects.push( gltf.scene );
            scene.add( new_control );

            // save reference
            transformers[gltf.scene.id] = new_control;

        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened'+ JSON.stringify(error) );
        }
    );
}, false );
