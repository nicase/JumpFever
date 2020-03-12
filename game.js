class Game {
    constructor(seed, others) {
        this.me = new Player()
        this.seed = seed
        this.others = others
        this.players = []
        this.platforms = []
        this.platformsVel = 1
        let oneWidth = 150
        let twoWidth = 100
        let threeWidth = 100
        
        this.oneBlock = [ 
            // One block
            [[d.width/10, oneWidth]],
            [[2*d.width/10, oneWidth]],
            [[3*d.width/10, oneWidth]],
            [[4*d.width/10, oneWidth]],
            [[5*d.width/10, oneWidth]],
            [[6*d.width/10, oneWidth]],
            [[7*d.width/10, oneWidth]],
            [[8*d.width/10, oneWidth]],
            [[9*d.width/10, oneWidth]] 
        ]
        
        this.twoBlock = [ 
            // Two blocks
            [[d.width/10, twoWidth], [9*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[5*d.width/10, twoWidth], [5*d.width/10, twoWidth]],
            
            [[d.width/10, twoWidth], [4*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [5*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[5*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[6*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [5*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[5*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [9*d.width/10, twoWidth]]
        ]
        
        this.threeBlock = [ 
            // Three blocks
            [[d.width/10, threeWidth], [5*d.width/10, threeWidth], [9*d.width/10, threeWidth]],
            [[d.width/10, threeWidth], [4*d.width/10, threeWidth], [9*d.width/10, threeWidth]],
            [[d.width/10, threeWidth], [6*d.width/10, threeWidth], [9*d.width/10, threeWidth]],
        ]
    }

    start() {
        this.generatePlatforms()
        for (let i = 0; i < this.others.length; ++i) {
            this.players.push(new Player(this.others[i]))
        }
    }

    update() {
        checkKeys()
        d.clearAll()
        this.drawPlatforms()
        this.checkCollisions()
        this.me.update()
        for (let i = 0; i < this.players.length; ++i) {
            let p = this.players[i]
            p.update_other()
        }
    }

    generatePlatforms() {
        var random = (s) => {
            var x = Math.sin(s++) * 10000
            return x - Math.floor(x)
        }
        // Posem terra inicial
        let gap = 100
        this.platforms = [[new Platform(d.width/2, d.height - gap, d.width)]]

        var neg = (r) => {
            if (r > 0.5) return 1
            else -1
        } 

        for (let i = 0; i < 50; ++i) {
            let randomVal = random(i * this.seed)

            let nPlatforms = Math.floor(randomVal*3)
            
            let type = []
            if (nPlatforms == 0) type = this.oneBlock
            else if (nPlatforms == 1) type = this.twoBlock
            else if (nPlatforms == 2) type = this.threeBlock
            
            let index = Math.floor(type.length * random(i*2*this.seed))
            let level = type[index]
            
            let blocks = []
            for (let x = 0; x < level.length; ++x) {
                blocks.push(new Platform(level[x][0], d.height -gap*i, level[x][1]))
            }

            this.platforms.push(blocks)
        }
        console.log(this.platforms) 
    }


    drawPlatforms() {
        for (let i = 0; i < this.platforms.length; ++i) {
            let level = this.platforms[i]
            for (let j = 0; j < level.length; ++j) {
                let current = level[j]
                current.y += this.platformsVel // Moviment cap aball de les plataformes
                
                for (let x = 0; x < current.walls.length; ++x) {
                    current.walls[x].y1 += this.platformsVel
                    current.walls[x].y2 += this.platformsVel
                }
                
                if (current.y >= 0 && current.y <= d.height + current.h) 
                    current.show()
            }
        }
    }

    checkCollisions() {
        // Comprovar collisions de me
        //this.me.isGrounded = true | false
        //console.log("hola")
        for (let i = 0; i < this.platforms.length; ++i) {
            let p = this.platforms[i]
            if (this.me.isCollision(p)) return;
        }


    }
}

var keys = {}

onkeydown = onkeyup = function(e){
    e = e || event
    keys[e.keyCode] = e.type == 'keydown'
}

function checkKeys() {
    // Up
    if (keys[38]) {
        g.me.jump()
    }
    // Left
    if (keys[37]) {
        g.me.moveLeft()
    }
    // Right
    if (keys[39]) {
        g.me.moveRight()
    }
}

const d = new drawTool("mycanvas")

let g = new Game(2222, [1])
g.start()
var updateAll = () => g.update()

d.setInterval(updateAll, 30)
