import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc020(engine) {
    let scene = main.scene;
    let hl = main.hl;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "020-politics.glb", scene, function(container) {
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
      hl.addMesh(openL, BABYLON.Color3.Yellow());
      openL.actionManager = new BABYLON.ActionManager(scene);
      let openLAction = openL.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              main.camAnim(new BABYLON.Vector3(1, 0, 15), new BABYLON.Vector3(0, 0, 0), 0.75);
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
              main.camAnim(new BABYLON.Vector3(1, 0, 15), new BABYLON.Vector3(0, 0, 0), 0.75);
              for (let i = 0; i < container.animationGroups.length; i++) {
                  container.animationGroups[i].play();
              }
              hl.removeMesh(scene.getMeshById("GEO.Belgium.L"));
              hl.removeMesh(scene.getMeshById("GEO.Belgium.R"));
              openL.actionManager.unregisterAction(openLAction);
              openR.actionManager.unregisterAction(openRAction);
      }));

      // EVT: Parties
      let pdva = scene.getMeshById("EVT.PVDA");
      hl.addMesh(pdva, BABYLON.Color3.Yellow());
      pdva.actionManager = new BABYLON.ActionManager(scene);
      pdva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.8, 0.75, 0.15), 0.5);
              dialogPop("PVDA");
              document.getElementById("dialogButton").style.display = 'none';
              hl.removeMesh(pdva);
      }));

      let groen = scene.getMeshById("EVT.Groen");
      hl.addMesh(groen, BABYLON.Color3.Yellow())
      groen.actionManager = new BABYLON.ActionManager(scene);
      groen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.55, 0.75, 0.15), 0.5);
              dialogPop("Groen");
              document.getElementById("dialogButton").style.display = 'none';
              hl.removeMesh(groen);
      }))

      let vooruit = scene.getMeshById("EVT.Vooruit");
      hl.addMesh(vooruit, BABYLON.Color3.Yellow())
      vooruit.actionManager = new BABYLON.ActionManager(scene);
      vooruit.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.275, 0.75, 0.15), 0.5);
              dialogPop("Vooruit");
              document.getElementById("dialogButton").style.display = 'none';
              hl.removeMesh(vooruit);
      }))

      let cdnv = scene.getMeshById("EVT.CDNV");
      hl.addMesh(cdnv, BABYLON.Color3.Yellow())
      cdnv.actionManager = new BABYLON.ActionManager(scene);
      cdnv.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0, 0.75, 0.15), 0.5);
              dialogPop("CD&V");
              document.getElementById("dialogButton").style.display = 'none';
              hl.removeMesh(cdnv);
      }))

      let vld = scene.getMeshById("EVT.VLD");
      hl.addMesh(vld, BABYLON.Color3.Yellow())
      vld.actionManager = new BABYLON.ActionManager(scene);
      vld.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.275, 0.75, 0.15), 0.5);
              dialogPop("Open VLD");
              document.getElementById("dialogButton").style.display = 'none';
              hl.removeMesh(vld);
      }))

      let nva = scene.getMeshById("EVT.NVA");
      hl.addMesh(nva, BABYLON.Color3.Yellow())
      nva.actionManager = new BABYLON.ActionManager(scene);
      nva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.55, 0.75, 0.15), 0.5);
              dialogPop("NVA");
              document.getElementById("dialogButton").style.display = 'none';
              hl.removeMesh(nva);
      }))

      let vlb = scene.getMeshById("EVT.VLB");
      hl.addMesh(vlb, BABYLON.Color3.Yellow())
      vlb.actionManager = new BABYLON.ActionManager(scene);
      vlb.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
              camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.8, 0.75, 0.15), 0.5);
              dialogPop("Vlaams Belang");
              document.getElementById("dialogButton").style.display = 'none';
              hl.removeMesh(vlb);
      }))

    });
  };