import * as main from "./main.js";
import { camAnim } from "./main.js";
import { dialogPop } from "./main.js";

export default function sc030(engine) {
    let scene = main.scene;
    let sg = main.sg;
    let vcolmat = main.vcolmat;

    // Import GLB
    BABYLON.SceneLoader.LoadAssetContainer("../assets/", "030-how_to_vote.glb", scene, function (container) {
        container.meshes.forEach(mesh => {
            mesh.material = vcolmat;
            mesh.receiveShadows = true;
            sg.addShadowCaster(mesh, true);
            mesh.renderOutline = true;
            main.setB(mesh);
        });

        container.addAllToScene();
        scene.stopAllAnimations();

        const mailbox = scene.getMeshById("EVT.Mailbox.Lid");
        scene.getAnimationGroupByName("ANIM.Mailbox.IN").start(false);
        scene.getAnimationGroupByName("ANIM.Mailbox.Flag").start(false);
        main.prtHighlight(mailbox)
        main.setW(mailbox);
        camAnim(0.575, 1.3, 7.5, "TGT.Mailbox", 0.75);

        dialogPop("Stemmen", "Jaja, gaan stemmen. Allemaal goed en wel, maar hoe moet dat nu? Klik hier door elke stap van hoe je nu zoiets doet.", false);

        mailbox.actionManager = new BABYLON.ActionManager(scene);
        let mailboxAction = mailbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                
                // OPEN MAILBOX & MAIL ACTION
                const mail = scene.getMeshByID("EVT.Mail");
                main.setY(mail);
                main.prtSel.stop();

                scene.getAnimationGroupByName("ANIM.Mailbox.Lid").start(false);
                scene.getAnimationGroupByName("ANIM.Mail.Show").start(false);
                scene.getAnimationGroupByName("ANIM.Mail.Show").onAnimationEndObservable.add(() => {
                    main.prtHighlight(mail);
                    scene.getAnimationGroupByName("ANIM.Mail.LOOP").start(true);
                    dialogPop("Stembrief", "Je ontvangt ten laatste 15 dagen voor de verkiezingen (via de post) een oproepingsbrief met daarin waar en wanneer je zal gaan stemmen.", false);
                });
                
                camAnim(0, 1.3, 6, "TGT.Mail", 0.75);
                main.setB(mailbox);

                mailbox.actionManager.unregisterAction(mailboxAction);


                mail.actionManager = new BABYLON.ActionManager(scene);
                mail.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {

                    //MAILBOX ACTION & SET ID
                    const id = scene.getMeshByID("EVT.ID");
                    main.setY(id);
                    main.prtSel.stop();
                    camAnim(Math.PI/2, 1, 9.5, "TGT.Zero", 0.75);

                    scene.getAnimationGroupByName("ANIM.Mailbox.OUT").start(false);
                    scene.getAnimationGroupByName("ANIM.Desk.IN").start(false);
                    scene.getAnimationGroupByName("ANIM.ID.IN").start(false);
                    scene.getAnimationGroupByName("ANIM.ID.IN").onAnimationEndObservable.add(() => {
                        main.prtHighlight(id);
                        dialogPop("Gaan Stemmen", "Neem zeker je identiteitskaart en je oproepingsbrief mee naar het stembureau en geef hem af aan een medewerker. Je ontvangt dan je stemkaart.", false);
                });    
                
                id.actionManager = new BABYLON.ActionManager(scene);
                let idAction = id.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    
                    // ID ACTION & SET VOTE TYPES
                    dialogPop("Stemmen op Papier", "In West- en Oost-Vlaamse gemeenten wordt er vaak nog op papier gestemd. Ook in Wallonië zal je op papier moeten stemmen.", false);

                    main.prtSel.stop();

                    const paper = scene.getMeshByID("EVT.Vote.Paper");
                    const electronic = scene.getMeshByID("EVT.Vote.Electronic");
                    const list = scene.getMeshByID("EVT.List");
                    const ticketbox = scene.getMeshByName("GEO.Ticketboxes");

                    main.setY(paper);
                    main.setB(electronic);

                    scene.getAnimationGroupByName("ANIM.Electronic.IN").start(false);
                    scene.getAnimationGroupByName("ANIM.Desk.OUT").start(false);
                    scene.getAnimationGroupByName("ANIM.Booths.IN").start(false);
                    scene.getAnimationGroupByName("ANIM.ID.Register").start(false);
                    scene.getAnimationGroupByName("ANIM.Paper.IN").start(false);
                    scene.getAnimationGroupByName("ANIM.Paper.IN").onAnimationEndObservable.add(() => {
                        main.prtHighlight(paper);
                    });
                    
                    id.actionManager.unregisterAction(idAction);

                    paper.actionManager = new BABYLON.ActionManager(scene);
                    let paperAction = paper.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {

                        dialogPop("Elektronisch Stemmen", "In 157 gemeenten wordt er elektronisch gestemd. Als je in Antwerpen woont, zal je hoogtswaarschijnlijk elektronisch stemmen.", false);

                        main.setB(paper);
                        main.setY(electronic);
                        main.prtHighlight(electronic);
                        scene.getAnimationGroupByName("ANIM.Paper.OUT").start(false);

                        paper.actionManager.unregisterAction(paperAction);

                        electronic.actionManager = new BABYLON.ActionManager(scene);
                        let electronicAction = electronic.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {

                            dialogPop("De Kieslijst", "Dan krijg je een kieslijst, deze krijg je dan oftewel op het scherm voor je. Of je krijgt hem op papier. Hierop staan alle kandidaten van partijen waarop jij kan stemmen. ", false);

                            main.prtSel.stop();
                            main.setB(electronic);
                            main.setY(list);

                            scene.getAnimationGroupByName("ANIM.Electronic.OUT").start(false);
                            scene.getAnimationGroupByName("ANIM.Electronic.OUT").onAnimationEndObservable.add(() => {
                                main.setB(paper);
                                scene.getAnimationGroupByName("ANIM.List.IN").start(false);
                                scene.getAnimationGroupByName("ANIM.List.IN").onAnimationEndObservable.add(() => {
                                    main.prtHighlight(list);
                                });    
                            });
                            

                            paper.actionManager.unregisterAction(electronicAction);

                            list.actionManager = new BABYLON.ActionManager(scene);
                            let listAction = list.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {

                                dialogPop("Stem Rigistreren", "Wanneer je een keuze hebt aangeduid op je stembiljet, moet die natuurlijk nog geregistreerd worden. Dat kan enerzijds gebeuren door je stembiljet op te vouwen en hem in de stembus te steken. Als je elektronisch stemt, zal je een code moeten scannen om jouw stem effectief te registreren.", false);

                                main.prtSel.stop();
                                main.setB(list);
                                paper.scaling = new BABYLON.Vector3.Zero();
                                electronic.scaling = new BABYLON.Vector3.Zero();

                                scene.getAnimationGroupByName("ANIM.Booths.OUT").start(false);
                                scene.getAnimationGroupByName("ANIM.List.OUT").start(false);
                                scene.getAnimationGroupByName("ANIM.List.OUT").onAnimationEndObservable.add(() => {
                                    
                                    camAnim(Math.PI/2, 1, 10, "TGT.Finish", 0.75);
                                    main.setW(ticketbox);
                                    scene.getAnimationGroupByName("ANIM.Ticketboxes.IN").start(false);
                                    scene.getAnimationGroupByName("ANIM.Ticketboxes.IN").onAnimationEndObservable.add(() => {

                                        scene.getAnimationGroupByName("ANIM.Ticket.IN").start(false);
                                        scene.getAnimationGroupByName("ANIM.Ticket.IN").onAnimationEndObservable.add(() => {
                                            scene.getAnimationGroupByName("ANIM.Ticket.LOOP").start(true);
                                        });

                                        scene.getAnimationGroupByName("ANIM.QR.IN").start(false);
                                        scene.getAnimationGroupByName("ANIM.QR.IN").onAnimationEndObservable.add(() => {
                                            scene.getAnimationGroupByName("ANIM.QR.LOOP").start(true);
                                            main.prtHighlight(ticketbox);
                                            
                                        });

                                        ticketbox.actionManager = new BABYLON.ActionManager(scene);
                                        let ticketboxesAction = ticketbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {

                                            camAnim(Math.PI/2, 1, 9.5, "TGT.Zero", 0.75);
                                            dialogPop("Klaar met Stemmen", "Nadien krijg je jouw identiteitskaart en afgestempelde oproepingsbrief terug.", false);

                                            main.prtSel.stop();
                                            scene.getAnimationGroupByName("ANIM.Ticket.OUT").start(false);
                                            scene.getAnimationGroupByName("ANIM.QR.OUT").start(false);

                                            scene.getAnimationGroupByName("ANIM.Ticketboxes.OUT").start(false);
                                            scene.getAnimationGroupByName("ANIM.Ticketboxes.OUT").onAnimationEndObservable.add(() => {
                                                scene.getAnimationGroupByName("ANIM.Desk.IN").start(false);
                                                scene.getAnimationGroupByName("ANIM.Desk.IN").onAnimationEndObservable.add(() => {
                                                    main.setB(id);
                                                    scene.getAnimationGroupByName("ANIM.ID.OUT").start(false);
                                                });     
                                            });
                                        }));
                                    });                                    
                                });
                            }));
                        }));
                    }));
                }));
            }));
        }));
    });
};