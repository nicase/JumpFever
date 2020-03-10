class Player{

    constructor() {

        this.posX = 0.0;
        this.posy = 0.0;
        this.accX = 0.0;
        this.accY = 0.0;
        this.velX = 0.0;
        this.velY = 0.0;
    }
    
    show() {
        d.rectangle(250,250,5,8);
    }

    jump() {
        this.accY = 10.0;
    }

    moveRight() {
        this.velX += 1.0;
    }

    moveLeft() {
        this.velX -= 1.0;
    }

    isCollision() {

    }

}