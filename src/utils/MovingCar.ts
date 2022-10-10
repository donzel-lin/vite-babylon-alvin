import * as BABYLON from 'babylonjs'
// import { callWithErrorHandling } from 'vue'

export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene => {
  const scene = new BABYLON.Scene(engine)

  const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0, 0, 0))
  camera.attachControl(canvas, true)
  //   const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)

  void BABYLON.SceneLoader.ImportMeshAsync('', '/model/car.babylon').then(() => {
    // 导入car成功
    const car = scene.getMeshByName('car') as BABYLON.Mesh
    // 生成car 动画
    const animCar = generateCarAnimation()
    // 给car 添加动画
    car.animations = []
    car.animations.push(animCar)

    const wheelRB = scene.getMeshByName('wheelRB')
    const wheelRF = scene.getMeshByName('wheelRF')
    const wheelLB = scene.getMeshByName('wheelLB')
    const wheelLF = scene.getMeshByName('wheelLF')
    scene.beginAnimation(wheelRB, 0, 30, true)
    scene.beginAnimation(wheelRF, 0, 30, true)
    scene.beginAnimation(wheelLB, 0, 30, true)
    scene.beginAnimation(wheelLF, 0, 30, true)
    scene.beginAnimation(car, 0, 150, true)
  })

  return scene
}

const generateCarAnimation = (): BABYLON.Animation => {
  const animCar = new BABYLON.Animation(
    'animCar',
    'position.x',
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
  const carKeys = []
  carKeys.push({
    frame: 0,
    value: -4
  })
  carKeys.push({
    frame: 150,
    value: 4
  })
  // 暂停两帧
  carKeys.push({
    frame: 210,
    value: 4
  })
  animCar.setKeys(carKeys)
  return animCar
}
