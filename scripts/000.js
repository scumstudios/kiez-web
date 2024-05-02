import * as main from "./main.js";

export default function sc000(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;
    let currentMesh = "";

    // LOAD ASSETS
    BABYLON.SceneLoader.LoadAssetContainer("assets/", "000-start.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            main.setY(mesh);
        });

        container.addAllToScene();
        scene.stopAllAnimations();
        
        main.camAnim(1.57, 1.3, 6, "TGT.Info", 0.75);

        container.animationGroups[0].play();
        container.animationGroups[0].loopAnimation = true;

        

        // START BUTTON
        let evt_info = scene.getMeshById("EVT.Info");

        // START PARTICLES
        const prtStart = new BABYLON.ParticleSystem("prtStart", 250, scene);
        prtStart.particleTexture = new BABYLON.Texture("img/prt.svg",);
        prtStart.createSphereEmitter(0.4);
        prtStart.emitter = evt_info;
        prtStart.emitRate = 25;
        prtStart.maxLifeTime = 1;
        prtStart.preWarmCycles = 60;
        prtStart.minSize = 0.02;
        prtStart.maxSize = 0.042;

        prtStart.minEmitPower = 0.1;
        prtStart.maxEmitPower = 0.3;
        prtStart.gravity = new BABYLON.Vector3(0, 2, 0);

        prtStart.start();
        

        // BOX START
        evt_info.actionManager = new BABYLON.ActionManager(scene);
        main.setW(evt_info);
        let evtPop = evt_info.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Kiez.nu", "Welkom bij Kiez! Wij helpen je geïnformeerd stemmen door je in te lichten over hoe de Belgische politiek werkt. Kies het topic waar je meer over wil weten.");
            document.getElementById("dialogButton").style.display = 'none';
            prtStart.dispose(true, false);
            
            let delay = 300; // Delay in milliseconds (adjust as needed)
            let counter = 1; // Initialize counter

            function playAnimations() {
            if (counter <= 5) {
                container.animationGroups[counter].play();
                counter++;
                setTimeout(playAnimations, delay);
            }
            }

            main.camAnim(1.57, 0.65, 10, "TGT.Zero", 1.5);
            playAnimations();
            main.camera.useAutoRotationBehavior = true;
            main.camera.idleRotationWatTime = 2500;
            main.camera.idleRotationSpeed = 0.01;
            main.camera.idleRotationSpinupTime = 3000;
            main.camera.zoomStopsAnimation = true;


            main.setB(evt_info);
            evt_info.actionManager.unregisterAction(evtPop);
        }));


        // L&R - SC010
        let evt_lr = scene.getMeshById("EVT.Compass");
        evt_lr.actionManager = new BABYLON.ActionManager(scene);
        evt_lr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            main.camera.useAutoRotationBehavior = false;
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Politieke Partijen", "Navigeer je door het politieke landschap, wat is links en rechts nu eigenlijk?", true, "../scn.html?s=010");
            main.camAnim(4.03, 1, 7.5, "TGT.Zero", 1);
            main.setB(evt_lr);
            main.prtHighlight(evt_lr);
        }));


        // IMPORTANCE OF POLITICS - SC020
        let evt_importance = scene.getMeshById("EVT.Parliament");
        evt_importance.actionManager = new BABYLON.ActionManager(scene);
        evt_importance.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            main.camera.useAutoRotationBehavior = false;
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Stemmen & Samenleving", "Waarom is stemmen zo belangrijk en hoe beïnvloedt het onze samenleving?", true, "../scn.html?s=020");
            main.camAnim(2.8, 1, 7.5, "TGT.Zero", 1);
            main.setB(evt_importance); 
            main.prtHighlight(evt_importance);
        }));


        // PRACTICAL VOTING - SC030
        let evt_howto = scene.getMeshById("EVT.Booth");
        evt_howto.actionManager = new BABYLON.ActionManager(scene);
        evt_howto.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            main.camera.useAutoRotationBehavior = false;
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Stemmen, Praktisch", "Hoe ziet het stemproces er praktisch uit?", true, "../scn.html?s=030");
            main.camAnim(1.575, 1, 7.5, "TGT.Zero", 1);
            main.setB(evt_howto);
            main.prtHighlight(evt_howto);
        }));


        // ELECTION TYPES - SC040
        let evt_type = scene.getMeshById("EVT.Elections");
        evt_type.actionManager = new BABYLON.ActionManager(scene);
        evt_type.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            main.camera.useAutoRotationBehavior = false;
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Kieskringen", "Lokaal, federaal, Europees... Wanneer stem je voor wat en hoe zit dat allemaal in elkaar?", true, "../scn.html?s=040");
            main.camAnim(5.355, 1, 7.5, "TGT.Zero", 1);
            main.setB(evt_type);
            main.prtHighlight(evt_type);
        }));


        // POST-ELECTION - SC050
        let evt_post = scene.getMeshById("EVT.Finish");
        evt_post.actionManager = new BABYLON.ActionManager(scene);
        evt_post.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            main.camera.useAutoRotationBehavior = false;
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Na het stemmen", "Iedereen heeft gestemd, wat gebeurt er nu?", true, "../scn.html?s=050");
            main.camAnim(0.295, 1, 7.5, "TGT.Zero", 1);
            main.setB(evt_post);
            main.prtHighlight(evt_post);
        }));

        // CREDITS
        let credits = scene.getMeshById("EVT.Credits");
        credits.actionManager = new BABYLON.ActionManager(scene);
        credits.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            main.camera.useAutoRotationBehavior = false;
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("CREDITS", "Design & Development: Midge Sinnaeve // 3D Artist: Adrian Wojda", false);
        }));
    });
  };