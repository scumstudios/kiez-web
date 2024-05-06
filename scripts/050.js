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
        for (let i = 0; i < container.animationGroups.length; i++) {
            container.animationGroups[i].start(true);
        }

        camAnim(0.5, 1, 3.5, "TGT.Start", 1.25);
        dialogPop("Na Het Stemmen", "Na het stemmen heb jij jouw bijdrage geleverd. Vanaf nu is het aan de medewerkers en de machines om aan hun werk te beginnen. Langzaam maar zeker komen de resultaten binnen. Dit is een spannende dag voor alle betrokken partijen.", false)

        // EVT: Steps
        let votes = scene.getMeshById("EVT.Votes");
        main.setW(votes);
        votes.actionManager = new BABYLON.ActionManager(scene);
        votes.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(1.9, 0.9, 5, "TGT.Votes", 0.75);
                dialogPop("Stemmen Tellen", "Het tellen van de stemmen gebeurt dankzij moderne technologie steeds sneller. Doorheen de dag kan je volgen hoe mondjesmaat de uitslagen van verschillende gemeenten bekendgemaakt worden. 's avonds zijn dan alle stemmen geteld en we moeten al meteen hoeveel zetels partijen gewonnen hebben en wie de meeste voorkeurstemmen gehaald heeft. Maar dat wil zeggen dat het harde werk nog maar net begonnen is.", false);
                main.setY(votes);
                main.prtHighlight(votes);
        }));

        let formation = scene.getMeshById("EVT.Formation");
        main.setW(formation);
        formation.actionManager = new BABYLON.ActionManager(scene);
        formation.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(3.1, 0.9, 4.5, "TGT.Formation", 0.75);
                dialogPop("Formatie", "De koning ontvangt in de daaropvolgende dagen belangrijke personen zoals de voorzitters van de Kamer en de Senaat, evenals voorzitters van belangrijke partijen en experts. Daarna wijst de koning een informateur aan. De informateur zal met alle partijen en verkozenen gaan praten om te luisteren naar hoe zij de regeringsvorm zien en met wie zij willen samenwerken en welke coalities zij voor ogen hebben. Als die verkenningsronde achter de rug is, stelt de koning een formateur aan. Die moet de daadwerkelijke regering vormen op basis van de partijprogramma's. Als hij hierin slaagt, zal hij naar alle warschijnlijkheid de functie van premier bekleden. Ook zal hij het nieuwe regeerakkoord opstellen.", false);
                main.setY(formation);
                main.prtHighlight(formation);
        }));

        let government = scene.getMeshById("EVT.Government");
        main.setW(government);
        government.actionManager = new BABYLON.ActionManager(scene);
        government.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(4.9, 0.9, 4, "TGT.Government", 0.75);
                dialogPop("Regering", "De formateur zal de nieuwe regering voorstellen aan de koning. Als hij die goedkeurt, moeten alle ministers de eed afleggen. De nieuwe regering zal een verklaring opstellen, die wordt verkondigd door de eerste minister in de Kamer. Als zij het vertrouwen krijgen, kan de regering aan de slag voor 5 jaar.", false);
                main.setY(government);
                main.prtHighlight(government);
        }));

        let versus = scene.getMeshById("EVT.Versus");
        main.setW(versus);
        versus.actionManager = new BABYLON.ActionManager(scene);
        versus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (pvda) {
                camAnim(6.475, 0.95, 3.5, "TGT.Versus", 0.75);
                dialogPop("Oppositie & Coalitie", "De partijen die in de regering terechtkomen behoren tot de coalitie; zij vormen samen een meerderheid. Omdat zij de meerderheid vormen, hebben zij de doorslag bij het nemen van beslissingen. De oppositie bestaat uit alle partijen die niet in de regering zijn opgenomen, dus zij vormen de minderheid. Hun taak is kritisch te zijn tegenover de coalitie.", false);
                main.setY(versus);
                main.prtHighlight(versus);
        }));
        
    });

  };