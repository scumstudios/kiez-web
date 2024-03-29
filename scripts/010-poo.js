import { baseCamp } from "main";

document.getElementById("loadFrame").style.display = 'inline';

BABYLON.SceneLoader.Append("assets/", "010-links_rechts.glb", scene, function(container) {
    container.meshes.forEach(mesh => {
        mesh.material = vcolmat;
        mesh.receiveShadows = true;
        sg.addShadowCaster(mesh, true);
        mesh.renderOutline = true;
        mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
        mesh.outlineWidth = 0.005;
    });

    scene.stopAllAnimations();
    container.addAllToScene();

    // console.log(container.animationGroups);

    let openL = scene.getMeshById("GEO.Belgium.L");
    hl.addMesh(openL, BABYLON.Color3.Yellow());
    openL.actionManager = new BABYLON.ActionManager(scene);
    let openLAction = openL.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(1, 0, 15), new BABYLON.Vector3(0, 0, 0), 0.75);
            for (let i = 0; i < container.animationGroups.length; i++) {
                container.animationGroups[i].play();
            }
            hl.removeMesh(scene.getMeshById("GEO.Belgium.L"));
            hl.removeMesh(scene.getMeshById("GEO.Belgium.R"));
            openL.actionManager.unregisterAction(openLAction);
            openR.actionManager.unregisterAction(openRAction);
    }));

    let openR = scene.getMeshById("GEO.Belgium.R");
    hl.addMesh(openR, BABYLON.Color3.Yellow());
    openR.actionManager = new BABYLON.ActionManager(scene);
    let openRAction = openR.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(1, 0, 15), new BABYLON.Vector3(0, 0, 0), 0.75);
            for (let i = 0; i < container.animationGroups.length; i++) {
                container.animationGroups[i].play();
            }
            hl.removeMesh(scene.getMeshById("GEO.Belgium.L"));
            hl.removeMesh(scene.getMeshById("GEO.Belgium.R"));
            openL.actionManager.unregisterAction(openLAction);
            openR.actionManager.unregisterAction(openRAction);
    }));

    // SCENE TRIGGERS
    let pdva = scene.getMeshById("EVT.PVDA");
    hl.addMesh(pdva, BABYLON.Color3.Yellow());
    pdva.actionManager = new BABYLON.ActionManager(scene);
    pdva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.8, 0.75, 0.15), 0.5);
            dialog_pop("PVDA");
            hl.removeMesh(pdva);
    }));

    let groen = scene.getMeshById("EVT.Groen");
    hl.addMesh(groen, BABYLON.Color3.Yellow())
    groen.actionManager = new BABYLON.ActionManager(scene);
    groen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.55, 0.75, 0.15), 0.5);
            dialog_pop("Groen");
            hl.removeMesh(groen);
    }))

    let vooruit = scene.getMeshById("EVT.Vooruit");
    hl.addMesh(vooruit, BABYLON.Color3.Yellow())
    vooruit.actionManager = new BABYLON.ActionManager(scene);
    vooruit.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(-0.275, 0.75, 0.15), 0.5);
            dialog_pop("Vooruit");
            hl.removeMesh(vooruit);
    }))

    let cdnv = scene.getMeshById("EVT.CDNV");
    hl.addMesh(cdnv, BABYLON.Color3.Yellow())
    cdnv.actionManager = new BABYLON.ActionManager(scene);
    cdnv.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0, 0.75, 0.15), 0.5);
            dialog_pop("CD&V");
            hl.removeMesh(cdnv);
    }))

    let vld = scene.getMeshById("EVT.VLD");
    hl.addMesh(vld, BABYLON.Color3.Yellow())
    vld.actionManager = new BABYLON.ActionManager(scene);
    vld.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.275, 0.75, 0.15), 0.5);
            dialog_pop("Open VLD");
            hl.removeMesh(vld);
    }))

    let nva = scene.getMeshById("EVT.NVA");
    hl.addMesh(nva, BABYLON.Color3.Yellow())
    nva.actionManager = new BABYLON.ActionManager(scene);
    nva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.55, 0.75, 0.15), 0.5);
            dialog_pop("NVA");
            hl.removeMesh(nva);
    }))

    let vlb = scene.getMeshById("EVT.VLB");
    hl.addMesh(vlb, BABYLON.Color3.Yellow())
    vlb.actionManager = new BABYLON.ActionManager(scene);
    vlb.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            camAnim(new BABYLON.Vector3(-0.5, 0.5, 5), new BABYLON.Vector3(0.8, 0.75, 0.15), 0.5);
            dialog_pop("Vlaams Belang");
            hl.removeMesh(vlb);
    }))
});