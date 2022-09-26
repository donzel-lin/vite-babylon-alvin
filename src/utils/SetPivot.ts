
import * as BABYLON from 'babylonjs'
// y轴旋转
export const  createScene1 = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4( .5, .5, .5, 1);

	// camera
	const camera = new BABYLON.ArcRotateCamera("camera1",  -3 * Math.PI / 8, 3 * Math.PI / 8, 15, new BABYLON.Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
  
	// lights
	const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
	light1.intensity = 0.7;
	const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(-1, -0.5, 0), scene);
	light2.intensity = 0.8;
  
    /*********************Create Marker for Pivot***************/
    // 在0,0,0的位置
    const spherePivot = BABYLON.MeshBuilder.CreateSphere("sphereP", {diameter:.5}, scene);
	const pivotMat = new BABYLON.StandardMaterial("pivot", scene);
    pivotMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    spherePivot.material = pivotMat
    /*********************End  Marker for Box Pivot***************/

    /*********************Create Marker for Box Local Origin***************/
    const sphereLocalOrigin = BABYLON.MeshBuilder.CreateSphere("sphereLO", {diameter:.5}, scene);
	const sphereLocalOriginMat = new BABYLON.StandardMaterial("origin", scene);
	sphereLocalOriginMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
    sphereLocalOrigin.material = sphereLocalOriginMat
    /*********************End  Marker for Box Local Origin***************/

	/*********************Create Box to Transform About Pivot***************/
	const faceColors = [];
	faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue())
	faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Teal())
	faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red())
	faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.Purple())
	faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green())
	faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow())
 
	const box = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors, size:2}, scene);
    sphereLocalOrigin.parent = box; //  将 sphereLocalOrigin 关联到box上，sphereLocalOrigin的坐标为 以box为基准
    box.material = new BABYLON.StandardMaterial("", scene);
    box.material.wireframe = true;
    /*******************End Box Creation*****************************************/

   //position box
    box.position = new BABYLON.Vector3(1, 0, 0);

    //set pivot at world space point (1, 1, 1)
    const pivotAt = new BABYLON.Vector3(1, 1, 1);
    /*
        1 - 1
        1 - 0
        1 - 0
    */

    // 修改 box的旋转轴为pivotAt点的位置，不懂为啥要这样设置
    const relativePosition = pivotAt.subtract(box.position)
    /*
        之前的 y 轴旋转轴是 1,0,0
        之后的 y 轴旋转轴是 过点(0,1,1)并与y轴旋转的线
    */
    box.setPivotPoint(relativePosition);// 0 1 1 
    
    spherePivot.position = pivotAt; // 1,1,1

	/*******Animation******************************/
    let angle = 0;
    scene.registerBeforeRender(function(){
        box.rotation.x = angle;
        angle += 0.01;

    })
    /*******End Animation******************************/
	/***********Create and Draw Axes**************************************/
	const showAxis = function(size:number) {
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
  
	showAxis(6);
	/***************************************************************/
	return scene;
  
}
// 旋转平移后再 围着 支点轴来旋转
export const  createScene2 = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4( .5, .5, .5, 1);

	// camera
	const camera = new BABYLON.ArcRotateCamera("camera1",  -3 * Math.PI / 8, 3 * Math.PI / 8, 15, new BABYLON.Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
  
	// lights
	const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
	light1.intensity = 0.7;
	const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(-1, -0.5, 0), scene);
	light2.intensity = 0.8;
  
    /*********************Create Marker for Pivot***************/
    // 在0,0,0的位置
    const spherePivot = BABYLON.MeshBuilder.CreateSphere("sphereP", {diameter:.5}, scene);
	const pivotMat = new BABYLON.StandardMaterial("pivot", scene);
    pivotMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    spherePivot.material = pivotMat
    /*********************End  Marker for Box Pivot***************/

    /*********************Create Marker for Box Local Origin***************/
    const sphereLocalOrigin = BABYLON.MeshBuilder.CreateSphere("sphereLO", {diameter:.5}, scene);
	const sphereLocalOriginMat = new BABYLON.StandardMaterial("origin", scene);
	sphereLocalOriginMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
    sphereLocalOrigin.material = sphereLocalOriginMat
    /*********************End  Marker for Box Local Origin***************/

	/*********************Create Box to Transform About Pivot***************/
	const faceColors = [];
	faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue())
	faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Teal())
	faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red())
	faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.Purple())
	faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green())
	faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow())
 
	const box = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors, size:2}, scene);
    sphereLocalOrigin.parent = box; //  将 sphereLocalOrigin 关联到box上，sphereLocalOrigin的坐标为 以box为基准
    box.material = new BABYLON.StandardMaterial("", scene);
    box.material.wireframe = true;
    /*******************End Box Creation*****************************************/
    spherePivot.parent = box
    spherePivot.position = new BABYLON.Vector3(-1,-1,-1) // box的左下角，  相对位置
    box.setPivotPoint(new BABYLON.Vector3(-1,-1,-1)) // 设置box的支点坐标，就是左下角


    box.position = new BABYLON.Vector3(1,2,3) // 此处设置box的位置，那么支点坐标也会跟着一起变
    //  负值为逆时针旋转
    box.rotation = new BABYLON.Vector3(-Math.PI / 3, -Math.PI / 6, -Math.PI / 3)

	/*******Animation******************************/
    let angle = 0;
    scene.registerBeforeRender(function(){
        box.rotation.y = angle;
        angle += 0.01;

    })
    /*******End Animation******************************/
	/***********Create and Draw Axes**************************************/
	const showAxis = function(size:number) {
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
  
	showAxis(6);
	/***************************************************************/
	return scene;
  
}
// 坐标变化
/*
给box设置了支点轴之后，旋转和缩放之后，box中position保存的数据和真实的世界坐标体系中的位置是有误差的
可以使用box.getAbsolutePosition 来获取真实世界坐标



*/
export const  createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4( .5, .5, .5, 1);

	// camera
	const camera = new BABYLON.ArcRotateCamera("camera1",  -3 * Math.PI / 8, 3 * Math.PI / 8, 15, new BABYLON.Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
  
	// lights
	const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
	light1.intensity = 0.7;
	const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(-1, -0.5, 0), scene);
	light2.intensity = 0.8;
  
    /*********************Create Marker for Pivot***************/
    // 在0,0,0的位置
    const spherePivot = BABYLON.MeshBuilder.CreateSphere("sphereP", {diameter:.5}, scene);
	const pivotMat = new BABYLON.StandardMaterial("pivot", scene);
    pivotMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    spherePivot.material = pivotMat
    /*********************End  Marker for Box Pivot***************/

    /*********************Create Marker for Box Local Origin***************/
    const sphereLocalOrigin = BABYLON.MeshBuilder.CreateSphere("sphereLO", {diameter:.5}, scene);
	const sphereLocalOriginMat = new BABYLON.StandardMaterial("origin", scene);
	sphereLocalOriginMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
    sphereLocalOrigin.material = sphereLocalOriginMat
    /*********************End  Marker for Box Local Origin***************/

	/*********************Create Box to Transform About Pivot***************/
	const faceColors = [];
	faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue())
	faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Teal())
	faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red())
	faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.Purple())
	faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green())
	faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow())
 
	const box = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors, size:2}, scene);
    sphereLocalOrigin.parent = box; //  将 sphereLocalOrigin 关联到box上，sphereLocalOrigin的坐标为 以box为基准
    spherePivot.position = new BABYLON.Vector3(-1,-1,-1)

    sphereLocalOrigin.parent = box
    box.setPivotPoint(new BABYLON.Vector3(-1,-1,-1))

    box.material = new BABYLON.StandardMaterial("", scene);
    box.material.wireframe = true;
    /*******************End Box Creation*****************************************/

    box.position = new BABYLON.Vector3(5,0,0)
    
    // 世界坐标体系值改变了
    box.rotation.y = Math.PI / 4
    // 纠正position
    box.position = box.position.add(box.position.subtract(box.getAbsolutePosition()))
    console.log(box.getAbsolutePosition(), box.getPivotPoint())
    // getPivotPoint 获取 枢纽轴的世界坐标
	/*******Animation******************************/
    // let angle = 0;
    // scene.registerBeforeRender(function(){
    //     box.rotation.y = angle;
    //     angle += 0.01;

    // })
    /*******End Animation******************************/
	/***********Create and Draw Axes**************************************/
	const showAxis = function(size:number) {
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
  
	showAxis(6);
	/***************************************************************/
	return scene;
  
}