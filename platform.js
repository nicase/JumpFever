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
        this.h = 30
        this.walls = [new Walls(), ]
    }

    show() {
        d.rectangle(this.x, )
    }

}

