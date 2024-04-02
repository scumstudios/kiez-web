import * as main from "./main.js";

export default function sc000(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;


    
    // LOAD ASSETS
    BABYLON.SceneLoader.LoadAssetContainer("assets/", "000-start.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
            mesh.outlineWidth = 0.01;
        });

        container.addAllToScene();
        scene.stopAllAnimations();
  
        main.camAnim(new BABYLON.Vector3(0, 1, 6), new BABYLON.Vector3(0, 0.6, 0), 0.75);

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


        main.hl.addMesh(evt_info, BABYLON.Color3.White());
        evt_info.actionManager = new BABYLON.ActionManager(scene);
        let evtPop = evt_info.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Welkom bij Kiez! Wij helpen je geinformeerd stemmen. Kies het topic waar je meer over wil weten.");
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

            main.camAnim(new BABYLON.Vector3(0, Math.PI /4, 15), new BABYLON.Vector3(0, 0, 0), 1.5);
            playAnimations();

            main.hl.removeMesh(evt_info, BABYLON.Color3.White());
            evt_info.actionManager.unregisterAction(evtPop);
        }));


        // L&R - SC010
        let evt_lr = scene.getMeshById("EVT.Compass");
        main.hl.addMesh(evt_lr, BABYLON.Color3.Yellow());
        evt_lr.actionManager = new BABYLON.ActionManager(scene);
        evt_lr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Navigeer je door het politieke landschap, wat is links en rechts nu eigenlijk?", true, "../scn/010.html");
        }));


        // IMPORTANCE OF POLITICS - SC020
        let evt_importance = scene.getMeshById("EVT.Parliament");
        main.hl.addMesh(evt_importance, BABYLON.Color3.Yellow());
        evt_importance.actionManager = new BABYLON.ActionManager(scene);
        evt_importance.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Waarom is stemmen zo belangrijk en hoe beinvloed het onze samenleving?", true, "../scn/020.html");
        }));


        // PRACTICAL VOTING - SC030
        let evt_howto = scene.getMeshById("EVT.Booth");
        main.hl.addMesh(evt_howto, BABYLON.Color3.Yellow());
        evt_howto.actionManager = new BABYLON.ActionManager(scene);
        evt_howto.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Hoe ziet het stemproces er praktisch uit?", true, "../scn/030.html");
        }));


        // ELECTION TYPES - SC040
        let evt_type = scene.getMeshById("EVT.Elections");
        main.hl.addMesh(evt_type, BABYLON.Color3.Yellow());
        evt_type.actionManager = new BABYLON.ActionManager(scene);
        evt_type.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Lokaal, Federaal, Europees... Wanneer stem je op wat en hoe zit dat allemaal in elkaar?", true, "../scn/040.html");
        }));


        // POST-ELECTION - SC050
        let evt_post = scene.getMeshById("EVT.Finish");
        main.hl.addMesh(evt_post, BABYLON.Color3.Yellow());
        evt_post.actionManager = new BABYLON.ActionManager(scene);
        evt_post.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Iedereen heeft gestemd, wat gebeurt er nu?", true, "../scn/050.html");
        }));
    });
  };