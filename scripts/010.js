import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc010(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "010-left_right.glb", scene, function(container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            main.setB(mesh);
        });

        container.addAllToScene();
        scene.stopAllAnimations();

        scene.getAnimationGroupByName("ANIM.Cloud.000").start(true);
        scene.getAnimationGroupByName("ANIM.Cloud.001").start(true);
        scene.getAnimationGroupByName("ANIM.Cloud.002").start(true);
        scene.getAnimationGroupByName("ANIM.Cloud.003").start(true);
        scene.getAnimationGroupByName("ANIM.Shark").start(true);

        function openWide() {
                scene.getAnimationGroupByName("ANIM.Boat").start(true);
                scene.getAnimationGroupByName("GEO.Belgium.L").start(false);
                scene.getAnimationGroupByName("GEO.Belgium.R").start(false);
                scene.getAnimationGroupByName("GEO.Bridge").start(false);
                scene.getAnimationGroupByName("ANIM.CDNV").start(false);
                scene.getAnimationGroupByName("ANIM.Groen").start(false);
                scene.getAnimationGroupByName("ANIM.NVA").start(false);
                scene.getAnimationGroupByName("ANIM.PVDA").start(false);
                scene.getAnimationGroupByName("ANIM.VLB").start(false);
                scene.getAnimationGroupByName("ANIM.VLD").start(false);
                scene.getAnimationGroupByName("ANIM.Vooruit").start(false);
                scene.getAnimationGroupByName("EVT.CDNV").start(false);
                scene.getAnimationGroupByName("EVT.Groen").start(false);
                scene.getAnimationGroupByName("EVT.NVA").start(false);
                scene.getAnimationGroupByName("EVT.PVDA").start(false);
                scene.getAnimationGroupByName("EVT.VLB").start(false);
                scene.getAnimationGroupByName("EVT.VLD").start(false);
                scene.getAnimationGroupByName("EVT.Vooruit").start(false);
                scene.getAnimationGroupByName("GEO.Flag.CDNV").start(false);
                scene.getAnimationGroupByName("GEO.Flag.Groen").start(false);
                scene.getAnimationGroupByName("GEO.Flag.NVA").start(false);
                scene.getAnimationGroupByName("GEO.Flag.PVDA").start(false);
                scene.getAnimationGroupByName("GEO.Flag.VLB").start(false);
                scene.getAnimationGroupByName("GEO.Flag.VLD").start(false);
                scene.getAnimationGroupByName("GEO.Flag.Vooruit").start(false);
        }
      
        // EVT: Open Up
        let openL = scene.getMeshById("GEO.Belgium.L");
        main.setW(openL);
        openL.actionManager = new BABYLON.ActionManager(scene);
        let openLAction = openL.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                main.camAnim(1, 0, 10, "TGT.Zero", 0.75);
                openWide();
                openL.actionManager.unregisterAction(openLAction);
                openR.actionManager.unregisterAction(openRAction);
                main.setB(openL);
                main.setB(openR);
        }));
        
        let openR = scene.getMeshById("GEO.Belgium.R");
        main.setW(openR);
        openR.actionManager = new BABYLON.ActionManager(scene);
        let openRAction = openR.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                main.camAnim(1, 0, 10, "TGT.Zero", 0.75);
                openWide();
                openL.actionManager.unregisterAction(openLAction);
                openR.actionManager.unregisterAction(openRAction);
                main.setB(openL);
                main.setB(openR);
        }));

        // EVT: Parties
        const pvda = scene.getMeshById("EVT.PVDA");
        main.setW(pvda);
        pvda.actionManager = new BABYLON.ActionManager(scene);
        pvda.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, "TGT.PVDA", 0.5);
                dialogPop("PVDA", "Marxistisch: “We willen een maatschappij waar rijkdom eerlijk verdeeld is en waar niet alles draait om geld. Openbaar vervoer moet gratis worden,  inschrijvingsgeld voor hogescholen moet goedkoper en het minimumloon moet opgetrokken worden naar 17 euro per uur.”", false);
                main.setB(pvda);
                main.prtHighlight(pvda);
        }));

        const groen = scene.getMeshById("EVT.Groen");
        main.setW(groen);
        groen.actionManager = new BABYLON.ActionManager(scene);
        groen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, "TGT.Groen", 0.5);
                dialogPop("Groen", "Progressief, pacifistisch en ecologisch: “De klimaatcrisis aanpakken is voor ons essentieel, maar ook de gelijkheid in de samenleving en de gezondheid van iedere burger. Geneesmiddelen moeten goedkoper worden, mobiliteit is een basisrecht en mentale gezondheid moet meer aandacht krijgen.”", false);
                main.setB(groen);
                main.prtHighlight(groen);
        }));

        const vooruit = scene.getMeshById("EVT.Vooruit");
        main.setW(vooruit);
        vooruit.actionManager = new BABYLON.ActionManager(scene);
        vooruit.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, "TGT.Vooruit", 0.5);
                dialogPop("Vooruit", "Sociaaldemocratisch: “We moeten zorgen voor een sterke welvaartsstaat. Mentaal welzijn bij jongeren moet een echte prioriteit zijn, iedereen moet zichzelf kunnen zijn en een dier is meer dan een stuk vlees.”", false);
                main.setB(vooruit);
                main.prtHighlight(vooruit);
        }));

        const cdnv = scene.getMeshById("EVT.CDNV");
        main.setW(cdnv);
        cdnv.actionManager = new BABYLON.ActionManager(scene);
        cdnv.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, "TGT.CDNV", 0.5);
                dialogPop("CD&V", "Christendemocratie: “We zijn een centrumpartij die probeert om niemand te vergeten. We hebben terug nood aan een samenleving die hecht wordt. Alle leerlingen verdienen dezelfde kansen, anticonceptie moet gratis worden en jongeren met psychische problemen moeten beter geholpen worden.”", false);
                main.setB(cdnv);
                main.prtHighlight(cdnv);
        }));

        const vld = scene.getMeshById("EVT.VLD");
        main.setW(vld);
        vld.actionManager = new BABYLON.ActionManager(scene);
        vld.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5,"TGT.VLD", 0.5);;
                dialogPop("Open VLD", "Liberalisme: “Onze partij is gebouwd op vrijheid en verantwoordelijkheid. Elke mens moet zichzelf kunnen zijn en de vrijheid hebben om vooruit te kunnen gaan. Oude tradities kunnen veranderen zoals bijvoorbeeld stemrecht vanaf 16 jaar.”", false);
                main.setB(vld);
                main.prtHighlight(vld);
        }));

        const nva = scene.getMeshById("EVT.NVA");
        main.setW(nva);
        nva.actionManager = new BABYLON.ActionManager(scene);
        nva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5,"TGT.NVA", 0.5);
                dialogPop("NVA", "Vlaams-nationalistisch en liberaal-conservatief: “Vlaanderen en Wallonië moeten meer onafhankelijk worden, migranten moeten Vlaamse normen en waarden leren en de belastingen moeten verlaagd worden om de economie te bevorderen.”", false);
                main.setB(nva);
                main.prtHighlight(nva);
        }));

        const vlb = scene.getMeshById("EVT.VLB");
        main.setW(vlb);
        vlb.actionManager = new BABYLON.ActionManager(scene);
        vlb.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                camAnim(Math.PI/2, 0.65, 5, "TGT.VLB", 0.5);
                dialogPop("Vlaams Belang", "Vlaams-nationalistisch en rechts-conservatief: “Wij willen dat Vlaanderen onafhankelijk wordt en veilig wordt door de massamigratie aan te pakken en een nultolerantiebeleid tegen criminelen. Onderwijs moet beter aansluiten bij de arbeidsmarkt en Vlaams geld moet in Vlaanderen blijven.”", false);
                main.setB(vlb);
                main.prtHighlight(vlb);
        }));

    });
  };