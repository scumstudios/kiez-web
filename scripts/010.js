import * as main from "./main.js";
import * as base from "./base.js";

import sc000 from "./000.js";
// import * from "./020.js";
// import * from "./030.js";
// import * from "./040.js";
// import * from "./050.js";

// scene.js
export default function sc010(engine) {
    let scene = main.scene;
    let hl = main.hl;
    let sg = main.sg;
    let vcolmat = main.vcolmat;
    // let camAnim = main.camAnim(); // TODO Camera Reference Error

    document.getElementById("logoContainer").style.display = 'none';
    document.getElementById("poweredContainer").style.display = 'none';
    
    let home = document.getElementById("homeButton");
    home.style.display = "inline";
    home.addEventListener('click', event => {main.loadScene(sc000);});

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("assets/", "010-links_rechts.glb", scene, function(container) {
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
      
      // Scene Triggers
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

    });

    return scene;

  };