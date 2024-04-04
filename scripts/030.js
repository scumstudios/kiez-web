import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc030(engine) {
    let scene = main.scene;
    let hlB = main.hlB;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "030-how_to_vote.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
            mesh.outlineWidth = 0.005;
        });

    container.addAllToScene();

    });
  };