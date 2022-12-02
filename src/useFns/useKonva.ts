import { isFireFox, isEdge } from '../utils/utils'
import Konva from 'konva'
import { Layer } from 'Konva/lib/Layer'
import { Stage } from 'Konva/lib/Stage'
export interface IStage {
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
    width: 100,
    height: 30,
    draggable: true
  })
  const rect = new Konva.Rect({
    width: 100,
    height: 30,
    x: 0,
    y: 0,
    fill: 'green',
    cornerRadius: 4,
    listening: false
  })
  const textName = new Konva.Text({
    text,
    fontSize: 12,
    fill: 'white',
    x: 0,
    y: 0,
    width: 100,
    height: 30,
    align: 'center',
    verticalAlign: 'middle',
    ellipsis: true,
    wrap: 'none'
  })

  rect.zIndex(0)
  textName.zIndex(1)
  group.add(rect)
  group.add(textName)

  return group
}
export interface editableText {
  stage: Stage
  layer: Layer
  text: string
  x: number
  y: number
}
const createEditableText = (params: editableText) => {
  const { layer, x, y, text, stage } = params
  const textNode = new Konva.Text({
    text,
    fontSize: 12,
    fill: 'black',
    x,
    y,
    width: 100,
    height: 30,
    align: 'center',
    verticalAlign: 'middle',
    ellipsis: true,
    wrap: 'none',
    draggable: true
  })
  layer.add(textNode)

  const tr = new Konva.Transformer({
    node: textNode,
    enabledAnchors: ['middle-left', 'middle-right'],
    // set minimum width of text
    boundBoxFunc: function (oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width)
      return newBox
    }
  })
  textNode.on('transform', function () {
    // reset scale, so only with is changing by transformer
    textNode.setAttrs({
      width: textNode.width() * textNode.scaleX(),
      scaleX: 1
    })
  })
  layer.add(tr)
  textNode.on('dblclick dbltap', () => {
    // hide text node and transformer:
    textNode.hide()
    // tr.hide()
    // create textarea over canvas with absolute position
    // first we need to find position for textarea
    // how to find it?

    // at first lets find position of text node relative to the stage:
    const textPosition = textNode.absolutePosition()

    // so position of textarea will be the sum of positions above:
    const areaPosition = {
      x: textPosition.x,
      y: textPosition.y
    }
    // create textarea and style it
    const textarea = document.createElement('textarea')
    const box = document.getElementById('canvasBox')
    box.appendChild(textarea)

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text()
    textarea.className = 'edit-textarea'
    textarea.style.position = 'absolute'
    textarea.style.top = `${areaPosition.y}px`
    textarea.style.left = `${areaPosition.x}px`
    textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px'
    textarea.style.height =
          textNode.height() - textNode.padding() * 2 + 5 + 'px'
    textarea.style.fontSize = textNode.fontSize() + 'px'
    textarea.style.border = 'none'
    textarea.style.padding = '0px'
    textarea.style.margin = '0px'
    textarea.style.overflow = 'hidden'
    textarea.style.background = 'none'
    textarea.style.outline = 'none'
    textarea.style.resize = 'none'
    textarea.style.lineHeight = '30px'
    textarea.style.fontFamily = textNode.fontFamily()
    textarea.style.transformOrigin = 'left top'
    textarea.style.textAlign = textNode.align()
    textarea.style.color = textNode.fill()
    const rotation = textNode.rotation()
    let transform = ''
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)'
    }

    let px = 0
    // also we need to slightly move textarea on firefox
    // because it jumps a bit

    if (isFireFox()) {
      px += 2 + Math.round(textNode.fontSize() / 20)
    }
    transform += 'translateY(-' + px + 'px)'

    textarea.style.transform = transform

    // // reset height
    // textarea.style.height = 'auto'
    // // after browsers resized it we can set actual value
    // textarea.style.height = textarea.scrollHeight + 3 + 'px'

    textarea.focus()

    function removeTextarea () {
      textarea.parentNode?.removeChild(textarea)
      window.removeEventListener('click', handleOutsideClick)
      textNode.show()
      tr.show()
      tr.forceUpdate()
    }
    function setTextareaWidth (newWidth: number) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize()
      }
      // some extra fixes on different browsers
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      )
      const isFirefox =
        navigator.userAgent.toLowerCase().includes('firefox')
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth)
      }

      // if (isEdge()) {
      //   newWidth += 1
      // }
      textarea.style.width = newWidth + 'px'
    }

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value)
        removeTextarea()
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea()
      }
    })

    textarea.addEventListener('keydown', function (e) {
      const scale = textNode.getAbsoluteScale().x
      console.log(textNode.width(), scale, 'width')
      setTextareaWidth(textNode.width() * scale)
      textarea.style.height = 'auto'
      textarea.style.height =
        textarea.scrollHeight + textNode.fontSize() + 'px'
    })
    function handleOutsideClick (e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value)
        removeTextarea()
      }
    }
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick)
    })
  })
  return textNode
}

const tooltip = new Konva.Text({
  text: '',
  fontFamily: 'Calibri',
  fontSize: 12,
  padding: 5,
  textFill: 'black',
  fill: 'black',
  alpha: 0.75,
  visible: false
})
export const useKonva = () => {
  return {
    createStage,
    createLayer,
    createTextGroup,
    myKonva: Konva,
    createEditableText,
    tooltip
  }
}
