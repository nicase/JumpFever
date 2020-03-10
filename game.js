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
        
        for (let i = 0; i < this.n; ++i) {
            let p = this.players[i]
            p.update()
            this.checkCollisions(p)
        }
        
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