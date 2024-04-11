import * as main from "./main.js";

export default function sc000(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;
    let hlB = main.hlB;
    let hlS = main.hlS;


    
    // LOAD ASSETS
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
        scene.stopAllAnimations();
        
        console.log(main.camera.alpha)
        main.camAnim(1.57, 1.3, 6, "TGT.Info", 0.75);
        console.log(main.camera.alpha)

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


        hlB.addMesh(evt_info, BABYLON.Color3.White());
        evt_info.actionManager = new BABYLON.ActionManager(scene);
        let evtPop = evt_info.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Kiez.nu", "Welkom bij Kiez! Wij helpen je geinformeerd stemmen door je in te lichten over hoe de Belgische politiek werkt. Kies het topic waar je meer over wil weten.");
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

            hlB.removeMesh(evt_info);
            evt_info.actionManager.unregisterAction(evtPop);
        }));


        // L&R - SC010
        let evt_lr = scene.getMeshById("EVT.Compass");
        hlB.addMesh(evt_lr, BABYLON.Color3.White());
        evt_lr.actionManager = new BABYLON.ActionManager(scene);
        evt_lr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Belgishe Partijen", "Navigeer je door het politieke landschap, wat is links en rechts nu eigenlijk?", true, "../scn/010.html");
            hlB.removeMesh(evt_lr);
            hlS.addMesh(evt_lr, BABYLON.Color3.Yellow());
        }));


        // IMPORTANCE OF POLITICS - SC020
        let evt_importance = scene.getMeshById("EVT.Parliament");
        hlB.addMesh(evt_importance, BABYLON.Color3.White());
        evt_importance.actionManager = new BABYLON.ActionManager(scene);
        evt_importance.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Stemmen & Samenleving", "Waarom is stemmen zo belangrijk en hoe beinvloed het onze samenleving?", true, "../scn/020.html");
            hlB.removeMesh(evt_importance);
            hlS.addMesh(evt_importance, BABYLON.Color3.Yellow());
        }));


        // PRACTICAL VOTING - SC030
        let evt_howto = scene.getMeshById("EVT.Booth");
        hlB.addMesh(evt_howto, BABYLON.Color3.White());
        evt_howto.actionManager = new BABYLON.ActionManager(scene);
        evt_howto.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Stemmen, Praktisch", "Hoe ziet het stemproces er praktisch uit?", true, "../scn/030.html");
            hlB.removeMesh(evt_howto);
            hlS.addMesh(evt_howto, BABYLON.Color3.Yellow());
        }));


        // ELECTION TYPES - SC040
        let evt_type = scene.getMeshById("EVT.Elections");
        hlB.addMesh(evt_type, BABYLON.Color3.White());
        evt_type.actionManager = new BABYLON.ActionManager(scene);
        evt_type.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Kieskringen", "Lokaal, Federaal, Europees... Wanneer stem je op wat en hoe zit dat allemaal in elkaar?", true, "../scn/040.html");
            hlB.removeMesh(evt_type);
            hlS.addMesh(evt_type, BABYLON.Color3.Yellow());
        }));


        // POST-ELECTION - SC050
        let evt_post = scene.getMeshById("EVT.Finish");
        hlB.addMesh(evt_post, BABYLON.Color3.White());
        evt_post.actionManager = new BABYLON.ActionManager(scene);
        evt_post.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Na het stemmen", "Iedereen heeft gestemd, wat gebeurt er nu?", true, "../scn/050.html");
            hlB.removeMesh(evt_post);
            hlS.addMesh(evt_post, BABYLON.Color3.Yellow());
        }));
    });
  };