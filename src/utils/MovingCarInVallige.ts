import { Scene, Mesh } from 'babylonjs'
import * as BABYLON from 'babylonjs'

// 失败，模型加载问题
export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine)
    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI /2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0,0,0))
    camera.attachControl(canvas, true)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);


    BABYLON.SceneLoader.ImportMeshAsync("", "/model/village.babylon");


    class Walk {
        turn: number
        dist: number
        constructor(turn:number, dist: number) {
            this.turn = turn
            this.dist = dist
        }
    }
    // 走路的路径
    const track:Walk[] = [];
    track.push(new Walk(86, 7));
    track.push(new Walk(-85, 14.8));
    track.push(new Walk(-93, 16.5));
    track.push(new Walk(48, 25.5));
    track.push(new Walk(-112, 30.5));
    track.push(new Walk(-72, 33.2));
    track.push(new Walk(42, 37.5));
    track.push(new Walk(-98, 45.2));
    track.push(new Walk(0, 47))


    BABYLON.SceneLoader.ImportMeshAsync('him', '/model/', 'dude.babylon', scene).then((res) => {
        const dude :any = res.meshes[0]
        console.log(dude, 'dude')
        dude.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);
        dude.position = new BABYLON.Vector3(-6,0,0)

        dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-95), BABYLON.Space.LOCAL);
        const startRotation = dude.rotationQuaternion.clone();    
        console.log(startRotation, '222222222222', res)
        // scene.beginAnimation(res.skeletons[0], 0, 100, true, 1.0);

        let distance = 0;
        let step = 0.015;
        let p = 0;

        scene.onBeforeRenderObservable.add(() => {
		    dude.movePOV(0, 0, step);
            distance += step;
              
            if (distance > track[p].dist) {
                    
                dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
                p +=1;
                p %= track.length; 
                if (p === 0) {
                    distance = 0;
                    dude.position = new BABYLON.Vector3(-6, 0, 0);
                    dude.rotationQuaternion = startRotation.clone();
                }
            }
			
        })
    })

    return scene
}