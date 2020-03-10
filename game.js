const d = new drawTool("mycanvas")

class Game {
    constructor(seed) {
        this.me = new Player()
        this.seed = seed
        
        // Control de tecles
        this.keys = {}
        onkeydown = onkeyup = function(e){
            e = e || event
            this.keys[e.keyCode] = e.type == 'keydown'
        }
    }

    start() {
        for (let i = 0; i < this.n; ++i) {
            this.players.push(new Player(ids[i]))
        }
        this.generateWalls()
        

        d.setInterval(this.update, 10)
    }

    checkKeys() {
        // Up
        if (this.keys[38]) {
            this.me.jump()
        }
        // Left
        if (this.keys[37]) {
            this.me.moveLeft()
        }
        // Right
        if (this.keys[39]) {
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