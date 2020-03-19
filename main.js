const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 400
canvas.height = 400
canvas.style.backgroundColor = '#1b1b1b'

const scale = canvas.width / 20


function createNewFoodLocation() {
  return {
    x: Math.floor(Math.random() * (canvas.width / scale)) * scale,
    y: Math.floor(Math.random() * (canvas.height / scale)) * scale
  }
}
let food = this.createNewFoodLocation()
class Snake {
  constructor() {
    this.length = [{
      x: 0,
      y: 0
    }]
    this.head = this.length[0]
    this.nx = 0
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
    ctx.fillRect(food.x, food.y, scale, scale)
    ctx.closePath()
  }
  drawSnake() {
    this.length.forEach(block => {
      ctx.beginPath()
      ctx.fillStyle = 'rgba(0,255,255,.5)'
      ctx.fillRect(block.x, block.y, scale, scale)
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
  update() {
    this.drawFood(food)
    this.head.x += this.nx
    this.head.y += this.ny
    if (this.length.length > 1) {
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
    if (this.head.x > canvas.width) {
      this.head.x = 0
    } else if (this.head.x < 0) {
      this.head.x = canvas.width - scale
    }
    if (this.head.y > canvas.height) {
      this.head.y = 0
    } else if (this.head.y < 0) {
      this.head.y = canvas.height - scale
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
  if (e.key == 'ArrowUp') {
    snake.dir(0, -1 * scale)
  }
  if (e.key == 'ArrowDown') {
    snake.dir(0, 1 * scale)
  }
  if (e.key == 'ArrowLeft') {
    snake.dir(-1 * scale, 0)
  }
  if (e.key == 'ArrowRight') {
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