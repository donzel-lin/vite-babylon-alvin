import * as BABYLON from 'babylonjs'

export const createScene1 = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine)
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        'largeGround', 
        'https://assets.babylonjs.com/environments/villageheightmap.png',
        {
            width: 150,
            height: 150,
            subdivisions: 20,
            minHeight: 0,
            maxHeight: 10
        })

    // groundmat
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;

    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 24, height: 24})
    ground.material = groundMat

    const largeGroundMat = new BABYLON.StandardMaterial('largeGroundMat')
    const texture = new BABYLON.Texture('https://assets.babylonjs.com/environments/valleygrass.png')
    largeGroundMat.diffuseTexture = texture

    largeGround.material = largeGroundMat
    largeGround.position.y = -0.01
    return scene


}

// 模型加载问题
export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    BABYLON.SceneLoader.ImportMeshAsync(
        "", "https://assets.babylonjs.com/meshes/", "valleyvillage.glb");
    return scene
}