import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc010(engine) {
    let scene = main.scene;
    let hlB = main.hlB;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "010-left_right.glb", scene, function(container) {
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
      
        // EVT: Open Up
        let openL = scene.getMeshById("GEO.Belgium.L");
        hlB.addMesh(openL, BABYLON.Color3.White());
        openL.actionManager = new BABYLON.ActionManager(scene);
        let openLAction = openL.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                main.camAnim(1, 0, 15, new BABYLON.Vector3(0, 0, 0), 0.75);
                for (let i = 0; i < container.animationGroups.length; i++) {
                        container.animationGroups[i].play();
                }
                hlB.removeMesh(scene.getMeshById("GEO.Belgium.L"));
                hlB.removeMesh(scene.getMeshById("GEO.Belgium.R"));
                openL.actionManager.unregisterAction(openLAction);
                openR.actionManager.unregisterAction(openRAction);
        }));
        
        let openR = scene.getMeshById("GEO.Belgium.R");
        hlB.addMesh(openR, BABYLON.Color3.White());
        openR.actionManager = new BABYLON.ActionManager(scene);
        let openRAction = openR.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                main.camAnim(1, 0, 15, new BABYLON.Vector3(0, 0, 0), 0.75);
                for (let i = 0; i < container.animationGroups.length; i++) {
                        container.animationGroups[i].play();
                }
                hlB.removeMesh(scene.getMeshById("GEO.Belgium.L"));
                hlB.removeMesh(scene.getMeshById("GEO.Belgium.R"));
                openL.actionManager.unregisterAction(openLAction);
                openR.actionManager.unregisterAction(openRAction);
        }));

        // EVT: Parties
        let pdva = scene.getMeshById("EVT.PVDA");
        hlB.addMesh(pdva, BABYLON.Color3.White());
        pdva.actionManager = new BABYLON.ActionManager(scene);
        pdva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(-0.95, 0.6, 0), 0.5);
                dialogPop("PVDA");
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(pdva);
        }));

        let groen = scene.getMeshById("EVT.Groen");
        hlB.addMesh(groen, BABYLON.Color3.White())
        groen.actionManager = new BABYLON.ActionManager(scene);
        groen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(-0.675, 0.6, 0), 0.5);
                dialogPop("Groen");
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(groen);
        }))

        let vooruit = scene.getMeshById("EVT.Vooruit");
        hlB.addMesh(vooruit, BABYLON.Color3.White())
        vooruit.actionManager = new BABYLON.ActionManager(scene);
        vooruit.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(-0.325, 0.6, 0), 0.5);
                dialogPop("Vooruit");
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(vooruit);
        }))

        let cdnv = scene.getMeshById("EVT.CDNV");
        hlB.addMesh(cdnv, BABYLON.Color3.White())
        cdnv.actionManager = new BABYLON.ActionManager(scene);
        cdnv.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(0, 0.6, 0), 0.5);
                dialogPop("CD&V");
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(cdnv);
        }))

        let vld = scene.getMeshById("EVT.VLD");
        hlB.addMesh(vld, BABYLON.Color3.White())
        vld.actionManager = new BABYLON.ActionManager(scene);
        vld.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(0.325, 0.6, 0), 0.5);;
                dialogPop("Open VLD");
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(vld);
        }))

        let nva = scene.getMeshById("EVT.NVA");
        hlB.addMesh(nva, BABYLON.Color3.White())
        nva.actionManager = new BABYLON.ActionManager(scene);
        nva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(0.675, 0.6, 0), 0.5);
                dialogPop("NVA");
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(nva);
        }))

        let vlb = scene.getMeshById("EVT.VLB");
        hlB.addMesh(vlb, BABYLON.Color3.White())
        vlb.actionManager = new BABYLON.ActionManager(scene);
        vlb.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(0.95, 0.6, 0), 0.5);
                dialogPop("Vlaams Belang");
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(vlb);
        }))

    });
  };