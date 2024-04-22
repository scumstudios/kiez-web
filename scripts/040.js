import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc040(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    dialogPop("Kieskringen", "In 2024, zijn er 2 dagen dat we verwacht worden in het stemhokje. Op 9 juni en 13 oktober, maar op wat ga je dan stemmen?", false);

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "040-election_types.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            main.setB(mesh);
        });

        container.addAllToScene();

        main.camera.lowerRadiusLimit = 1;
    
        camAnim(Math.PI/2, 0.65, 7.5, "TGT.Start", 1);
        
        // EVT: Europe
        let europe = scene.getMeshById("EVT.Europe");
        main.setW(europe);
        europe.actionManager = new BABYLON.ActionManager(scene);
        europe.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(2.225, 0.65, 4, "TGT.Europe", 0.75);
            dialogPop("Europees Parlement", "Op 9 juni stem je voor het Europees parlement. Hier wordt er beslist rond zaken als wetgeving, internationale overeenkomsten, controle en toezicht, etc. Hier moet je ook gaan stemmen vanaf je 16de!", false);
            main.setY(europe);
        }));

        // EVT: Federal
        let federal = scene.getMeshById("EVT.Federal");
        main.setW(federal);
        federal.actionManager = new BABYLON.ActionManager(scene);
        federal.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(0.75, 0.65, 3, "TGT.Federal", 0.75);
            dialogPop("Federaal Parlement & De Kamer", "Op 9 juni stem je ook voor het Federaal Parlement en De kamer. Hier wordt er beslist rond zaken als buitenlandse zaken, defensie, migratie en asiel, etc.", false);
            main.setY(federal);
        }));

        // EVT: Flanders
        let flanders = scene.getMeshById("EVT.Flanders");
        main.setW(flanders);
        flanders.actionManager = new BABYLON.ActionManager(scene);
        flanders.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(5.55, 0.65, 2, "TGT.Flanders", 0.75);
            dialogPop("Het Vlaams Parlement", "Op 9 juni stem je ook voor het Vlaams en Brussels Parlement. Hier wordt er beslist rond zaken als cultuur, onderwijs, mobiliteit, sport, etc.", false);
            main.setY(flanders);
        }));

        // EVT: Local
        let local = scene.getMeshById("EVT.Local");
        main.setW(local);
        local.actionManager = new BABYLON.ActionManager(scene);
        local.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(3.9275, 0.65, 1, "TGT.Local", 0.75);
            dialogPop("Provincie- en gemeenteraadsverkiezingen:", "Op 13 oktober stem je voor je provincie en gemeenteraad. Hier wordt er beslist rond zaken als jeugd, evenementen in jouw gemeente, onderhoud en aanleg van parken, OCMW, mobiliteit, etc. Hier moet je ook gaan stemmen vanaf je 16de!", false);
            main.setY(local);
        }));


    });
};