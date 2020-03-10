class Player{

    constructor() {
        this.posX = 0.0;
        this.posY = 0.0;
        this.accX = 0.0;
        this.accY = 0.0;
        this.velX = 0.0;
        this.velY = 0.0;

        this.w = 25;
        this.h = 40;
    }
    
    show() {
        d.rectangle(this.posX, this.posY, this.w, this.h/2, {color: "#FCD0B4"});
        d.rectangle(this.posX,this.posY + this.h/2, this.w, this.h/2, {color: "#FF0202"})

        d.rectangle(this.posX - 5, this.posY - 1, 4, 4);
        d.rectangle(this.posX + 5, this.posY - 1, 4, 4);
        //d.rectangle()
    }

    jump() {
        this.accY += 10.0;
    }

    moveRight() {
        this.velX += 1.0;
    }

    moveLeft() {
        this.velX -= 1.0;
    }

    isCollision() {

        return true;
    }

    update() {
        if (!this.isCollision) this.accY -= 1.0;
        this.velX += this.accX;
        this.posX += this.velX;
        
        this.velY += this.accY;
        this.posY += this.velY;
    }

}