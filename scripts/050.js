import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc050(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "050-post_election.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            main.setB(mesh);
        });

        container.addAllToScene();

        camAnim(0.5, 1, 3.5, "TGT.Start", 1.25);
        dialogPop("Na Het Stemmen", "Na Het Stemmen", false)

        // EVT: Steps
        let votes = scene.getMeshById("EVT.Votes");
        main.setW(votes);
        votes.actionManager = new BABYLON.ActionManager(scene);
        votes.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(1.9, 0.9, 5, "TGT.Votes", 0.75);
                dialogPop("Stemmen Tellen", "Stemmen Tellen", false);
                main.setY(votes);
                main.prtHighlight(votes);
        }));

        let formation = scene.getMeshById("EVT.Formation");
        main.setW(formation);
        formation.actionManager = new BABYLON.ActionManager(scene);
        formation.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(3.1, 0.9, 4.5, "TGT.Formation", 0.75);
                dialogPop("Formatie", "Formatie", false);
                main.setY(formation);
                main.prtHighlight(formation);
        }));

        let government = scene.getMeshById("EVT.Government");
        main.setW(government);
        government.actionManager = new BABYLON.ActionManager(scene);
        government.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(4.9, 0.9, 4, "TGT.Government", 0.75);
                dialogPop("Regering", "Regering Samenstellen", false);
                main.setY(government);
                main.prtHighlight(government);
        }));

        let versus = scene.getMeshById("EVT.Versus");
        main.setW(versus);
        versus.actionManager = new BABYLON.ActionManager(scene);
        versus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(6.475, 0.95, 3.5, "TGT.Versus", 0.75);
                dialogPop("Oppositie & Coalitie", "Oppositie & Coalitie", false);
                main.setY(versus);
                main.prtHighlight(versus);
        }));
        
    });

  };