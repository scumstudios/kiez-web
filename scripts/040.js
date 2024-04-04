import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc040(engine) {
    let scene = main.scene;
    let hlB = main.hlB;
    let hlS = main.hlS;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "040-election_types.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
            mesh.outlineWidth = 0.005;
        });

    container.addAllToScene();
    
    camAnim(Math.PI/2, 0.65, 15, new BABYLON.Vector3(0, 0, 0.5), 0.5);
    
    // EVT: Europe
    let europe = scene.getMeshById("EVT.Europe");
    hlB.addMesh(europe, BABYLON.Color3.White());
    europe.actionManager = new BABYLON.ActionManager(scene);
    europe.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(0, 0, 1), 0.5);
            dialogPop("Europese verkiezingen");
            document.getElementById("dialogButton").style.display = 'none';
            hlB.removeMesh(europe);
            hlS.addMesh(europe, BABYLON.Color3.Yellow());
    }));

    });
  };