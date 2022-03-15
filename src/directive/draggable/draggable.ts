import { App } from 'vue'

const range = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}
const dragger = {
  mounted(el: Element): void {
    const header = el.querySelector('.el-dialog__header') as HTMLElement
    header.style.cursor = 'move'
    const dialog = el.querySelector('.el-dialog') as HTMLElement
    let startX = 0
    let startY = 0
    let status = ''
    header.addEventListener('mousedown', (e) => {
      e.preventDefault()
      status = 'down'
      range.left = -(
        (document.documentElement.clientWidth - dialog.clientWidth) /
        2
      )
      range.right = Math.abs(range.left)
      const marginTop = parseInt(dialog.style.marginTop) / 100
      range.top = -(document.documentElement.clientHeight * marginTop)
      range.bottom =
        document.documentElement.clientHeight * (1 - marginTop) -
        dialog.clientHeight
      startX = e.clientX - (parseInt(dialog.style.left) || 0)
      startY = e.clientY - (parseInt(dialog.style.top) || 0)
      const handleMove = (e: MouseEvent) => {
        if (status !== 'down') return
        const moveX = e.clientX
        const moveY = e.clientY
        let distX = moveX - startX
        let distY = moveY - startY
        if (distX <= range.left) {
          distX = range.left
        }
        if (distX >= range.right) {
          distX = range.right
        }
        if (distY <= range.top) {
          distY = range.top
        }
        if (distY >= range.bottom) {
          distY = range.bottom
        }
        dialog.style.left = distX + 'px'
        dialog.style.top = distY + 'px'
      }
      const handleUp = () => {
        status = 'up'
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleUp)
      }
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleUp)
    })
  },
  install: function (app: App): void {
    console.log('install')
  },
}
export default dragger
