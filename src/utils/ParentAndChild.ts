/* eslint-disable  */
import { GroundMesh, Scene, Color4, Mesh, Vector3, Material, Color3, StandardMaterial, Texture } from 'babylonjs'
import * as BABYLON from 'babylonjs'
import { Vector4 } from 'babylonjs/Maths/math'
export const createParentAndChild = (scene: Scene) => {
  const faceColors = []
  faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue())
  faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Teal())
  faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red())
  faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.Purple())
  faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green())
  faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow())

  const boxParent = BABYLON.MeshBuilder.CreateBox('Box', {
    faceColors
  })
  const boxChild = BABYLON.MeshBuilder.CreateBox('Box', {
    size: 0.5,
    faceColors
  })
  boxChild.setParent(boxParent)

  boxChild.position.x = 0
  boxChild.position.y = 2
  boxChild.position.z = 0

  boxChild.rotation.x = Math.PI / 4
  boxChild.rotation.y = Math.PI / 4
  boxChild.rotation.z = Math.PI / 4

  boxParent.position.x = 2
  boxParent.position.y = 0
  boxParent.position.z = 0

  boxParent.rotation.x = 0
  boxParent.rotation.y = 0
  boxParent.rotation.z = -Math.PI / 4

  const boxChildAxes = localAxes(1, scene)
  boxChildAxes.parent = boxChild
  showAxis(6, scene)
  return scene
}

/** *********Create and Draw Axes**************************************/
const showAxis = (size: number, scene: Scene) => {
  const makeTextPlane = (text: string, color: string, size: number) => {
    const dynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', 50, scene, true)
    dynamicTexture.hasAlpha = true
    dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true)
    const plane = BABYLON.Mesh.CreatePlane('TextPlane', size, scene, true)
    const mat = new BABYLON.StandardMaterial('TextPlaneMaterial', scene)
    mat.diffuseTexture = dynamicTexture
    mat.diffuseColor = new BABYLON.Color3(0, 0, 0)
    mat.backFaceCulling = false
    plane.material = mat
    return plane
  }

  const axisX = BABYLON.Mesh.CreateLines('axisX', [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(size, 0, 0),
    new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
    new BABYLON.Vector3(size, 0, 0),
    new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
  ], scene, false)
  axisX.color = new BABYLON.Color3(1, 0, 0)
  const xChar = makeTextPlane('X', 'red', size / 10)
  xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0)

  const axisY = BABYLON.Mesh.CreateLines('axisY', [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, size, 0),
    new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
    new BABYLON.Vector3(0, size, 0),
    new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
  ], scene, false)
  axisY.color = new BABYLON.Color3(0, 1, 0)
  const yChar = makeTextPlane('Y', 'green', size / 10)
  yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size)

  const axisZ = BABYLON.Mesh.CreateLines('axisZ', [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, size),
    new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
    new BABYLON.Vector3(0, 0, size),
    new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
  ], scene, false)
  axisZ.color = new BABYLON.Color3(0, 0, 1)
  const zChar = makeTextPlane('Z', 'blue', size / 10)
  zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size)
}

/*********************************************************************/

/** *****************************Local Axes****************************/
const localAxes = (size: number, scene: Scene) => {
  const local_axisX = BABYLON.Mesh.CreateLines('local_axisX', [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(size, 0, 0),
    new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
    new BABYLON.Vector3(size, 0, 0),
    new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
  ], scene, false)
  local_axisX.color = new BABYLON.Color3(1, 0, 0)
  const local_axisY = BABYLON.Mesh.CreateLines('local_axisY', [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, size, 0),
    new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
    new BABYLON.Vector3(0, size, 0),
    new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
  ], scene, false)
  local_axisY.color = new BABYLON.Color3(0, 1, 0)

  const local_axisZ = BABYLON.Mesh.CreateLines('local_axisZ', [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, size),
    new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
    new BABYLON.Vector3(0, 0, size),
    new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
  ], scene, false)
  local_axisZ.color = new BABYLON.Color3(0, 0, 1)

  const local_origin = new BABYLON.TransformNode('local_origin')

  local_axisX.parent = local_origin
  local_axisY.parent = local_origin
  local_axisZ.parent = local_origin

  return local_origin
}
/** *****************************End Local Axes****************************/
