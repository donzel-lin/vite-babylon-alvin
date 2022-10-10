import * as BABYLON from 'babylonjs'

export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene => {
  const scene = new BABYLON.Scene(engine)

  const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0, 0, 0))
  camera.attachControl(canvas, true)
  //   const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)
  // 定义 动画对象 圆球
  const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.25 })
  sphere.position = new BABYLON.Vector3(2, 0, 2)
  // 定义三角形的三个点
  const points: BABYLON.Vector3[] = []
  points.push(new BABYLON.Vector3(2, 0, 2))
  points.push(new BABYLON.Vector3(2, 0, -2))
  points.push(new BABYLON.Vector3(-2, 0, -2))
  points.push(points[0])
  // 创建三角形
  BABYLON.MeshBuilder.CreateLines('triangle', { points })

  // 创建转角的参数
  class Slide {
    turn: number
    dist: number
    // 给所有属性
    constructor (turn: number, dist: number) {
      this.turn = turn
      this.dist = dist
    }
  }
  // 三边的轨迹
  const track: Slide[] = []
  track.push(new Slide(Math.PI / 2, 4))
  track.push(new Slide(3 * Math.PI / 4, 8))
  track.push(new Slide(3 * Math.PI / 4, 8 + 4 * Math.sqrt(2)))

  let distance = 0
  const step = 0.05
  let p = 0

  // 在每一帧渲染前，执行；即可以每次渲染帧前修改mesh的属性
  scene.onBeforeRenderObservable.add(() => {
    // 向前移动step的距离
    sphere.movePOV(0, 0, step)
    distance += step
    if (distance > track[p].dist) {
      // 需要调整角度了
      sphere.rotate(BABYLON.Axis.Y, track[p].turn, BABYLON.Space.LOCAL)
      p += 1
      p %= track.length
      if (p === 0) {
        distance = 0
        sphere.position = new BABYLON.Vector3(2, 0, 2) // reset to initial conditions
        sphere.rotation = new BABYLON.Vector3(0, 0, 0)// prevents error accumulation
      }
    }
  })

  return scene
}
