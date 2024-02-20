// HTML UI FUNCTIONS
// screen.orientation.lock('portrait');

// Dialog Interaction Function
function dialog_pop(text) {
    if (document.getElementById("dialogFrame").style.visibility == "visible") {
        if (document.getElementById("dialogText").textContent != text) {
            document.getElementById("dialogText").textContent = text;
        }
        else {
            document.getElementById("dialogFrame").style.visibility = 'hidden';
        }
    }
    else {
        document.getElementById("dialogFrame").style.visibility = 'visible';
        document.getElementById("dialogText").textContent = text;  
    }
}


// BABYLON

// Get Canvas
const canvas = document.getElementById("renderCanvas");

// Create Engine
const engine = new BABYLON.Engine(canvas, true, { stencil: true }); 


// BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
//     if (document.getElementById("loadScreen")) {
//         // Do not add a loading screen if there is already one
//         document.getElementById("loadScreen").style.display = "initial";
//         return;
//     }
//     this._loadingDiv = document.createElement("div");
//     this._loadingDiv.id = "loadScreen";
//     this._loadingDiv.innerHTML = "Loading...";
//     var customLoadingScreenCss = document.createElement('style');
//     customLoadingScreenCss.type = 'text/css';
//     customLoadingScreenCss.innerHTML = `
//     #loadScreen{;
//         display: flex;
//         justify-content: center;
//         align-content: center;
//         flex-direction: column;
//         text-align: center;
//         color: #fff;
//         background: #000;
//     }
//     `;
//     document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
//     this._resizeLoadingUI();
//     window.addEventListener("resize", this._resizeLoadingUI);
//     document.body.appendChild(this._loadingDiv);
// };

// BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
//     document.getElementById("loadScreen").style.display = "none";
//     console.log("scene is now loaded");
// }


