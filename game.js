class Game {
    constructor(seed, others) {
        this.me = new Player()
        this.seed = seed
        this.others = others
        this.players = []
        this.platforms = []
    }

    start() {
        this.generateWalls()
        for (let i = 0; i < this.others.length; ++i) {
            this.players.push(new Player(this.others[i]))
        }
    }

    checkKeys() {
        // Up
        if (keys[38]) {
            this.me.jump()
        }
        // Left
        if (keys[37]) {
            this.me.moveLeft()
        }
        // Right
        if (keys[39]) {
            this.me.moveRight()
        }
    }

    update() {
        this.checkKeys()
        d.clearAll()
        this.checkCollisions()
        this.me.update()
        for (let i = 0; i < this.players.length; ++i) {
            let p = this.players[i]
            p.update_other()
        }
        
    }

    generateWalls() {
        this.platforms = []

    }

    checkCollisions() {
        // Comprovar collisions de me
        //this.me.isGrounded = true | false
        

    }

}

g = new Game(4545, [1])
g.start()

keys = {}
onkeydown = onkeyup = function(e){
    e = e || event
    keys[e.keyCode] = e.type == 'keydown'
}

function updateAll() {
    g.update()
}

const d = new drawTool("mycanvas")
d.translate(0, d.height)
d.setInterval(g.update(), 10)
