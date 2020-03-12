class Player{

    constructor(id) {

        if (id) this.id = id;
        
        this.w = 25;
        this.h = 40;

        this.posX = 0.0 + this.w/2;
        let canv = new drawTool("mycanvas")
        this.offset =  - 3*this.h/4 + canv.height - 20;
        this.posY = 0.0 + this.offset;
        this.offset2 = 3*this.h/4;
        this.accX = 0.0;
        this.accY = 0.0;
        this.velX = 0.0;
        this.velY = 0.0;

        this.lastCollision;
        this.afterJump = false;
        this.justJumped = false;
        this.jumpcontrol = 0;

        this.collisionTOP = false;
        this.collisionRIGHT = false;
        this.collisionLEFT = false;
        this.isGrounded = true;

        this.ty = this.posY - this.h/4; //top y
        this.lx = this.posX - this.w/2; //left x
        this.by = this.posY + 3*this.h/4 //bot y
        this.rx = this.posX + this.w/2 //right x


        this.gravity = 0.005;
        // [0] EXTRA [1] BOT RIGHT - LEFT [2] TOP LEFT - RIGHT [3] TOP RIGHT - BOT  [4] BOT LEFT - TOP
        this.walls = [ new Wall(this.posX, this.posY, this.posX, this.by + 5 ), new Wall(this.rx, this.by, this.lx, this.by), 
            new Wall(this.lx, this.ty, this.rx, this.ty), new Wall(this.rx, this.ty + 5, this.rx, this.by - 5) 
            ,new Wall(this.lx, this.by - 5, this.lx, this.ty + 5)]
    }
    
    show() {
        const dt = new drawTool("mycanvas");
        //console.log("show")
        //console.log(this.posX)
        //console.log("show " + this.posX + " " + this.posY) 
        dt.rectangle(this.posX, this.posY, this.w, this.h/2, {color: "#FCD0B4"});
        dt.rectangle(this.posX,this.posY + this.h/2, this.w, this.h/2, {color: "#FF0202"})

        dt.rectangle(this.posX - 5, this.posY - 1, 4, 4);
        dt.rectangle(this.posX + 5, this.posY - 1, 4, 4);
    }

    jump() {
        if (this.isGrounded) {
            this.afterJump = true;
            this.accY -= 0.1;
            this.isGrounded = false;
            this.justJumped = true;
        }
    }

    moveRight() {
        this.velX += 0.6;
        
    }

    moveLeft() {
        this.velX -= 0.6;
    }

    // i == 0 -> PEUS, i == 1 -> CAP, i == 2 -> COSTAT DRET, i == 3 -> COSTAT ESQUERRA

    isCollision(platform) {

        for (let i = 0; i < this.walls.length; ++i) {
            let topy = platform.isCollision(this.walls[i]);
            if (topy != undefined) {
                console.log(i);
                this.collisionLEFT = this.collisionRIGHT  = this.collisionTOP = this.isGrounded = false;
                if (i == 0) {
                    this.isGrounded = true;
                    this.lastCollision = topy;
                    //this.afterJump = true;
                    //console.log(this.lastCollision)
                } 
                else if (i == 1) this.isGrounded = true;
                else if (i == 2) this.collisionTOP = true;
                else if (i == 3) this.collisionRIGHT = true;
                else if (i == 4) this.collisionLEFT = true;
                return true;
            }
        }
        return false;
    }

    updateWalls() {

        this.ty = this.posY - this.h/4; //top y
        this.lx = this.posX - this.w/2; //left x
        this.by = this.posY + 3*this.h/4 //bot y
        this.rx = this.posX + this.w/2 //right x

        // [0] EXTRA [1] TOP LEFT - RIGHT [2] TOP RIGHT - BOT [3] BOT RIGHT - LEFT [4] BOT RIGHT - TOP

        this.walls = [new Wall(this.posX, this.posY, this.posX, this.by + 15), new Wall(this.rx, this.by, this.lx, this.by), new Wall(this.lx, this.ty, this.rx, this.ty), 
            new Wall(this.rx, this.ty + 5, this.rx, this.by - 5) , new Wall(this.lx, this.by - 5, this.lx, this.ty + 5)]
    }

    update() {
        // if (!this.isCollision()) this.accY -= 1.0;

        //console.log(this.isGrounded);
        if (this.velX > 0) this.velX -= 0.2;
        if (this.velX < 0) this.velX += 0.2;
        if (Math.abs(this.velX) <= 0.2) this.velX = 0;
        
        this.velX += this.accX;
        this.posX += this.velX;
        this.velY += this.accY;
        this.posY += this.velY;

        for (let h = 0; h < this.walls.length; ++h) {
            this.walls[h].show();
        }
        if (!this.isGrounded) this.accY += this.gravity;
        if (this.justJumped) {
            this.jumpcontrol++;
        }
        else {
            if (this.isGrounded) {
                if (this.afterJump) {
                    this.posY = this.lastCollision - this.offset2;
                    this.afterJump = false;
                }
                this.velY = 0;
                this.accY = 0;
            }
        }
        if (this.jumpcontrol == 3) {
            this.justJumped = false
            this.jumpcontrol = 0;
        }
        

        this.updateWalls()

        this.show();
    }

    update_other() {
        //demano pos a pau i faig show
    }


}
