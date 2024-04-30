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
export const prtSel = new BABYLON.ParticleSystem("prtSelect", 100, scene);

export let sg
export let vcolmat

// Dialog Interaction Function
export function dialogPop(title, text, link, link_url) {
    document.getElementById("dialogFrame").style.display = 'grid';
    document.getElementById("dialogTitle").textContent = title;
    document.getElementById("dialogText").textContent = text;
    if(link) {
        document.getElementById("dialogButton").style.display = "inline"
        document.getElementById("dialogButton").addEventListener("click", function() {
            window.location.href = link_url;
        });
    }
    else {
        document.getElementById("dialogButton").style.display = "none"
    }
}

export function camAnim(alpha, beta, radius, target, duration) {

    const animations = [
        // move the camera position
        animAlpha(camera, alpha),
        animBeta(camera, beta),
        animRadius(camera, radius),
        // move the camera target
        animTarget(camera, target)
    ];

    function animAlpha(camera, a) {
        
        camera.alpha = camera.alpha % (Math.PI*2);
        if (camera.alpha < 0) camera.alpha += Math.PI*2;
        
        const anim = new BABYLON.Animation('camA', 'alpha', 1, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        anim.setKeys([
            {frame: 0, value: camera.alpha},
            {frame: duration, value: a},
        ]);

        // easing
        const easingFun = new BABYLON.SineEase();
        easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        anim.setEasingFunction(easingFun);
        return anim;
    }

    function animBeta(camera, b) {
        const anim = new BABYLON.Animation('camB', 'beta', 1, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        anim.setKeys([
            {frame: 0, value: camera.beta},
            {frame: duration, value: b},
        ]);

        // easing
        const easingFun = new BABYLON.SineEase();
        easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        anim.setEasingFunction(easingFun);
        return anim;
    }

    function animRadius(camera, r) {
        const anim = new BABYLON.Animation('camR', 'radius', 1, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        anim.setKeys([
            {frame: 0, value: camera.radius},
            {frame: duration, value: r},
        ]);

        // easing
        const easingFun = new BABYLON.SineEase();
        easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        anim.setEasingFunction(easingFun);
        return anim;
    }
  
  function animTarget(camera, target) {
        const tgt = scene.getTransformNodeByID(target).position.clone()
        const anim = new BABYLON.Animation('camT', 'target', 1, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        anim.setKeys([
            {frame: 0, value: camera.target.clone()},
            {frame: duration, value: tgt},
        ]);

        // easing 
        const easingFun = new BABYLON.SineEase();
        easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        anim.setEasingFunction(easingFun);
        return anim;
    }

    scene.beginDirectAnimation(camera, animations, 0, 2, false);
};

export function setB(mesh) {
    mesh.outlineColor = new BABYLON.Color3.Black();
    mesh.outlineWidth = 0.005;
}

export function setY(mesh) {
    mesh.outlineColor = new BABYLON.Color3.Yellow();
    mesh.outlineWidth = 0.01;
}

export function setW(mesh) {
    mesh.outlineColor = new BABYLON.Color3.White();
    mesh.outlineWidth = 0.01;
}

export function prtHighlight(mesh, amount, size, radius) {
    prtSel.stop();
    prtSel.emitter = mesh;

    if (!radius) {
        let bounds = mesh.getBoundingInfo();
        prtSel.createCylinderEmitter(bounds.diagonalLength / Math.PI, 0, 1);
    }
    else {
        prtSel.createSphereEmitter(radius, 0, 1);
    }
    

    if (amount == null) {
        prtSel.emitRate = 25;
    }
    else {
        prtSel.emitRate = amount;
    }

    if (size == null) {
        prtSel.minSize = 0.01;
        prtSel.maxSize = 0.025;
    }
    else {
        prtSel.minSize = size / 1.5;
        prtSel.maxSize = size * 1.5;
    }

    prtSel.start();
}

export function loadScene(extScene) {
    
    // scene.debugLayer.show();

    engine.displayLoadingUI();
    scene.useRightHandedSystem = true;
    engine.setHardwareScalingLevel(1);


    // Create Ground Plane
    const ground = BABYLON.MeshBuilder.CreateGround("GEO.Ground", {width:10, height:10}, scene);
    ground.material = new BABYLON.ShadowOnlyMaterial('MAT.ShadowCatcher', scene)
    ground.receiveShadows = true;

    // Create Camera
    camera.attachControl(canvas, true);
    camera.fov = 0.5;

    camera.allowUpsideDown = false;
    camera.panningSensibility = 0;
    camera.angularSensibilityX = 512;
    camera.angularSensibilityY = 512;
    camera.wheelPrecision = 10;
    camera.useNaturalPinchZoom = true;
    camera.lowerRadiusLimit = 3.5;
    camera.upperRadiusLimit = 15;
    camera.lowerBetaLimit = 0.65;
    camera.upperBetaLimit = 1.5;
    camera.minZ = 0.25;

    // Lighting Setup
    const sun = new BABYLON.DirectionalLight("Sun", new BABYLON.Vector3(-0.75, -1, -0.5), scene);
    sun.intensity = 1;
    sun.autoCalcShadowZBounds = false;
    sun.shadowMinZ = -1;
    sun.shadowMaxZ = 3;

    // Shadows
    sg = new BABYLON.ShadowGenerator(1024, sun);
    
    sg.bias = 0.0075;
    sg.darkness = 0.85;
    sg.usePercentageCloserFiltering = true;
    sg.filteringQuality = 0;

    vcolmat = new BABYLON.StandardMaterial("MAT.VertexColors", scene);
    vcolmat.specularColor = new BABYLON.Color3(0, 0, 0);
    vcolmat.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    //BG COLOR
    scene.clearColor = new BABYLON.Color3(0.22, 0, 0.65);

    // SELECTION PARTICLES
    prtSel.particleTexture = new BABYLON.Texture("img/prt.svg",);
    prtSel.maxLifeTime = 1;
    prtSel.minEmitPower = 0;
    prtSel.maxEmitPower = 0;
    prtSel.gravity = new BABYLON.Vector3(0, 1, 0);

    // BG INSTANCES
    BABYLON.SceneLoader.ImportMesh("", "assets/", "instances.glb", scene, function (newMeshes) {
        newMeshes.forEach(mesh => {
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh);
            mesh.material = vcolmat;
        });
    });


    extScene();

    var options = new BABYLON.SceneOptimizerOptions();
    options.addOptimization(new BABYLON.HardwareScalingOptimization(1, 1.5));

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