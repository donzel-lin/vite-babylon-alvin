import { Scene } from 'babylonjs'
import * as BABYLON from 'babylonjs'


export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine)
    // scene.clearColor = new BABYLON.Color4(.5,.5,.5,1)

    // camera 
    const camera = new BABYLON.ArcRotateCamera('camera',  -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0))
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    


    const car = buildCar(scene)
    car.rotation.x = -Math.PI / 2;
	showAxis(6, scene);
    return scene
}

const buildCar = (scene:Scene) => {
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
    ]
      //curved front
    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }
    //  //top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

        //material
    const carMat = new BABYLON.StandardMaterial("carMat");
    carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png")

    const faceUV = []
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1)
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5)
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5)

    // //back formed automatically
    // 向下拉伸
    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2, faceUV, wrap: true}, scene, );
    car.material = carMat


    // wheel
    const wheelUV = []
    wheelUV[0] = new BABYLON.Vector4(0,0,1,1)
    wheelUV[1] = new BABYLON.Vector4(0,0.5,0,0.5)
    wheelUV[2] = new BABYLON.Vector4(0,0,1,1)
    const wheelMat = new BABYLON.StandardMaterial('wheelMat')
    
    wheelMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/wheel.png')
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV: wheelUV})
    wheelRB.material = wheelMat
    wheelRB.parent = car;
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.035;

    // 使用clone来克隆出来的物体，都有相同的parent
    const wheelLB = wheelRB.clone("wheelLB");
    wheelLB.position.y = -0.2 - 0.035;
    const wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 0.1;
    const wheelLF = wheelRF.clone("wheelLF");
    wheelLF.position.y = -0.2 - 0.035;

    return car
}

const showAxis = function(size:number, scene: Scene) {
	const makeTextPlane = function(text:string, color:string, size:number) {
		const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
		dynamicTexture.hasAlpha = true;
		dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
		const plane = BABYLON.MeshBuilder.CreatePlane("TextPlane", {
            size,
        });
	    const TextPlaneMaterial = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
		TextPlaneMaterial.backFaceCulling = false;
		TextPlaneMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		TextPlaneMaterial.diffuseTexture = dynamicTexture;
        plane.material = TextPlaneMaterial
		return plane;
    };
  
	const axisX = BABYLON.MeshBuilder.CreateLines("axisX", {
        points: [ 
		    new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
		    new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
		]
    }, scene);
	axisX.color = new BABYLON.Color3(1, 0, 0);
	const xChar = makeTextPlane("X", "red", size / 10);
	xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    const axisY = BABYLON.MeshBuilder.CreateLines("axisY", {
        points: [
            new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
        ]
    }, scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    const yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    const axisZ = BABYLON.MeshBuilder.CreateLines("axisZ", {
        points: [
        new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
        ]
    }, scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    const zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};

export const createScene1 = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0),scene);
    
    //base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
    ]

    //curved front
    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }

    //top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

    //back formed automatically

    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2});

    return scene;
}


export const createAnimationWheel = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine)

    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI /2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0,0,0))
    camera.attachControl(canvas, true)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    const wheelUV= []
    wheelUV[0] = new BABYLON.Vector4(0,0,1,1)
    wheelUV[1] = new BABYLON.Vector4(0,0.5,0,0.5)
    wheelUV[2] = new BABYLON.Vector4(0,0,1,1)

    const wheelMat = new BABYLON.StandardMaterial('wheelMat')
    const wheelTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/wheel.png')
    wheelMat.diffuseTexture = wheelTexture
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder('wheelRB', {
        diameter: 0.125,
        height: 0.05,
        faceUV: wheelUV
    })
    wheelRB.material = wheelMat
    // animation
    const animationWheel = new BABYLON.Animation(
        'wheelAnimation', // 动画名
        'rotation.y', // 动画属性，此处沿y轴旋转
         30,  // 每秒动画帧， 每秒30帧
         BABYLON.Animation.ANIMATIONTYPE_FLOAT, // 动画类型属性
         BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE) // 动画循环模式
    const wheelKeys = []
    // 动画帧，开始帧
    wheelKeys.push({
        frame: 0,
        value: 0
    })
    // 每秒结束帧
    wheelKeys.push({
        frame: 30,
        value: Math.PI * 2
    })

    //set the keys
    animationWheel.setKeys(wheelKeys);

    //Link this animation to a wheel
    wheelRB.animations = [];
    wheelRB.animations.push(animationWheel);

    scene.beginAnimation(wheelRB, 0, 30, true);
    return scene
}