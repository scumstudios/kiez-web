import { s000 } from './000.js';

// Dialog Interaction Function
function dialog_pop(text) {
    if (document.getElementById("dialogFrame").style.display == "inline") {
        if (document.getElementById("dialogText").textContent != text) {
            document.getElementById("dialogText").textContent = text;
        }
        else {
            document.getElementById("dialogFrame").style.display = "none";
        }
    }
    else {
        document.getElementById("dialogFrame").style.display = 'inline';
        document.getElementById("dialogText").textContent = text;  
    }
}



// BABYLON

// Get Canvas
const canvas = document.getElementById("renderCanvas");

// Create Engine
const engine = new BABYLON.Engine(canvas, true, { stencil: true });

let currentScene;

function loadScene(sceneCreator) {
  if (currentScene) {
    currentScene.dispose();
  }

  const scene = sceneCreator(engine);
  currentScene = scene;

  BABYLON.SceneLoader.Append(scene);

  engine.runRenderLoop(function() {
    scene.render();
  });
}

// Load the initial scene
loadScene(s000);

// const createScene = function(scene, engine){

//     createBaseScene();
//     BABYLON.SceneLoader.Append("scripts/", scene);

//     return scene;
// };

// createScene("000.js")

// const scene = createScene();

// engine.runRenderLoop(() => {
//   if (currentScene) {
//     currentScene.render();
//   }
// });
    

//     // Load a scene
//     function loadScene(sceneFile) {
//         var scene = new BABYLON.Scene(engine);
//         BABYLON.SceneLoader.Load(sceneFile, scene) (function () {
//             return scene;
//         });
// }


    // function loadStart(){
    //     // resetScene();
    //     document.getElementById("loadFrame").style.display = 'inline';

    //     document.getElementById("logoContainer").style.display = 'inline';
    //     document.getElementById("poweredContainer").style.display = 'inline';

    //     BABYLON.SceneLoader.LoadAssetContainer("assets/", "000-start.glb", scene, function(container) {
    //         container.meshes.forEach(mesh => {
    //             mesh.material = vcolmat;
    //             mesh.receiveShadows = true;
    //             sg.addShadowCaster(mesh, true);
    //             mesh.renderOutline = true;
    //             mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
    //             mesh.outlineWidth = 0.005;
    //         }); 
                
    //         container.addAllToScene();

    //         let mesh = scene.getMeshById("EVT.Booths");
    //         hl.addMesh(mesh, BABYLON.Color3.Yellow());
    //         mesh.actionManager = new BABYLON.ActionManager(scene);
    //         mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
    //             container.removeAllFromScene();
    //             load010();
    //         }));
    //     });

    //     document.getElementById("loadFrame").style.display = 'none';
    // };

    // function load010(){

    //     loadScene("010.js")
        // resetScene();
        
        // document.getElementById("loadFrame").style.display = 'none';
        
        // let home = document.getElementById("homeButton");
        // home.style.display = "inline";
        // home.addEventListener('click', event => {container.removeAllFromScene();
        // });
    // };

   
    // loadScene("000.js");
    // addHome();

    

    // Rendering Optimizations
    // engine.setHardwareScalingLevel(1);

    // var options = new BABYLON.SceneOptimizerOptions();
    // options.addOptimization(new BABYLON.HardwareScalingOptimization(0.75, 1.5));
    // options.addOptimization(new BABYLON.PostProcessesOptimization(1));

    // Optimizer
    // var optimizer = new BABYLON.SceneOptimizer(scene, options);
    // optimizer.targetFrameRate = 30;
    // optimizer.trackerDuration = 2500;
    // optimizer.start();

    // return scene;


function camAnim(pos, lookAt, duration) { //TODO: Duration
    const frameRate = 1;

    const animations = [
        // move the camera position
        animMove(camera, pos),
        // move the camera target
        animLookAt(camera, lookAt),
    ];

    function animMove(camera, pos) {
        const anim = new BABYLON.Animation('movecam', 'position', frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        anim.setKeys([
            {frame: 0, value: camera.position.clone()},
            {frame: duration, value: pos},
        ]);

        // easing
        const easingFun = new BABYLON.SineEase();
        easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        anim.setEasingFunction(easingFun);
        return anim;
    }
  
  function animLookAt(camera, lookAt) {
        const anim = new BABYLON.Animation('lookcam', 'target', frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        anim.setKeys([
            {frame: 0, value: camera.target.clone()},
            {frame: duration, value: lookAt},
        ]);

        // easing 
        const easingFun = new BABYLON.SineEase();
        easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        anim.setEasingFunction(easingFun);
        return anim;
    }

    scene.beginDirectAnimation(camera, animations, 0, 2, false);
};

function createBaseScene() {
    // Create Initial Scene

    // Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);
    scene.useRightHandedSystem = true

    // Create Camera
    const camera = new BABYLON.ArcRotateCamera("Camera", 1.57, 0.75, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.fov = 0.5;

    camera.allowUpsideDown = false;
    camera.panningSensibility = 0;
    camera.angularSensibilityX = 512;
    camera.angularSensibilityY = 512;
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 3.5;
    camera.upperRadiusLimit = 15;
    camera.lowerBetaLimit = 0.75;
    camera.upperBetaLimit = 0.75;

    // Lighting Setup
    const sun = new BABYLON.DirectionalLight("Sun", new BABYLON.Vector3(-0.75, -1, -0.5), scene);
    sun.intensity = 1;
    sun.autoCalcShadowZBounds = true;

    // Shadows
    var sg = new BABYLON.ShadowGenerator(1024, sun);
    
    sg.bias = 0.0075;
    sg.darkness = 0.85;
    sg.usePercentageCloserFiltering = true;
    sg.filteringQuality = 0;

    const vcolmat = new BABYLON.StandardMaterial("vcolmat", scene);
    vcolmat.specularColor = new BABYLON.Color3(0, 0, 0);
    vcolmat.emissiveColor = new BABYLON.Color3(0.25, 0.25, 0.25);

    //Background Color
    scene.clearColor = new BABYLON.Color3(0.22, 0, 0.65);
    
    // Hightlight Layer
    const hl = new BABYLON.HighlightLayer("hl1", scene);
    hl.blurHorizontalSize = 0.33;
    hl.blurVerticalSize = 0.33;


    // function addHome(){
        // let home = document.getElementById("homeButton");
        // home.style.display = "inline";
        // home.addEventListener('click', event => {loadStart();});
    // }
    

    function loadScene(sceneFile) {
        var scene = new BABYLON.Scene(engine);
        BABYLON.SceneLoader.LoadAsync(sceneFile, scene).then(function () {
            return scene;
        });
    }
}

// const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});
