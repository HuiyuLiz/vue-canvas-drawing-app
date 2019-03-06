new Vue({
  el: '#app',
  data: {
    colors: ['#FFFFFF', '#000000', '#9BFFCD', '#00CC99', '#01936F'],
    tools: [{
      name: 'brush',
      class: 'material-icons brush-icon'
    }, {
      name: 'eraser',
      class: 'fas fa-eraser'
    }],
    currentColor: '#00CC99',
    currentTool: 'brush',
    random: '#cccccc',
    lineWidth: 10,
    lastX: 0,
    lastY: 0,
    isDrawing: false,
    isToggle: false,
    isBrush: true,
    canvas: null,
    ctx: null,
    cursor: '',
    canvasArray: [],
    step: -1,
    url: '',
    initURL: ''
  },
  mounted() {
    let vm = this
    vm.canvas = vm.$refs.canvas
    vm.canvas.addEventListener('mousemove', vm.mouseMove)
    vm.canvas.addEventListener('mousemove', vm.cursorMove)
    vm.canvas.addEventListener('mousedown', vm.mouseDown)
    vm.canvas.addEventListener('mouseup', vm.mouseUp)
    vm.canvas.addEventListener('mouseleave', vm.mouseLeave)
    window.addEventListener('resize', vm.resizeCanvas)
    window.addEventListener('onload', vm.initCanvas)
    vm.initCanvas()
  },
  methods: {
    initCanvas() {
      let vm = this
      vm.step = -1
      vm.ctx = vm.canvas.getContext('2d')
      vm.initURL = vm.canvas.toDataURL()
      vm.canvas.width = window.innerWidth
      vm.canvas.height = window.innerHeight
      vm.ctx.lineJoin = 'round'
      vm.ctx.lineCap = 'round'
      vm.ctx.strokeStyle = vm.currentColor
      vm.ctx.lineWidth = vm.lineWidth
      vm.ctx.fillStyle = '#E8E8E8'
      vm.ctx.fillRect(0, 0, vm.canvas.width, vm.canvas.height)
      vm.pushCanvas()
    },
    resizeCanvas() {
      let vm = this
      vm.canvas.width = window.innerWidth
      vm.canvas.height = window.innerHeight
      let image = new Image();
      image.src = vm.canvasArray[vm.step];
      image.onload = function () {
        vm.ctx.drawImage(image, 0, 0, vm.canvas.width, vm.canvas.height);
        vm.pushCanvas();
      }
    },
    pushCanvas() {
      let vm = this
      vm.step++
      if (vm.step < vm.canvasArray.length) { vm.canvasArray.length = vm.step; }
      vm.canvasArray.push(vm.canvas.toDataURL());
    },
    colorPicker(color) {
      let vm = this
      vm.currentColor = color
      vm.isBrush = true
      vm.setCurrentTool()
    },
    randomColor() {
      let vm = this
      let randomInput = document.querySelector('#randomInput')
      vm.currentColor = randomInput.value
      vm.isBrush = true
      vm.setCurrentTool()
    },
    setCurrentTool() {
      // 選取顏色後工具自動切回筆刷
      let vm = this
      if (vm.isBrush === true) {
        vm.currentTool = 'brush'
      }
    },
    selectTool(tool) {
      let vm = this
      vm.currentTool = tool.name
    },
    draw(e) {
      let vm = this

      vm.ctx.beginPath()
      vm.ctx.moveTo(vm.lastX, vm.lastY)
      vm.ctx.lineTo(e.offsetX, e.offsetY)

      if (vm.currentTool === 'brush') {
        vm.isBrush = true
        vm.ctx.strokeStyle = vm.currentColor
      } else {
        vm.isBrush = false
        vm.ctx.strokeStyle = '#e8e8e8'
      }
      vm.ctx.lineWidth = vm.lineWidth
      vm.ctx.lineJoin = 'round'
      vm.ctx.lineCap = 'round'
      vm.ctx.stroke()

      vm.lastX = e.offsetX
      vm.lastY = e.offsetY
    },
    mouseMove(e) {
      let vm = this
      if (!vm.isDrawing) return
      vm.draw(e)
    },
    mouseDown(e) {
      let vm = this
      vm.isDrawing = true
      vm.lastX = e.offsetX
      vm.lastY = e.offsetY
    },
    undo() {
      let vm = this
      if (vm.step > 0) {
        vm.step--
        let canvasPic = new Image()
        canvasPic.src = vm.canvasArray[vm.step]
        canvasPic.onload = () => {
          vm.ctx.drawImage(canvasPic, 0, 0)
        }
      }
      console.log('undo step', vm.step + ":" + ' length', vm.canvasArray.length)
    },
    redo() {
      let vm = this
      if (vm.step < vm.canvasArray.length - 1) {
        vm.step++;
        let canvasPic = new Image();
        canvasPic.src = vm.canvasArray[vm.step];
        canvasPic.onload = function () { vm.ctx.drawImage(canvasPic, 0, 0); }
        console.log('redo step', vm.step + ":" + ' length', vm.canvasArray.length)
      }
    },
    mouseUp(e) {
      let vm = this
      vm.isDrawing = false
      vm.pushCanvas()
      console.log('mouseDown step', vm.step + ":" + ' length', vm.canvasArray.length)
    },
    mouseLeave() {
      let vm = this
      vm.isDrawing = false
    },
    cursorMove(e) {
      let vm = this
      let style
      if (vm.currentTool === 'brush') {
        style = `width:${vm.lineWidth}px;height:${vm.lineWidth}px; background-color:${vm.currentColor};`
      } else {
        style = `width:${vm.lineWidth}px;height:${vm.lineWidth}px;border:1px solid #bababa;`
      }
      if (vm.isToggle === false) {
        vm.cursor = `top:${e.offsetY - vm.lineWidth / 2 + 80}px;left:${e.offsetX - vm.lineWidth / 2}px;${style}`
      } else {
        vm.cursor = `top:${e.offsetY - vm.lineWidth / 2}px;left:${e.offsetX - vm.lineWidth / 2}px;${style}`
      }
    },
    saveCanvas() {
      let vm = this
      let data = vm.canvasArray[vm.step]
      vm.url = data
    }
  },
}).$mount('#app')

