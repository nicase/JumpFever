class Player{

    constructor(id) {

        if (id) this.id = id;
        this.posX = 0.0;
        this.posY = 0.0;
        this.accX = 0.0;
        this.accY = 0.0;
        this.velX = 0.0;
        this.velY = 0.0;

        
        this.isGrounded = true;

        this.w = 25;
        this.h = 40;
        this.ty = this.posY - this.h/4; //top y
        this.lx = this.posX - this.w/2; //left x
        this.by = this.posY + 3*this.h/4 //bot y
        this.rx = this.posX + this.w/2 //right x


        this.gravity = 0.05;
        // [0] TOP LEFT - RIGHT [1] TOP RIGHT - BOT [2] BOT RIGHT - LEFT [3] BOT RIGHT - TOP
        this.walls = [new Wall(this.lx, this.ty, this.rx, this.ty), new Wall(this.rx, this.ty, this.rx, this.by),
            new Wall(this.rx, this.by, this.lx, this.by), new Wall(this.lx, this.by, this.lx, this.ty)]
    }
    
    show() {
        const d = new drawTool("mycanvas");
        d.translate(0, d.height);
        //console.log("show")
        //console.log(this.posX)
        d.rectangle(this.posX, this.posY, this.w, this.h/2, {color: "#FCD0B4"});
        d.rectangle(this.posX,this.posY + this.h/2, this.w, this.h/2, {color: "#FF0202"})

        d.rectangle(this.posX - 5, this.posY - 1, 4, 4);
        d.rectangle(this.posX + 5, this.posY - 1, 4, 4);
        //d.rectangle()
    }

    jump() {
        if (this.isGrounded) {
            this.accY -= 0.8    ;
            this.isGrounded = false;
        }
    }

    moveRight() {
        this.velX += 0.6;
        
    }

    moveLeft() {
        this.velX -= 0.6;
    }

    isCollision(platform) {

        for (let i = 0; i < this.walls.length; ++i) {
            if (platform.isCollision(this.walls[i])) return true;
        }
        return false;
    }


    update() {
        //if (!this.isCollision()) this.accY -= 1.0;

        if (this.velX > 0) this.velX -= 0.2;
        if (this.velX < 0) this.velX += 0.2;
        
        this.velX += this.accX;
        this.posX += this.velX;
        this.velY += this.accY;
        this.posY += this.velY;

        if (!this.isGrounded) this.accY += this.gravity;
        if (this.posY >= 0) {
            this.velY = 0
            this.posY = 0
            this.accY = 0
            this.isGrounded = true;
        }

        console.log(this.posX);
        this.show();
    }

    update_other() {
        //demano pos a pau i faig show
    }


}
