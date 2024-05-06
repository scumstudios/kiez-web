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
    scene.getAnimationGroupByName("ANIM.Plane").start(true);

    camAnim(Math.PI/2, 0.5, 10, "TGT.Reset", 0.5);
    dialogPop("Politiek & de maatschappij", "Stemmen is een manier om actief deel te nemen aan de democratie, invloed te hebben op het beleid en ervoor te zorgen dat de regering rekening houdt met de belangen en waarden van de bevolking en dus ook met die van jou! Kortom, politiek beslist over jouw leven, hoe jij jouw dag kan en mag invullen. En welke keuzes jij kan maken om jouw leven in te richten zoals jij het wilt.", false)

    // RESET
    let reset = scene.getMeshById("GEO.Static");
    reset.actionManager = new BABYLON.ActionManager(scene);
        reset.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.5, 10, "TGT.Reset", 0.5);
                document.getElementById("dialogFrame").style.display = 'none';
    }));

    // EMPLOYMENT
    let employment = scene.getMeshById("EVT.Employment");
    main.setW(employment);
    employment.actionManager = new BABYLON.ActionManager(scene);
    employment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        document.getElementById("dialogFrame").style.display = 'none';
        camAnim(Math.PI/2, 0.5, 10, "TGT.Reset", 0.25);
        main.prtHighlight(employment, null, 0.01);
        const employmentAnimation = scene.getAnimationGroupByName("ANIM.Employment");
        employmentAnimation.onAnimationEndObservable.add(() => {
            document.getElementById("dialogFrame").style.display = 'none';
            camAnim(2, 0.6, 3.5, "TGT.Employment", 0.75);
            document.getElementById("dialogButton").style.display = 'none';
            main.setY(employment);
            dialogPop("Werkgelegenheid", "Politici beslissen over maatregelen die de economie stimuleren zoals stages organiseren, kansen bieden voor jonge ondernemers en minimumlonen", false);
        });

        employment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            employmentAnimation.start(false);
        }));
    }));

    // JUSTICE
    let justice = scene.getMeshById("EVT.Justice");
    main.setW(justice);
    justice.actionManager = new BABYLON.ActionManager(scene);
    justice.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        document.getElementById("dialogFrame").style.display = 'none';
        camAnim(Math.PI/2, 0.5, 10, "TGT.Reset", 0.25);
        main.prtHighlight(justice, null, 0.01);
        const justiceAnimation = scene.getAnimationGroupByName("ANIM.Justice");
        justiceAnimation.onAnimationEndObservable.add(() => {
            camAnim(2, 0.6, 3.5, "TGT.Justice", 0.75);
            dialogPop("Justitie", "De regering bepaalt alles in verband met regels en wetten. Denk aan verkeersregels, wetten over rechten en plichten op de werkvloer, belastingen,...", false);
            main.setY(justice);
        });

        justice.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            justiceAnimation.start(false);
        }));
    }));

    let education = scene.getMeshById("EVT.Education");
    main.setW(education);
    education.actionManager = new BABYLON.ActionManager(scene);
    education.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        document.getElementById("dialogFrame").style.display = 'none';
        camAnim(Math.PI/2, 0.5, 10, "TGT.Reset", 0.25);
        main.prtHighlight(education, null, 0.01);
        const educationAnimation = scene.getAnimationGroupByName("ANIM.Education");
        educationAnimation.onAnimationEndObservable.add(() => {
            camAnim(2, 0.6, 3.5, "TGT.Education", 0.75);
            dialogPop("Educatie", "Politieke beslissingen beïnvloeden het onderwijssysteem, van kleuterscholen tot universiteiten. Ook voor jouw school worden er zaken beslist zoals: onderwijsfinanciering, leerplannen, vakanties,...", false);
            main.setY(education);
        });

            education.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                educationAnimation.start(false);
            }));
        }));

    let care = scene.getMeshById("EVT.Care");
    main.setW(care);
    care.actionManager = new BABYLON.ActionManager(scene);
        care.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        document.getElementById("dialogFrame").style.display = 'none';
        camAnim(Math.PI/2, 0.5, 10, "TGT.Reset", 0.25);
        main.prtHighlight(care, null, 0.01);
        const careAnimation = scene.getAnimationGroupByName("ANIM.Care");
        careAnimation.onAnimationEndObservable.add(() => {
            camAnim(2, 0.6, 3.5, "TGT.Care", 0.75);
            dialogPop("Sociale Welvaart", "Ook op sociaal gebied speelt de politiek een belangrjike rol. Denk aan gezondheidszorg, gelijkheid voor iedereen, diversiteit & inclusie.", false);
            main.setY(care);
        });

            care.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                careAnimation.start(false);
            }));
        }));

    let environment = scene.getMeshById("EVT.Environment");
    main.setW(environment);
    environment.actionManager = new BABYLON.ActionManager(scene);
    environment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        document.getElementById("dialogFrame").style.display = 'none';
        camAnim(Math.PI/2, 0.5, 10, "TGT.Reset", 0.25);
        main.prtHighlight(environment, null, 0.01);
        const environmentAnimation = scene.getAnimationGroupByName("ANIM.Environment");
        environmentAnimation.onAnimationEndObservable.add(() => {
            camAnim(2, 0.6, 3.5, "TGT.Environment", 0.75);
            dialogPop("Ecologie & Omgeving", "De politiek beslist ook over dingen die te maken hebben met milieu. Zo worden er op Europees niveau bijvoorbeeld beslissingen gemaakt over de opwarming van de aarde en op Vlaams niveau over dingen zoals afvalverwerking, plaatsen van windmolens, subsidies voor elektrische auto's, zonnepanelen,...", false);
            main.setY(environment);
        });

            environment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                environmentAnimation.start(false);
            }));
        }));
    });
  };