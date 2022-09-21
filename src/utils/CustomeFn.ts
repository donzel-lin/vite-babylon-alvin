import { GroundMesh, Scene, Color4, Mesh, Vector3, Material,Color3, StandardMaterial, Texture} from "babylonjs"
import * as BABYLON from 'babylonjs'
import { Vector4 } from "babylonjs/Maths/math";
// 平面
export function createGround():GroundMesh {
    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");
    const _ground:GroundMesh = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10})
    return _ground
}
// 纹理，理解faceUv 和faceColor
export function createCan(scene:Scene):Mesh {
    // 创建材质
    const  canMeterial = new BABYLON.StandardMaterial('material', scene)
    // 给材质贴图
    canMeterial.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/logo_label.jpg')

    /*
    faceUV 面纹理
        0 => 底部面
        1 => 侧面
        2 => 顶面
    */
    const faceUV:Vector4[] = []
    faceUV[0] = new BABYLON.Vector4(0,0,0,0)
    faceUV[1] = new BABYLON.Vector4(1,0,0.25,1)
    faceUV[2] = new BABYLON.Vector4(0,0,0.25,1)
    /*
        faceColors, 面颜色
        0 => 底部面
        1 => 侧面
        2 => 顶面
    */
    const faceColors:Color4[] = []
    faceColors[0] = new BABYLON.Color4(0.5,0.5,0.5,1)
    const can :Mesh = BABYLON.MeshBuilder.CreateCylinder('can', {
        height: 1.5,
        faceUV,
        faceColors
    })
    can.material = canMeterial
    return can
}

// 房子
export function createHouse(scene:Scene):void {
    const groundMat = buildStandardMaterial('groundMat')
    const ground = buildGround()
    ground.material = groundMat

    const box :Mesh= buildBox()
    const boxMat = buildStandardMaterial('boxMat')
    const boxTexture = buildTexture('boxTexture', 'https://www.babylonjs-playground.com/textures/floor.png')
    boxMat.diffuseTexture = boxTexture
    box.material = boxMat


    const roof:Mesh = buildRoof()
    const roofMat = buildStandardMaterial('roofMat')
    const roofTexture = buildTexture('roofTexture','https://assets.babylonjs.com/environments/roof.jpg' )
    roofMat.diffuseTexture = roofTexture
    roof.material = roofMat
}


// 颜色材质
function buildStandardMaterial(matName: string):StandardMaterial {
    const mat:StandardMaterial = new BABYLON.StandardMaterial(matName)
    return mat
}

function buildTexture(name:string, url:string) {
    return new BABYLON.Texture(url)
}
// 地板
function buildGround(): GroundMesh {
    const ground:GroundMesh = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10,})
    return ground
}
// box
function buildBox() :Mesh {
    // 创建box，三种方法都可以设置x,y,z
    // const box = BABYLON.CreateBox('box', { width: 2, height: 1.5, depth: 3})
    const box = BABYLON.CreateBox('box', {}) // 给的默认大小，1,1,1
    // box.scaling.x = 2
    // box.scaling.y = 1.5
    // box.scaling.z = 3
    // box.scaling = new BABYLON.Vector3(2, 1.5, 3)

    // 设置position位置
    // box.position.x = -2
    // box.position.y = 4.2
    // box.position.z = 0.1
    // box.position = new BABYLON.Vector3(-2, 4.2, 0.1)

    box.position.y = 0.5
    return box
}
// 屋顶
function buildRoof():Mesh{
    const roof = BABYLON.CreateCylinder('roof', {
        diameter: 1.3, height:1.2,
        tessellation: 3
    })
    roof.scaling.x = 0.75
    roof.rotation.z = Math.PI / 2
    roof.position.y = 1.22
    return roof
}