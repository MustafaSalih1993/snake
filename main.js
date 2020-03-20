const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.style.backgroundColor = '#1b1b1b'

const scale = 12
let w = canvas.width = scale * 50
let h = canvas.height = scale * 40

function createNewFoodLocation() {
  return {
    x: Math.floor(Math.random() * ((canvas.width - scale) / scale)) * scale,
    y: Math.floor(Math.random() * ((canvas.height - scale) / scale)) * scale
  }
}
let food = this.createNewFoodLocation()
class Snake {
  constructor() {
    this.length = [{
      x: w / 2,
      y: h / 2
    }]
    this.head = this.length[0]
    this.nx = 1 * scale
    this.ny = 0
  }
  distance(x1, y1, x2, y2) {
    let a = x2 - x1
    let b = y2 - y1
    a *= a
    b *= b
    if (Math.sqrt(a + b) == 0) {
      return true
    } else {
      return false
    }
  }
  drawFood(food) {
    ctx.beginPath()
    ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},.5)`
    ctx.fillRect(food.x, food.y, scale - 2, scale - 2)
    ctx.closePath()
  }
  drawSnake() {
    this.length.forEach(block => {
      ctx.beginPath()
      ctx.fillStyle = 'rgba(0,255,255,.5)'
      ctx.fillRect(block.x, block.y, scale - 2, scale - 2)
      ctx.closePath()
    })
  }
  dir(x, y) {
    this.nx = x
    this.ny = y
  }
  grow() {
    this.length.push({})
  }
  checkEnd() {
    let head = this.length[0]
    for (let i = 1; i < this.length.length; i++) {
      if (head.x === this.length[i].x && head.y === this.length[i].y) {
        this.gameOver()
      }
    }
  }
  gameOver() {
    setTimeout(() => {
      canvas.style.backgroundColor = '#1b1b1b'
    }, 400)
    canvas.style.backgroundColor = '#af0f0f'
    this.length = [{
      x: w / 2,
      y: h / 2
    }]
    this.head = this.length[0]
    this.nx = 1 * scale
    this.ny = 0
  }
  update() {
    this.drawFood(food)
    this.head.x += this.nx
    this.head.y += this.ny
    this.checkEnd()
    if (this.length.length == 1) {
      this.grow()
      this.grow()
    }
    if (this.length.length > 0) {
      for (let i = this.length.length - 1; i > 0; i--) {
        this.length[i].x = this.length[i - 1].x
        this.length[i].y = this.length[i - 1].y
      }
    }
    if (this.distance(this.head.x, this.head.y, food.x, food.y)) {
      food = createNewFoodLocation()
      this.drawFood(food)
      this.grow()
    }
    if (this.head.x > canvas.width - scale || this.head.x < 0 || this.head.y > canvas.height - scale || this.head.y < 0) {
      this.gameOver()
    }
    this.drawSnake()
  }
}
//#region 
const snake = new Snake()
let fps = 10
let now
let then = Date.now()
let interval = 1000 / fps
let delta
document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowUp' || e.key == 'w') {
    snake.dir(0, -1 * scale)
  }
  if (e.key == 'ArrowDown' || e.key == 's') {
    snake.dir(0, 1 * scale)
  }
  if (e.key == 'ArrowLeft' || e.key == 'a') {
    snake.dir(-1 * scale, 0)
  }
  if (e.key == 'ArrowRight' || e.key == 'd') {
    snake.dir(1 * scale, 0)
  }
})

function animate() {
  requestAnimationFrame(animate)
  now = Date.now()
  delta = now - then
  if (delta > interval) {
    then = now - (delta % interval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snake.update()
  }
}
animate()
//#endregion