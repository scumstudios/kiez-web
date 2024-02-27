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
//         z-index: 99;
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
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 7.5;
    camera.upperRadiusLimit = 12.5;
    camera.lowerBetaLimit = 0.75;
    camera.upperBetaLimit = 0.75;

    console.log(engine.getRenderHeight() /engine.getRenderWidth());
    var target = new BABYLON.Vector3(0,0,0);
    camera.setTarget(target);


    // Lighting Setup
    const sky = new BABYLON.HemisphericLight("Sky", new BABYLON.Vector3(-0.5, 1, 0), scene);
    sky.intensity = 1;
    
    //Background Color
    scene.clearColor = new BABYLON.Color3(0.22, 0, 0.65);
    
    // Define Default Material
    const defmat = new BABYLON.PBRMaterial("defmat", scene);
    defmat.reflectivityColor = new BABYLON.Color3(0, 0, 0);
    defmat.transparencyMode = 0;
    defmat.indexOfRefraction = 1.5;
    defmat.roughness = 1;
    defmat.metallic = 0;
    defmat.metallicF0Factor = 0;
    
    // Hightlight Layer
    const hl = new BABYLON.HighlightLayer("hl1", scene);
    // hl.innerGlow = false;
    hl.blurHorizontalSize = 0.5;
    hl.blurVerticalSize = 0.5;


    // Reset Scene
    function killScene(){
        while(scene.meshes.length) {
            const mesh = scene.meshes[0]
            mesh.dispose();
            }
        camera.alpha = 1.57;
        camera.beta = 0.75;
        camera.radius = 10;
    }

    // function loadScene(sceneName){
    //     var sceneName = BABYLON.SceneLoader.ImportMeshAsync("","/assets/", (sceneName + ".glb")).then((result) => { //TODO Fix Relative Link
    //         result.meshes.forEach(mesh => {
    //             // Set outline
    //             mesh.renderOutline = true;
    //             mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
    //             mesh.outlineWidth = 0.005;
    //             for (i = 0; i < scene.animationGroups.length; i++) {
    //                 scene.animationGroups[i].play(true);
    //             }            
    //         });
    //     });
    // }

    function loadStart(){
        document.getElementById("dialogFrame").style.visibility = 'hidden'; // TEMP FOR DEV
        document.getElementById("logoContainer").style.visibility = 'visible';
        document.getElementById("poweredContainer").style.visibility = 'visible';
        
        killScene();
        
        BABYLON.SceneLoader.ImportMeshAsync("","../assets/", ("000-start.glb")).then((result) => { //TODO Fix Relative Link
            result.meshes.forEach(mesh => {
                // Set outline
                if (mesh.name != "zFloor"){
                    mesh.renderOutline = true;
                    mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
                    mesh.outlineWidth = 0.005;
                }
                for (i = 0; i < scene.animationGroups.length; i++) {
                    scene.animationGroups[i].play(true);
                }            
            });
        
            // SCENE TRIGGERS
            let mesh = scene.getMeshById("EVT.Booths");
            hl.addMesh(mesh, BABYLON.Color3.Yellow());
            mesh.actionManager = new BABYLON.ActionManager(scene);
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                load10();
            }))
        });
    }

    function load10(){
        document.getElementById("logoContainer").style.visibility = 'hidden';
        document.getElementById("poweredContainer").style.visibility = 'hidden';

        killScene();

        BABYLON.SceneLoader.ImportMeshAsync("","../assets/", ("100-test.glb")).then((result) => { //TODO Fix Relative Link
            result.meshes.forEach(mesh => {
                // Set outline
                if (mesh.name != "zFloor"){
                    mesh.renderOutline = true;
                    mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
                    mesh.outlineWidth = 0.005;
                }
                for (i = 0; i < scene.animationGroups.length; i++) {
                    scene.animationGroups[i].play(true);
                }            
            });

            // SCENE TRIGGERS
            let mesh = scene.getMeshById("EVT.Back");
            hl.addMesh(mesh, BABYLON.Color3.Yellow())
            mesh.actionManager = new BABYLON.ActionManager(scene);
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    loadStart();
            }))
        });
        dialog_pop("REF: Scene 100");
    }

   
    loadStart();

    

    

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
    engine.setHardwareScalingLevel(0.75);

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
