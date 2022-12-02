const isFireFox = () => {
  return navigator.userAgent.toLowerCase().includes('firefox')
}

const isEdge = () => {
  return document.documentMode || navigator.userAgent.includes('Edge')
}

export {
  isFireFox,
  isEdge
}
