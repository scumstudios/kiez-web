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

        dialogPop("SCENE START", "Lorem Ipsum", false);

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
                    dialogPop("You've got mail!", "Brief in de bus", false);
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
                        dialogPop("Counter", "Stembrief en eID afgeven", false);
                });    
                
                id.actionManager = new BABYLON.ActionManager(scene);
                let idAction = id.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    
                    // ID ACTION & SET VOTE TYPES
                    dialogPop("PAPIER", "Stemmen op papier", false);

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

                        dialogPop("ELECTRONISCH", "Electronisch stemmen", false);

                        main.setB(paper);
                        main.setY(electronic);
                        main.prtHighlight(electronic);
                        scene.getAnimationGroupByName("ANIM.Paper.OUT").start(false);

                        paper.actionManager.unregisterAction(paperAction);

                        electronic.actionManager = new BABYLON.ActionManager(scene);
                        let electronicAction = electronic.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {

                            dialogPop("KIESLIJST", "Stem uitbrengen / kieslijst", false);

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

                                dialogPop("REGISTRATIE", "Registreer je stem", false);

                                main.prtSel.stop();
                                main.setB(list);
                                paper.scaling = new BABYLON.Vector3.Zero();
                                electronic.scaling = new BABYLON.Vector3.Zero();

                                scene.getAnimationGroupByName("ANIM.Booths.OUT").start(false);
                                scene.getAnimationGroupByName("ANIM.List.OUT").start(false);
                                scene.getAnimationGroupByName("ANIM.List.OUT").onAnimationEndObservable.add(() => {
                                    
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
                                            main.setW(ticketbox);
                                        });

                                        ticketbox.actionManager = new BABYLON.ActionManager(scene);
                                        let ticketboxesAction = ticketbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {

                                            dialogPop("KLAAR", "Haal je papieren terug op", false);

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