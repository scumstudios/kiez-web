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
        for (let i = 0; i < container.animationGroups.length; i++) {
            container.animationGroups[i].start(true);
        }

        main.camera.lowerRadiusLimit = 1;
        main.camera.lowerBetaLimit = 0.5;
        main.camera.alpha = 5.5;
        camAnim(5.5, 0.65, 12.5, "TGT.Start", 1);
        
        // EVT: Europe
        let europe = scene.getMeshById("EVT.Europe");
        main.setW(europe);
        europe.actionManager = new BABYLON.ActionManager(scene);
        europe.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(6.282, 0.65, 8, "TGT.Europe", 0.75);
            dialogPop("Europees Parlement", "Op 9 juni stem je voor het Europees parlement. Hier wordt er beslist rond zaken als wetgeving, internationale overeenkomsten, controle en toezicht, etc. Hier mag je ook gaan stemmen vanaf je 16de!", false);
            main.setY(europe);
            main.prtHighlight(europe, 50);
        }));

        // EVT: Federal
        let federal = scene.getMeshById("EVT.Federal");
        main.setW(federal);
        federal.actionManager = new BABYLON.ActionManager(scene);
        federal.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(4.65, 0.65, 6, "TGT.Federal", 0.75);
            dialogPop("Federaal Parlement & De Kamer", "Op 9 juni stem je ook voor het Federaal Parlement en De kamer. Hier wordt er beslist rond zaken als buitenlandse zaken, defensie, migratie en asiel, etc.", false);
            main.setY(federal);
            main.prtHighlight(federal, 35, 0.011);
        }));

        // EVT: Flanders
        let flanders = scene.getMeshById("EVT.Flanders");
        main.setW(flanders);
        flanders.actionManager = new BABYLON.ActionManager(scene);
        flanders.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(Math.PI, 0.65, 4.5, "TGT.Flanders", 0.75);
            dialogPop("Het Vlaams of Brussels Parlement", "Op 9 juni stem je ook voor het Vlaams of Brussels Parlement. Hier wordt er beslist rond zaken als cultuur, onderwijs, mobiliteit, sport, etc.", false);
            main.setY(flanders);
            main.prtHighlight(flanders, 25, 0.0075);
        }));

        // EVT: Local
        let local = scene.getMeshById("EVT.Local");
        main.setW(local);
        local.actionManager = new BABYLON.ActionManager(scene);
        local.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(1.6, 0.65, 3, "TGT.Local", 0.75);
            dialogPop("Provincie- en gemeenteraadsverkiezingen", "Op 13 oktober stem je voor je provincie en gemeenteraad. Hier wordt er beslist rond zaken als jeugd, evenementen in jouw gemeente, onderhoud en aanleg van parken, OCMW, mobiliteit, etc. Hier mag je ook gaan stemmen vanaf je 16de!", false);
            main.setY(local);
            main.prtHighlight(local, 25, 0.0035);
        }));

        // EVT: Exclamation
        let exclamation = scene.getMeshById("EVT.Exclamation");
        main.setW(exclamation);
        exclamation.actionManager = new BABYLON.ActionManager(scene);
        exclamation.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
            camAnim(0.25, 0.65, 2.5, "TGT.Exclamation", 0.75);
            dialogPop("Moet je stemmen?", "Je bent verplicht om naar het stemhokje te gaan en iets in te vullen, maar het is aan jou of je ervoor kiest om een stem uit te brengen op een persoon of partij, of ervoor kiest om blanco te stemmen. Let op als je gaat stemmen! Je kan niet zomaar op iedereen stemmen, check zeker wie in jouw kieskring opkomt...", false);
            main.setY(exclamation);
            main.prtHighlight(exclamation, 25, 0.0035);
        }));


    });
};