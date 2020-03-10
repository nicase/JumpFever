const d = new drawTool("mycanvas")

class Game {
    constructor(seed) {
        this.me = new Player()
        this.seed = seed
        
        // Control de tecles
        
    }

    start() {
        this.generateWalls()

        d.setInterval(updateAll, 10)
    }

    checkKeys() {
        // Up
        if (keys[38]) {
            this.me.jump()
            console.log("jump")
        }
        // Left
        if (keys[37]) {
            this.me.moveLeft()
            console.log("left")
        }
        // Right
        if (keys[39]) {
            this.me.moveRight()
            console.log("right")
        }
    }

    update() {
        this.checkKeys()
        d.clearAll()
        this.me.show()
        // for (let i = 0; i < this.n; ++i) {
        //     let p = this.players[i]
        //     p.update()
        //     this.checkCollisions(p)
        // }
        
    }

    generateWalls() {

    }

    checkCollisions(p) {
        // TODO:
    }

}

g = new Game(4545)
g.start()

keys = {}
onkeydown = onkeyup = function(e){
    e = e || event
    keys[e.keyCode] = e.type == 'keydown'
}

function updateAll() {
    g.update()
}