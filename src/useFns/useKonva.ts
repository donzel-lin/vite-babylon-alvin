import Konva from 'konva'
import { Stage } from 'konva/cmj/Stage'
interface IStage {
  container: string
  width?: number
  height?: number
}

const createStage = (params: IStage) => {
  return new Konva.Stage(params)
}
const createLayer = () => {
  return new Konva.Layer()
}
const createTextGroup = (text: string) => {
  const group = new Konva.Group({
    x: 200,
    y: 100,
    draggable: true
  })
  const rect = new Konva.Rect({
    width: 100,
    height: 30,
    x: 0,
    y: 0,
    fill: 'green',
    cornerRadius: 2
  })
  const textName = new Konva.Text({
    text,
    fontSize: 12,
    fill: 'white',
    x: 0,
    y: 10,
    width: 100,
    align: 'center',
    ellipsis: true,
    wrap: 'none'
  })
  rect.zIndex(0)
  textName.zIndex(1)
  group.add(rect)
  group.add(textName)

  return group
}

export const useKonva = () => {
  return {
    createStage,
    createLayer,
    createTextGroup,
    myKonva: Konva
  }
}
