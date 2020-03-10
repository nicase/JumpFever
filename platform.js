class Walls {
    constructor(x1, y1, x2, y2) {
        this.p1 = {x: x1, y:y1}
        this.p2 = {x: x2, y:y2}
    }
}

class Platform {
    constructor (x, y, w) {
        this.x = 0
        this.y = 0
        this.w = w
        this.h = 20
        let x1 = this.x + this.w/2
        let x2 = this.x - this.w/2
        let y1 = this.y + this.h/2
        let y2 = this.y - this.h/2

        this.walls = [new Walls(x1, y1, x2, y1), new Walls(x2, y1, x2, y2),
                      new Walls(x2, y2, x1, y2), new Walls(x1, y2, x1, y1)]
    }

    show() {
        d.rectangle(this.x, this.y, this.w, this.h, {color: "black"})
    }
}

d.translate(d.width/2, d.height/2)
const p = new Platform(0,0, 100)
p.show()