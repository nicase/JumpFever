class Wall {
    constructor (x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    contained(dot) {
        if (this.x1 == this.x2 && dot.x != this.x1)
            return false;
        if (this.y1 == this.y2 && dot.y != this.y1) 
            return false;
    
        if (this.x1 > this.x2) {
            if (dot.x > this.x1) return false;
            if (dot.x < this.x2) return false;
        }
        else {
            if (dot.x > this.x2) return false;
            if (dot.x < this.x1) return false;
        }
        if (this.y1 > this.y2) {
            if (dot.y > this.y1) return false;
            if (dot.y < this.y2) return false;
        }
        else {
            if (dot.y > this.y2) return false;
            if (dot.y < this.y1) return false;
        }
        return true;
    }

    intersection(w) {
        let x3 = w.x1;
        let y3 = w.y1;
        let x4 = w.x2;
        let y4 = w.y2;
        let x1 = this.x1;
        let x2 = this.x2;
        let y1 = this.y1;
        let y2 = this.y2;


        let den = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
        if (den == 0) return undefined;

        let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)) / den;
        let u = ((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)) / den;
        
        let dot = {
            x: x1 + t*(x2 - x1),
            y: y1 + t*(y2 - y1)
        }
        if (this.contained(dot) && w.contained(dot)) return dot;
        else return undefined;
    }

    show() {
        const dt = new drawTool("mycanvas");
        dt.line(this.x1,this.y1,this.x2,this.y2, {width: 3})
    }
}

class Platform {
    constructor (x, y, w) {
        this.x = x
        this.y = y
        this.w = w
        this.h = 20
        let x1 = this.x + this.w/2
        let x2 = this.x - this.w/2
        let y1 = this.y + this.h/2
        let y2 = this.y - this.h/2

        this.walls = [new Wall(x1, y1, x2, y1), new Wall(x2, y1, x2, y2),
                      new Wall(x2, y2, x1, y2), new Wall(x1, y2, x1, y1)]
    }

    isCollision(w) {
        for (let i = 0; i < this.walls.length; ++i) {
            //w es els walls del player
            if (this.walls[i].intersection(w) != undefined) {
                return this.walls[i].y1
                /*console.log("platform")
                console.log(this.walls[i])
                console.log("player")
                console.log(w);*/
            }
        }
        return undefined;
    }

    show() {
        let d = new drawTool("mycanvas")
        d.rectangle(this.x, this.y, this.w, this.h, {color: "black"})
    }
}