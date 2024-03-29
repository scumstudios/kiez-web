import * as main from "./main.js";

export var sg
export var vcolmat
export var hl

export function createBase() {
    
    let scene = main.scene
    scene.useRightHandedSystem = true;

    // Create Ground Plane
    var ground = BABYLON.MeshBuilder.CreateGround("GEO.Ground", {width:5, height:5}, scene);
    ground.material = new BABYLON.ShadowOnlyMaterial('MAT.ShadowCatcher', scene)
    ground.receiveShadows = true;

    // Create Camera
    const camera = new BABYLON.ArcRotateCamera("Camera", 1.57, 0.75, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(main.canvas, true);
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

    vcolmat = new BABYLON.StandardMaterial("vcolmat", scene);
    vcolmat.specularColor = new BABYLON.Color3(0, 0, 0);
    vcolmat.emissiveColor = new BABYLON.Color3(0.25, 0.25, 0.25);

    //Background Color
    scene.clearColor = new BABYLON.Color3(0.22, 0, 0.65);
    
    // Hightlight Layer
    hl = new BABYLON.HighlightLayer("hl1", scene);
    hl.blurHorizontalSize = 0.33;
    hl.blurVerticalSize = 0.33;

};