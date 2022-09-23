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
    const ground = buildGround()
    const detached_house = buildHouse(1) as Mesh
    detached_house.rotation.y = -Math.PI / 16
    detached_house.position.x = -6.8
    detached_house.position.z = 2.5
    const semi_house = buildHouse(2) as Mesh
    semi_house.rotation.y = -Math.PI / 16;
    semi_house.position.x = -4.5;
    semi_house.position.z = 3;


    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
    places.push([2, -Math.PI / 16, -4.5, 3 ]);
    places.push([2, -Math.PI / 16, -1.5, 4 ]);
    places.push([2, -Math.PI / 3, 1.5, 6 ]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
    places.push([1, 5 * Math.PI / 4, 0, -1 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
    places.push([2, Math.PI / 1.9, 4.75, -1 ]);
    places.push([1, Math.PI / 1.95, 4.5, -3 ]);
    places.push([2, Math.PI / 1.9, 4.75, -5 ]);
    places.push([1, Math.PI / 1.9, 4.75, -7 ]);
    places.push([2, -Math.PI / 3, 5.25, 2 ]);
    places.push([1, -Math.PI / 3, 6, 4 ]);

    const houses = [];
    for (let i = 0; i < places.length; i++) {
        if (places[i][0] === 1) {
            // 复制
            houses[i] = detached_house.createInstance("house" + i);
        }
        else {
            houses[i] = semi_house.createInstance("house" + i);
        }
        houses[i].rotation.y = places[i][1];
        houses[i].position.x = places[i][2];
        houses[i].position.z = places[i][3];
    }
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
    const groundMat = buildStandardMaterial('groundMat')
    const ground:GroundMesh = BABYLON.MeshBuilder.CreateGround('ground', { width: 15, height: 16,})
    ground.material = groundMat
    return ground
}

const buildHouse = (width: number) => {
    const box = buildBox(width)
    const roof = buildRoof(width)
    return  BABYLON.Mesh.MergeMeshes([box, roof], true, false, undefined, false, true)
}

const buildBox = (width:number) :Mesh => {
    const boxMat = new BABYLON.StandardMaterial('boxMat')
    const faceUV:Vector4[] = []
    if(width === 2) {
        boxMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/semihouse.png')
        faceUV[0] = new BABYLON.Vector4(0.6,0,1,1)  // 后面
        faceUV[1] = new BABYLON.Vector4(0,0,0.4,1)  // 前面
        faceUV[2] = new BABYLON.Vector4(0.4,0,0.6,1) // 左
        faceUV[3] = new BABYLON.Vector4(0.4,0,0.6,1) // 右
    } else {
        boxMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/cubehouse.png')
        faceUV[0] = new BABYLON.Vector4(0,0,0.25,1)
        faceUV[1] = new BABYLON.Vector4(0.5,0,0.75,1)
        faceUV[2] = new BABYLON.Vector4(0.25,0,0.5,1)
        faceUV[3] = new BABYLON.Vector4(0.75,0,1,1)
    }
    const box :Mesh = BABYLON.CreateBox('box', {
        width,
        faceUV,
        wrap: true
    })
    box.material = boxMat
    box.position.y = 0.5
    return box
}

// 屋顶
function buildRoof(width: number):Mesh{
    const roofMat = buildStandardMaterial('roofMat')
    const roofTexture = buildTexture('roofTexture','https://assets.babylonjs.com/environments/roof.jpg' )

    roofMat.diffuseTexture = roofTexture
    const roof = BABYLON.CreateCylinder('roof', {
        diameter: 1.3, 
        height:1.2,
        tessellation: 3
    })
    roof.material = roofMat

    roof.scaling.x = 0.75
    roof.scaling.y = width
    roof.rotation.z = Math.PI / 2
    roof.position.y = 1.22
    
    return roof
}

