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


    update() {
        checkKeys()
        d.clearAll()
        let k = new Platform(d.width/2, d.height/2, 100)
        let j = new Platform(50,d.height - 10,100);
        this.platforms.push(k)
        this.platforms.push(j)
        k.show();
        j.show();
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
        
        //console.log(this.randomVec)

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
        //console.log('hafdb')
        g.me.jump()
    }
    // Left
    if (keys[37]) {
        g.me.moveLeft()
    }
    // Right
    if (keys[39]) {
        //console.log("Right")
        g.me.moveRight()
    }
}

const d = new drawTool("mycanvas")

let g = new Game(4545, [1])
g.start()
var updateAll = () => g.update()

d.setInterval(updateAll, 30)
