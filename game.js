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
        var random = (s) => {
            var x = Math.sin(s++) * 10000;
            return x - Math.floor(x);
        }
        this.platforms = []
        this.randomVec = []
        for (let i = 0; i < 50; ++i) 
            this.randomVec.push(random(i)*random(this.seed))
        
        console.log(this.randomVec)

    }

    checkCollisions() {
        // Comprovar collisions de me
        //this.me.isGrounded = true | false

        // for (i = 0; i < this.platforms.length; ++i) {
        //     let p = this.platforms[i]
        //     if (this.me.collides(p)) return true;
        // }
        return false;

    }

}

g = new Game(4545, [1])
g.start()

keys = {}
onkeydown = onkeyup = function(e){
    e = e || event
    keys[e.keyCode] = e.type == 'keydown'
}

const d = new drawTool("mycanvas")
d.setInterval(g.update(), 10)