const createScene = function(){

    engine.displayLoadingUI();

    // Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);

    // Create Camera
    const camera = new BABYLON.ArcRotateCamera("Camera", 1.57, 0.75, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.fov = 0.5;

    camera.allowUpsideDown = false;
    camera.panningSensibility = 0;
    camera.angularSensibilityX = 512;
    camera.angularSensibilityY = 512;
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 10;
    camera.lowerBetaLimit = 0.75;
    camera.upperBetaLimit = 0.75;

    console.log(engine.getRenderHeight() /engine.getRenderWidth());
    var target = new BABYLON.Vector3(0,0,0);
    camera.setTarget(target);


    // Lighting Setup
    const sky = new BABYLON.HemisphericLight("Sky", new BABYLON.Vector3(-0.5, 1, 0), scene);
    const sun = new BABYLON.DirectionalLight("Sun", new BABYLON.Vector3(0, -1, 0), scene);
    
    sky.intensity = 0.75;

    sun.position = new BABYLON.Vector3(0, 10, 0);
    sun.direction = new BABYLON.Vector3(1, -1, 1);
    sun.diffuse = new BABYLON.Color3(1, 0.98, 0.7);
    sun.intensity = 2;
    sun.shadowEnabled = true;
    sun.autoCalcShadowZBounds = true;
    
    //Background Color
    scene.clearColor = new BABYLON.Color3(0.22, 0, 0.65);

    
    // Shadows
    const sg = new BABYLON.ShadowGenerator(2048, sun);
    sg.bias = 0.0005;
    sg.darkness = 0;
    sg.useBlurCloseExponentialShadowMap = true;
    sg.useContactHardeningShadow = false;
    sg.useKernelBlur = true;
    sg.blurKernel = 8;

    
    // Define Default Material
    const defmat = new BABYLON.PBRMaterial("defmat", scene);
    defmat.reflectivityColor = new BABYLON.Color3(0, 0, 0);
    defmat.transparencyMode = 0;
    defmat.indexOfRefraction = 1.0;
    defmat.roughness = 1;
    defmat.metallic = 0;
    defmat.metallicF0Factor = 0;

    // Load Asset Function

    // function loadMesh(meshName, meshPosition, dialogText){
    //     BABYLON.SceneLoader.ImportMeshAsync("","../assets/", (meshName + ".glb")).then((result) => {
    //         result.meshes.forEach(mesh => {
    //             // Define 
    //             mesh.material = defmat;
    //             mesh.receiveShadows = true;
    //             sg.addShadowCaster(mesh, true);
    
    //             // Set position
    //             //if(mesh.id != "__root__"){} else {mesh.position = meshPosition;}
    
    //             // Glow, Dialog Pop & Movement
    //             // hl.addMesh(mesh, BABYLON.Color3.Yellow());
    
    //             // mesh.actionManager = new BABYLON.ActionManager(scene);
    //             // mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
    //             //     cam_move(tilePosition);
    //             //     dialog_pop(dialogText);
    //             //     mesh.material = defmat;
    //             //     // hl.removeMesh(mesh);

    //             //     // Set outline
    //             //     mesh.renderOutline = true;
    //             //     mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
    //             //     mesh.outlineWidth = 0.025;
    //             // }));

    //             // TODO: Highlight
    //             // mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickOutTrigger, function () {
    //             //     dialog_pop(dialogText);
    //             //     hl.removeMesh(mesh);
    
    //             //     cam_move(tilePosition);
    //             // }));
                
                
    //         });
    //     });
    // }

    function loadMesh(meshName, meshPosition, dialogText){
        BABYLON.SceneLoader.ImportMeshAsync("","../assets/", (meshName + ".glb")).then((result) => {
            result.meshes.forEach(mesh => {
                // Define 
                mesh.material = defmat;
                mesh.receiveShadows = true;
                sg.addShadowCaster(mesh, true);
                for (i = 0; i < scene.animationGroups.length; i++) {
                    scene.animationGroups[i].play(true);
                }
    
                // Set position
                //if(mesh.id != "__root__"){} else {mesh.position = meshPosition;}
    
                // Glow, Dialog Pop & Movement
                // hl.addMesh(mesh, BABYLON.Color3.Yellow());
    
                // mesh.actionManager = new BABYLON.ActionManager(scene);
                // mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                //     cam_move(tilePosition);
                //     dialog_pop(dialogText);
                //     mesh.material = defmat;
                //     // hl.removeMesh(mesh);

                //     // Set outline
                //     mesh.renderOutline = true;
                //     mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
                //     mesh.outlineWidth = 0.025;
                // }));

                // TODO: Highlight
                // mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickOutTrigger, function () {
                //     dialog_pop(dialogText);
                //     hl.removeMesh(mesh);
    
                //     cam_move(tilePosition);
                // }));
                
                
            });
        });
    }

    loadMesh("framing_ref");
    // loadMesh("framing_02");
    // loadMesh("framing_03");

    // Hightlight Layer
    // const hl = new BABYLON.HighlightLayer("hl1", scene);


    // // Camera Movement
    // var camMover = new BABYLON.TransformNode("camMover", scene);
    // camera.parent = camMover;

    // function cam_move(destination) {
    //     const frameRate = 1;

    //     const camTween = new BABYLON.Animation("camTween", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    //     const keyFrames = [];

    //     keyFrames.push ({frame: 0, value: camMover.position});
    //     keyFrames.push ({frame: 1, value: destination});
    //     camTween.setKeys(keyFrames);

    //     const easingFunction = new BABYLON.QuinticEase();
    //     easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    //     camTween.setEasingFunction(easingFunction);

    //     camMover.animations.push(camTween);
    //     scene.beginAnimation(camMover, 0, 2, true);
    // };
    

    // POST PROCESSING

    var defaultPipeline = new BABYLON.DefaultRenderingPipeline("DefaultRenderingPipeline", true, scene, scene.cameras);
    if (defaultPipeline.isSupported) {
        // MSAA
        defaultPipeline.samples = 1; // 1 by default

        /* imageProcessing */
        defaultPipeline.imageProcessingEnabled = false;
    }

    // Show Inspector
    // scene.debugLayer.show();

    // Rendering Optimizations
    engine.setHardwareScalingLevel(1);

    var options = new BABYLON.SceneOptimizerOptions();
    // options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 2));
    // options.addOptimization(new BABYLON.PostProcessesOptimization(1));

    // Optimizer
    var optimizer = new BABYLON.SceneOptimizer(scene, options);
    optimizer.targetFrameRate = 60;
    optimizer.trackerDuration = 2500;
    optimizer.start();
    
    engine.hideLoadingUI();

    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});
