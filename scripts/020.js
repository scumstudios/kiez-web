import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc020(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    main.camera.lowerBetaLimit = 0.35;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "020-politics_influence.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            main.setB(mesh);
        });

    container.addAllToScene();
    scene.stopAllAnimations();

    let reset = scene.getMeshById("GEO.Static");
    reset.actionManager = new BABYLON.ActionManager(scene);
        reset.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(Math.PI/2, 0.5, 7.5, "TGT.Reset", 0.5);
                document.getElementById("dialogFrame").style.display = 'none';
    }));

    let employment = scene.getMeshById("EVT.Employment");
    main.setW(employment);
    employment.actionManager = new BABYLON.ActionManager(scene);
    employment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
    camAnim(Math.PI/2, 0.5, 7.5, "TGT.Reset", 0.25);

    const employmentAnimation = scene.getAnimationGroupByName("ANIM.Employment");
    employmentAnimation.onAnimationEndObservable.add(() => {
        camAnim(2, 0.6, 3.5, "TGT.Employment", 0.75);
        dialogPop("Werkgelegenheid", "Invloed op werkgelegenheid", false);
        document.getElementById("dialogButton").style.display = 'none';
        main.setY(employment);
    });

        employment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            employmentAnimation.start(false);
        }));
    }));


    let justice = scene.getMeshById("EVT.Justice");
    main.setW(justice);
    justice.actionManager = new BABYLON.ActionManager(scene);
    justice.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
    camAnim(Math.PI/2, 0.5, 7.5, "TGT.Reset", 0.25);

    const justiceAnimation = scene.getAnimationGroupByName("ANIM.Justice");
    justiceAnimation.onAnimationEndObservable.add(() => {
        camAnim(2, 0.6, 3.5, "TGT.Justice", 0.75);
        dialogPop("Justitie", "Invloed op justitie", false);
        main.setY(justice);
    });

        justice.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            justiceAnimation.start(false);
        }));
    }));

    let education = scene.getMeshById("EVT.Education");
    main.setW(education);
    education.actionManager = new BABYLON.ActionManager(scene);
    education.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
    camAnim(Math.PI/2, 0.5, 7.5, "TGT.Reset", 0.25);

    const educationAnimation = scene.getAnimationGroupByName("ANIM.Education");
    educationAnimation.onAnimationEndObservable.add(() => {
        camAnim(2, 0.6, 3.5, "TGT.Education", 0.75);
        dialogPop("Educatie", "Invloed op educatie", false);
        main.setY(education);
    });

        education.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            educationAnimation.start(false);
        }));
    }));

    let care = scene.getMeshById("EVT.Care");
    main.setW(care);
    care.actionManager = new BABYLON.ActionManager(scene);
    care.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
    camAnim(Math.PI/2, 0.5, 7.5, "TGT.Reset", 0.25);

    const careAnimation = scene.getAnimationGroupByName("ANIM.Care");
    careAnimation.onAnimationEndObservable.add(() => {
        camAnim(2, 0.6, 3.5, "TGT.Care", 0.75);
        dialogPop("Sociale Welvaart", "Invloed op sociale welva", false);
        main.setY(care);
    });

        care.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            careAnimation.start(false);
        }));
    }));

    let environment = scene.getMeshById("EVT.Environment");
    main.setW(environment);
    environment.actionManager = new BABYLON.ActionManager(scene);
    environment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
    camAnim(Math.PI/2, 0.5, 7.5, "TGT.Reset", 0.25);

    const environmentAnimation = scene.getAnimationGroupByName("ANIM.Environment");
    environmentAnimation.onAnimationEndObservable.add(() => {
        camAnim(2, 0.6, 3.5, "TGT.Environment", 0.75);
        dialogPop("Sociale Welvaart", "Invloed op sociale welva", false);
        main.setY(environment);
    });

        environment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            environmentAnimation.start(false);
        }));
    }));
   
    });
  };