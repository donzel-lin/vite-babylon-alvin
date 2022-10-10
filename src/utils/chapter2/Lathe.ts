/* eslint-disable  */
import * as BABYLON from 'babylonjs'

export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // 切图
    const fountainProfile = [
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(10, 0, 0),
        new BABYLON.Vector3(10, 4, 0),
		new BABYLON.Vector3(8, 4, 0),
        new BABYLON.Vector3(8, 1, 0),
        new BABYLON.Vector3(1, 2, 0),
		new BABYLON.Vector3(1, 15, 0),
		new BABYLON.Vector3(3, 17, 0)
	]
    // 创建喷漆
    const fountain = BABYLON.MeshBuilder.CreateLathe(
        "fountain", 
        {shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, 
        scene);
	
    return scene
}