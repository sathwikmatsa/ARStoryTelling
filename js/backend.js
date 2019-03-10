let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let controls = new THREE.OrbitControls( camera );

let renderer = new THREE.WebGLRenderer();
let container = document.getElementById('container');
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

camera.position.z = 5;
controls.update();

let light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

function animate(){
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
animate();

//////////////////////////////////////////////////////////

document.getElementById( 'new_scene' ).addEventListener( 'click', function(){
    document.getElementById( 'file-input' ).click();
} );

document.getElementById('file-input').addEventListener( 'change', function(evt){
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
            scene.add( gltf.scene );
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
