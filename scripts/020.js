import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc020(engine) {
    let scene = main.scene;
    let hlB = main.hlB;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "020-politics_influence.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
            mesh.outlineWidth = 0.005;
        });

    container.addAllToScene();

    let employment = scene.getMeshById("EVT.Employment");
    hlB.addMesh(employment, BABYLON.Color3.White());
    employment.actionManager = new BABYLON.ActionManager(scene);
        employment.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(Math.PI/2, 0.65, 5, new BABYLON.Vector3(-0.95, 0.6, 0), 0.5);
                dialogPop("Werkgelegenhied", "Werkgelegenheid", false);
                document.getElementById("dialogButton").style.display = 'none';
                hlB.removeMesh(employment);
                hlS.addMesh(employment, BABYLON.Color3.Yellow());
        }));

    let justice = scene.getMeshById("EVT.Justice");
    hlB.addMesh(justice, BABYLON.Color3.White());

    let education = scene.getMeshById("EVT.Education");
    hlB.addMesh(education, BABYLON.Color3.White());

    let care = scene.getMeshById("EVT.Care");
    hlB.addMesh(care, BABYLON.Color3.White());

    let env = scene.getMeshById("EVT.Environment");
    hlB.addMesh(env, BABYLON.Color3.White());
   
    });
  };