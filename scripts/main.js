// Custom Loading UI
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    document.getElementById("loadFrame").style.display = "inline";
    return;
}

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
    document.getElementById("loadFrame").style.display = "none";
}

// Get Canvas
export const canvas = document.getElementById("renderCanvas");

// Create Engine
export const engine = new BABYLON.Engine(canvas, true, { stencil: true });
export const scene = new BABYLON.Scene(engine);
export const camera = new BABYLON.ArcRotateCamera("Camera", 1.57, 0.75, 10, new BABYLON.Vector3(0, 0, 0), scene);

export let sg
export let vcolmat
export let hl

// Dialog Interaction Function
export function dialogPop(text, link, link_url) {

    document.getElementById("dialogFrame").style.display = 'grid';
    document.getElementById("dialogText").textContent = text;
    document.getElementById("dialogButton").style.display = "inline"
    document.getElementById("dialogButton").addEventListener("click", function() {
        window.location.href = link_url;
    });

}

export function camAnim(pos, lookAt, duration) {

    const animations = [
        // move the camera position
        animMove(camera, pos),
        // move the camera target
        animLookAt(camera, lookAt),
    ];

    function animMove(camera, pos) {
        const anim = new BABYLON.Animation('movecam', 'position', 1, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
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
        const anim = new BABYLON.Animation('lookcam', 'target', 1, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
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

export function loadScene(extScene) {
    
    engine.displayLoadingUI();

    scene.useRightHandedSystem = true;

    // scene.debugLayer.show();

    // Create Ground Plane
    const ground = BABYLON.MeshBuilder.CreateGround("GEO.Ground", {width:5, height:5}, scene);
    ground.material = new BABYLON.ShadowOnlyMaterial('MAT.ShadowCatcher', scene)
    ground.receiveShadows = true;

    // Create Camera
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
    sg = new BABYLON.ShadowGenerator(1024, sun);
    
    sg.bias = 0.0075;
    sg.darkness = 0.85;
    sg.usePercentageCloserFiltering = true;
    sg.filteringQuality = 0;

    vcolmat = new BABYLON.StandardMaterial("MAT.VertexColors", scene);
    vcolmat.specularColor = new BABYLON.Color3(0, 0, 0);
    vcolmat.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    //Background Color
    scene.clearColor = new BABYLON.Color3(0.22, 0, 0.65);
    
    // Hightlight Layer
    hl = new BABYLON.HighlightLayer("hl", scene);
    hl.blurHorizontalSize = 0.33;
    hl.blurVerticalSize = 0.33;

    extScene();

    engine.setHardwareScalingLevel(0.75);

    var options = new BABYLON.SceneOptimizerOptions();
    options.addOptimization(new BABYLON.HardwareScalingOptimization(0.75, 1.5));

    // Optimizer
    var optimizer = new BABYLON.SceneOptimizer(scene, options);
    optimizer.targetFrameRate = 30;
    optimizer.trackerDuration = 2500;
    optimizer.start();

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });

    engine.hideLoadingUI();
};