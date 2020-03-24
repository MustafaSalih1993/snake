//CHECK THE WORKING GAME ON--> https://mustafasalih1993.github.io/snakeGame/
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let current = document.getElementById('current')
let highScore = document.getElementById('score')
highScore.innerText = localStorage.getItem('Highscore') || 0
canvas.style.backgroundColor = '#1b1b1b'

const scale = 20
let w = canvas.width = scale * 30
let h = canvas.height = scale * 30

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
    this.score = 0
    this.colors = ['#EBEFF2', '#253B40', '#A65A2E', '#D9A384', '#002C72', '#2D5EF0', '#01F3FF', '#11C9EB', '#FFE701']
    this.pickColor = this.colors[Math.floor(Math.random() * this.colors.length)]
  }
  changeColor() {
    this.pickColor = this.colors[Math.floor(Math.random() * this.colors.length)]
  }
  checkLength() {
    switch (this.length.length - 1) {
      case 10:
        this.changeColor()
        break;
      case 20:
        this.changeColor()
        break;
      case 30:
        this.changeColor()
        break;
      case 40:
        this.changeColor()
        break;
      case 50:
        this.changeColor()
        break;
      case 60:
        this.changeColor()
        break;
      case 70:
        this.changeColor()
        break;
      case 80:
        this.changeColor()
        break;
      case 90:
        this.changeColor()
        break;
      case 100:
        this.changeColor()
        break;
    }
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
  drawFood() {
    for (let i = 0; i < this.length.length; i++) {
      if (food.x === this.length[i].x && food.y === this.length[i].y) {
        food = createNewFoodLocation()
      }
    }
    ctx.beginPath()
    ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},.5)`
    ctx.fillRect(food.x, food.y, scale - 2, scale - 2)
    ctx.closePath()
  }
  drawBlock = (block) => {
    ctx.beginPath()
    ctx.fillStyle = this.pickColor
    ctx.fillRect(block.x, block.y, scale - 2, scale - 2)
    ctx.closePath()
  }
  drawSnake() {
    this.length.forEach(this.drawBlock)
  }
  dir(x, y) {
    if (x !== -this.nx) {
      this.nx = x
    }
    if (y !== -this.ny) {
      this.ny = y
    }
  }
  grow() {
    let tmp = parseInt(highScore.innerText)
    this.length.push({})
    this.score++
    current.innerText = this.score
    if (tmp < this.score) {
      highScore.innerText = this.score
      localStorage.setItem('Highscore', JSON.stringify(this.score))
    }
    this.checkLength()
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
    this.score = 0
  }
  update() {
    this.drawFood()
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
      this.drawFood()
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