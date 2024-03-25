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

const createScene = function(){

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


    // Create Initial Scene

    var ground = BABYLON.MeshBuilder.CreateGround("GEO.Ground", {width:5, height:5}, scene);
    ground.material = new BABYLON.ShadowOnlyMaterial('MAT.ShadowCatcher', scene)
    ground.receiveShadows = true;

        
    document.getElementById("loadFrame").style.display = 'inline';
        
        BABYLON.SceneLoader.LoadAssetContainer("assets/", "000-start.glb", scene, function(container) {
            container.meshes.forEach(mesh => {
                mesh.material = vcolmat;
                mesh.receiveShadows = true;
                sg.addShadowCaster(mesh, true);
                mesh.renderOutline = true;
                mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
                mesh.outlineWidth = 0.005;
            });

            container.addAllToScene();

            let mesh = scene.getMeshById("EVT.Booths");
            hl.addMesh(mesh, BABYLON.Color3.Yellow());
            mesh.actionManager = new BABYLON.ActionManager(scene);
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                load010();
            }));
        });

    document.getElementById("loadFrame").style.display = 'none';

    
    
    function resetScene(){ //TODO: Fix disposal error
        scene.getMeshByName("__root__").dispose(false, true); //true value also disposes materials and textures
        scene.animationGroups = [];
        scene.materials = [];

        camAnim(new BABYLON.Vector3(1.57, 0.75, 20), new BABYLON.Vector3(0, 0, 0), 0.01);
        
        document.getElementById("homeButton").style.display = "none";
        document.getElementById("dialogFrame").style.display = "none";
        document.getElementById("logoContainer").style.display = 'none';
        document.getElementById("poweredContainer").style.display = 'none';
    };

    function addHome(){
        let home = document.getElementById("homeButton");
        home.style.display = "inline";
        home.addEventListener('click', event => {loadStart();});
    }

    function loadStart(){
        resetScene();

        document.getElementById("loadFrame").style.display = 'inline';

        document.getElementById("logoContainer").style.display = 'inline';
        document.getElementById("poweredContainer").style.display = 'inline';

        BABYLON.SceneLoader.LoadAssetContainer("assets/", "000-start.glb", scene, function(container) {
            container.meshes.forEach(mesh => {
                mesh.material = vcolmat;
                mesh.receiveShadows = true;
                sg.addShadowCaster(mesh, true);
                mesh.renderOutline = true;
                mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
                mesh.outlineWidth = 0.005;
            });

            container.addAllToScene();

            let mesh = scene.getMeshById("EVT.Booths");
            hl.addMesh(mesh, BABYLON.Color3.Yellow());
            mesh.actionManager = new BABYLON.ActionManager(scene);
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                load010();
            }));
        });

        document.getElementById("loadFrame").style.display = 'none';
    };

    function load010(){
        resetScene();
        document.getElementById("loadFrame").style.display = 'inline';

        BABYLON.SceneLoader.LoadAssetContainer("assets/", "010-links_rechts.glb", scene, function(container) {
            container.meshes.forEach(mesh => {
                mesh.material = vcolmat;
                mesh.receiveShadows = true;
                sg.addShadowCaster(mesh, true);
                mesh.renderOutline = true;
                mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
                mesh.outlineWidth = 0.005;
            });

            scene.stopAllAnimations();
            container.addAllToScene();

            // console.log(container.animationGroups);

            let openL = scene.getMeshById("GEO.Belgium.L");
            hl.addMesh(openL, BABYLON.Color3.Yellow());
            openL.actionManager = new BABYLON.ActionManager(scene);
            let openLAction = openL.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(1, 0, 15), new BABYLON.Vector3(0, 0, 0), 0.75);
                    for (let i = 0; i < container.animationGroups.length; i++) {
                        container.animationGroups[i].play();
                    }
                    hl.removeMesh(scene.getMeshById("GEO.Belgium.L"));
                    hl.removeMesh(scene.getMeshById("GEO.Belgium.R"));
                    openL.actionManager.unregisterAction(openLAction);
                    openR.actionManager.unregisterAction(openRAction);
            }));

            let openR = scene.getMeshById("GEO.Belgium.R");
            hl.addMesh(openR, BABYLON.Color3.Yellow());
            openR.actionManager = new BABYLON.ActionManager(scene);
            let openRAction = openR.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(1, 0, 15), new BABYLON.Vector3(0, 0, 0), 0.75);
                    for (let i = 0; i < container.animationGroups.length; i++) {
                        container.animationGroups[i].play();
                    }
                    hl.removeMesh(scene.getMeshById("GEO.Belgium.L"));
                    hl.removeMesh(scene.getMeshById("GEO.Belgium.R"));
                    openL.actionManager.unregisterAction(openLAction);
                    openR.actionManager.unregisterAction(openRAction);
            }));

            // SCENE TRIGGERS
            let pdva = scene.getMeshById("EVT.PVDA");
            hl.addMesh(pdva, BABYLON.Color3.Yellow());
            pdva.actionManager = new BABYLON.ActionManager(scene);
            pdva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.8, 0.75, 0.15), 0.5);
                    dialog_pop("PVDA");
                    hl.removeMesh(pdva);
            }));

            let groen = scene.getMeshById("EVT.Groen");
            hl.addMesh(groen, BABYLON.Color3.Yellow())
            groen.actionManager = new BABYLON.ActionManager(scene);
            groen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.55, 0.75, 0.15), 0.5);
                    dialog_pop("Groen");
                    hl.removeMesh(groen);
            }))

            let vooruit = scene.getMeshById("EVT.Vooruit");
            hl.addMesh(vooruit, BABYLON.Color3.Yellow())
            vooruit.actionManager = new BABYLON.ActionManager(scene);
            vooruit.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.275, 0.75, 0.15), 0.5);
                    dialog_pop("Vooruit");
                    hl.removeMesh(vooruit);
            }))

            let cdnv = scene.getMeshById("EVT.CDNV");
            hl.addMesh(cdnv, BABYLON.Color3.Yellow())
            cdnv.actionManager = new BABYLON.ActionManager(scene);
            cdnv.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0, 0.75, 0.15), 0.5);
                    dialog_pop("CD&V");
                    hl.removeMesh(cdnv);
            }))

            let vld = scene.getMeshById("EVT.VLD");
            hl.addMesh(vld, BABYLON.Color3.Yellow())
            vld.actionManager = new BABYLON.ActionManager(scene);
            vld.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.275, 0.75, 0.15), 0.5);
                    dialog_pop("Open VLD");
                    hl.removeMesh(vld);
            }))

            let nva = scene.getMeshById("EVT.NVA");
            hl.addMesh(nva, BABYLON.Color3.Yellow())
            nva.actionManager = new BABYLON.ActionManager(scene);
            nva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.55, 0.75, 0.15), 0.5);
                    dialog_pop("NVA");
                    hl.removeMesh(nva);
            }))

            let vlb = scene.getMeshById("EVT.VLB");
            hl.addMesh(vlb, BABYLON.Color3.Yellow())
            vlb.actionManager = new BABYLON.ActionManager(scene);
            vlb.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.8, 0.75, 0.15), 0.5);
                    dialog_pop("Vlaams Belang");
                    hl.removeMesh(vlb);
            }))

        });

        document.getElementById("loadFrame").style.display = 'none';
        addHome();
    };

   
    // loadStart();


    // Show Inspector
    // scene.debugLayer.show();

    // Rendering Optimizations
    engine.setHardwareScalingLevel(1);

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
