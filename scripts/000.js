import * as main from "./main.js";

export default function sc000(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // 

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
        

        // Scene Triggers
        let evt_info = scene.getMeshById("EVT.Info");
        main.hl.addMesh(evt_info, BABYLON.Color3.White());
        evt_info.actionManager = new BABYLON.ActionManager(scene);
        evt_info.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Welkom bij Kiez! Wij helpen je geinformeerd stemmen. Kies het topic waar je meer over wil weten.");
            document.getElementById("dialogButton").style.display = 'none';
        }));


        let evt_lr = scene.getMeshById("EVT.Compass");
        main.hl.addMesh(evt_lr, BABYLON.Color3.Yellow());
        evt_lr.actionManager = new BABYLON.ActionManager(scene);
        evt_lr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Navigeer je door het politieke landschap, wat is links en rechts nu eigenlijk?", true, "./scn/010.html");
        }));

        let evt_lr2 = scene.getMeshById("EVT.Compass.Needle");
        main.hl.addMesh(evt_lr2, BABYLON.Color3.Yellow());
        evt_lr2.actionManager = new BABYLON.ActionManager(scene);
        evt_lr2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            document.getElementById("logoContainer").style.display = 'none';
            main.dialogPop("Navigeer je door het politieke landschap, wat is links en rechts nu eigenlijk?", true, "./scn/010.html");
        }));

        
    });
  };