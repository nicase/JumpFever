const d = new drawTool("mycanvas")

class Game {
    constructor(n, ids, seed) {
        this.me
        this.ids = ids
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
}

g = new Game(2, [1,2], 4545)
g.start()