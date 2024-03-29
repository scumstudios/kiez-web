import * as main from "./main.js";

export default function sc000(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // document.getElementById("loadFrame").style.display = 'inline';
    document.getElementById("logoContainer").style.display = 'inline';
    document.getElementById("poweredContainer").style.display = 'inline';
    document.getElementById("homeButton").style.display = "none";

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

      // Scene Triggers
        let mesh = scene.getMeshById("EVT.Booths");
        main.hl.addMesh(mesh, BABYLON.Color3.Yellow());
        mesh.actionManager = new BABYLON.ActionManager(scene);
        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            main.loadScene(sc010);
        }));

    });

    // document.getElementById("loadFrame").style.display = 'none';
  };