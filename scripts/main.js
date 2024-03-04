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

const createScene = function(){
    // Custom Loading Screen
    BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
            document.getElementById("loadFrame").style.display = "inline";
            return;
        }

    BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
            document.getElementById("loadFrame").style.display = "none";
        }

    
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
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 10;
    camera.lowerBetaLimit = 0.75;
    camera.upperBetaLimit = 0.75;

    function cam_move(target) { //TODO: Alpha, Beta, Radius
        const frameRate = 1;

        const camTween = new BABYLON.Animation("camTween", "target", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        const keyFrames = [];

        keyFrames.push ({frame: 0, value: camera.target});
        keyFrames.push ({frame: 1, value: target});
        camTween.setKeys(keyFrames);

        const easingFunction = new BABYLON.ElasticEase(); //
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        camTween.setEasingFunction(easingFunction);

        camera.animations.push(camTween);
        scene.beginAnimation(camera, 0, 2, false);
    };

    // Lighting Setup
    const sky = new BABYLON.HemisphericLight("Sky", new BABYLON.Vector3(-0.5, 1, 0), scene);
    sky.intensity = 1;
    
    //Background Color
    scene.clearColor = new BABYLON.Color3(0.22, 0, 0.65);
    
    // Hightlight Layer
    const hl = new BABYLON.HighlightLayer("hl1", scene);
    // hl.innerGlow = false;
    hl.blurHorizontalSize = 0.5;
    hl.blurVerticalSize = 0.5;

    // Reset Scene
    function resetScene(){
        while(scene.meshes.length) {
            const mesh = scene.meshes[0]
            mesh.dispose(false, true); //true value also disposes materials and textures
            }

        camera.setPosition(new BABYLON.Vector3(1.57, 0.75, 10));
    }

    function loadStart(){
        document.getElementById("dialogFrame").style.visibility = 'hidden'; // TEMP FOR DEV
        document.getElementById("logoContainer").style.visibility = 'visible';
        document.getElementById("poweredContainer").style.visibility = 'visible';
        
        resetScene();
        engine.displayLoadingUI();

        BABYLON.SceneLoader.Append("assets/", "000-start.glb", scene, function(scene) { //TODO Fix Relative Link
            scene.meshes.forEach(mesh => {
                // Set outline
                if (mesh.name != "GEO.Shadow"){
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
                load010();
                cam_move(new BABYLON.Vector3(0,1,0));
            }))
        });
    }

    function load010(){
        document.getElementById("logoContainer").style.visibility = 'hidden';
        document.getElementById("poweredContainer").style.visibility = 'hidden';

        resetScene();
        engine.displayLoadingUI();

        BABYLON.SceneLoader.Append("assets/", "010-test.glb",scene, function(scene) { //TODO Fix Relative Link
            scene.meshes.forEach(mesh => {
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
                    cam_move(new BABYLON.Vector3(0,0,0));
            }))
        });

        dialog_pop("REF: Scene 010");
    }

   
    loadStart();
    

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
    options.addOptimization(new BABYLON.HardwareScalingOptimization(0.75, 1.5));
    // options.addOptimization(new BABYLON.PostProcessesOptimization(1));

    // Optimizer
    var optimizer = new BABYLON.SceneOptimizer(scene, options);
    optimizer.targetFrameRate = 30;
    optimizer.trackerDuration = 2500;
    optimizer.start();

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
