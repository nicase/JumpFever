class Player{

    constructor(id) {

        if (id) this.id = id;
        
        this.w = 25;
        this.h = 25;

        this.posX = 0.0 + this.w/2;
        let canv = new drawTool("mycanvas")
        this.offset =  - this.h/2 + canv.height - 20;
        this.posY = 0.0 + this.offset;
        this.offset2 = this.h/2;
        this.accX = 0.0;
        this.accY = 0.0;
        this.velX = 0.0;
        this.velY = 0.0;

        this.lastCollision;
        this.afterJump = false;
        this.justJumped = false;
        this.jumpcontrol = 0;

        this.topCollisionControl = 0;
        this.justHitTop = false;

        this.collisionTOP = false;
        this.collisionRIGHT = false;
        this.collisionLEFT = false;
        this.isGrounded = true;

        this.ty = this.posY - this.h/2; //top y
        this.lx = this.posX - this.w/2; //left x
        this.by = this.posY + this.h/2 //bot y
        this.rx = this.posX + this.w/2 //right x


        this.gravity = 0.005;
        // [0] baix [1] cap [2] dreta [3] esquerra
        this.walls = [new Wall(this.rx, this.by, this.lx, this.by), new Wall(this.lx, this.ty, this.rx, this.ty), 
                     new Wall(this.rx, this.ty + 3, this.rx, this.by - 3), new Wall(this.lx, this.by - 3, this.lx, this.ty + 3)]
    }
    
    show() {
        const dt = new drawTool("mycanvas");
        //console.log("show")
        //console.log(this.posX)
        dt.rectangle(this.posX, this.posY, this.w, this.h, {color: "#FCD0B4"});

        // dt.rectangle(this.posX - 5, this.posY - 1, 4, 4);
        // dt.rectangle(this.posX + 5, this.posY - 1, 4, 4);
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

        // [0] baix [1] cap [2] dreta [3] esquerra

    isCollision(platform) {
        
        this.collisionLEFT = this.collisionRIGHT  = this.collisionTOP = this.isGrounded = false; 
        let trobat = false; 
        for (let i = 0; i < this.walls.length; ++i) {
            if (platform.isInside(this.walls[i])) {
                trobat = true;
                let topy = platform.y2;
                this.lastCollision = topy;
                console.log(i);
                if (i == 0) {
                    this.isGrounded = true;
                    //this.afterJump = true;
                    //console.log(this.lastCollision)
                } 
                else if (i == 1) {
                    this.collisionTOP = true;  
                }
                else if (i == 2) this.collisionRIGHT = true;
                else if (i == 3) this.collisionLEFT = true;

            }
        }
        return trobat;
    }

    updateWalls() {

        this.ty = this.posY - this.h/2; //top y
        this.lx = this.posX - this.w/2; //left x
        this.by = this.posY + this.h/2 //bot y
        this.rx = this.posX + this.w/2 //right x

        // [0] baix [1] cap [2] dreta [3] esquerra
        this.walls = [new Wall(this.rx, this.by, this.lx, this.by), new Wall(this.lx, this.ty, this.rx, this.ty), 
            new Wall(this.rx, this.ty + 3, this.rx, this.by - 3), new Wall(this.lx, this.by - 3, this.lx, this.ty + 3)]
    }

    update() {
        if (this.velX > 0) this.velX -= 0.2;
        if (this.velX < 0) this.velX += 0.2;
        if (Math.abs(this.velX) <= 0.2) this.velX = 0;
        

        if (this.collisionTOP) {
            this.collisionTOP = false;
            this.accY = 0;
            this.velY = 0;
        }
        if (this.collisionLEFT) {
            this.collisionLEFT = false;
            this.accX = 0;
            this.velX = 0;
        }

        if (this.collisionRight) {
            this.collisionLEFT = false;
            this.accX = 0;
            this.velX = 0;
        }

        this.velX += this.accX;
        this.posX += this.velX;
        this.velY += this.accY;
        this.posY += this.velY;
        
        this.updateWalls()

        for (let h = 0; h < this.walls.length; ++h) {
            this.walls[h].show();
        }


        if (!this.isGrounded) this.accY += this.gravity;
        /*if (this.justJumped) {
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
        }*/

        if (this.isGrounded) {
            this.posY = this.lastCollision - this.h/2
            this.velY = this.accY = 0
            console.log("corona")
        }


        /*if (this.topCollisionControl == 40) {
            this.justHitTop = false;
            this.topCollisionControl = 0;
        }

        if (this.justHitTop) this.topCollisionControl++;
        
        if (this.collisionTOP && this.topCollisionControl == 0) {
            console.log("hola")
            console.log(this.isGrounded)
            this.justHitTop = true;
            this.posY = this.lastCollision + this.offset2;
            this.velY = 0;
            this.accY = 0;
        }*/

        if (this.collisionTOP) {
            this.accY = 0
            this.velY = 0
        }

        if (this.collisionLEFT || this.collisionRIGHT) {
            this.accX = this.velX = 0   
        }




        this.show();
    }

    update_other() {
        //demano pos a pau i faig show
    }


}
