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
    camera.lowerRadiusLimit = 7.5;
    camera.upperRadiusLimit = 12.5;
    camera.lowerBetaLimit = 0.75;
    camera.upperBetaLimit = 0.75;

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


    // Camera Movement

    // function camMove(destination) {
        // const frameRate = 1;

        // const camTween = new BABYLON.Animation("camTween", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        // const keyFrames = [];

        // keyFrames.push ({frame: 0, value: camera.alpha});
        // keyFrames.push ({frame: 1, value: destination});
        // camTween.setKeys(keyFrames);

        // const easingFunction = new BABYLON.QuinticEase();
        // easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        // camTween.setEasingFunction(easingFunction);

        // camera.animations.push(camTween);
        // scene.beginAnimation(camera, 0, 2, true);



    //     const FRAMES_PER_SECOND = 60;

    //     const alphaAnimation = Animation.CreateAnimation("alpha", Animation.ANIMATIONTYPE_FLOAT, FRAMES_PER_SECOND, ease);

    //     betaAnimation.setKeys([
    //         {
    //             frame: 0,
    //             value: camera.alpha,
    //         },
    //         {
    //             frame: 100,
    //             value: to,
    //         },
    //     ]);
    // };


    // Reset Scene
    function resetScene(){
        while(scene.meshes.length) {
            const mesh = scene.meshes[0]
            mesh.dispose();
            }
        camera.position = new BABYLON.Vector3(0, 0, 0);
        camera.alpha = 1.57;
        camera.beta = 0.75;
        camera.radius = 10;
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

        resetScene();
        engine.displayLoadingUI();

        BABYLON.SceneLoader.Append("assets/", "100-test.glb",scene, function(scene) { //TODO Fix Relative Link
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
