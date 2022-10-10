/* eslint-disable  */
// 父点和支点
import { GroundMesh, Scene, Color4, Mesh, Vector3, Material,Color3, StandardMaterial, Texture} from "babylonjs"

import * as BABYLON from 'babylonjs'


// rotation alone axis 沿着轴转动
export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    
    const scene = new BABYLON.Scene(engine)
    // 设置背景色
    scene.clearColor = new BABYLON.Color4(0.5,0.5,0.5,1)
    // camera 
    const camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, new BABYLON.Vector3(5,3,0), scene)
    camera.setPosition(new BABYLON.Vector3(14, 8, -12))
    camera.attachControl(canvas, true)

    // light
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 0.5 ,0), scene)
    light.intensity = 0.8 // 光照强度

    // start polit 运动物体
    const body = BABYLON.MeshBuilder.CreateCylinder('body', {
        height: 0.75,
        diameterTop: 0.2,
        diameterBottom: 0.5,
        tessellation: 6,
        subdivisions: 1
    }, scene)
    // 标志物
    const arm = BABYLON.MeshBuilder.CreateBox('arm', {
        height: 0.75,
        width: 0.3,
        depth: 0.75
    }, scene)
    arm.position.x = 0.125
    const polit = BABYLON.Mesh.MergeMeshes([body, arm],true) as Mesh

    // CoR， axix， 一般来说，旋转点在旋转轴上
    // 旋转点
    const CoR_At = new BABYLON.Vector3(1,3,2)
    // 旋转轴
    const axis = new BABYLON.Vector3(2,6,4)
    // 起始位置
    const politStart = new BABYLON.Vector3(2,3,3)

    // 划一根线，代替旋转轴
    const axisLine = BABYLON.MeshBuilder.CreateLines('axisLine', {
        points: [CoR_At.add(axis.scale(-50)), CoR_At.add(axis.scale(50))],
    }, scene)
    
    // 旋转点
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.25})
    sphere.position = CoR_At


    // 开始设置旋转的轴和点了
    const pivot= new BABYLON.TransformNode('root')
    pivot.position = CoR_At
    polit.parent = pivot
    polit.position = politStart

    sphere.parent = pivot;
    sphere.position = pivot.position;
    // animation
    let a = 0; // for oscillation, 平移
    let angle=0.025; 
    let axisNormal = axis.normalize();  
    scene.registerAfterRender(function() {
        a +=0.005;
        let sign = Math.cos(a)/Math.abs(Math.cos(a));
        // 此处 pivot在移动，那么其child物体都会跟着变化， 沿着轴线转动
        pivot.rotate(axis, angle, BABYLON.Space.LOCAL);  
        // 沿着轴线移动
        pivot.position = pivot.position.add(axisNormal.scale(0.01 * sign)); //move pilot along axis
        // sphere.position = polit.position; //set pivot marker position
	}); 

    return scene
}