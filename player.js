class Player{

    constructor(id) {

        if (id) this.id = id;
        
        this.w = 25;
        this.h = 25;
        this.anim = 0
        this.animY = 0

        this.posX = 0.0 + this.w/2;
        let canv = new drawTool("mycanvas")
        this.offset =  - this.h/2 + canv.height - 20;
        this.posY = 0.0 + this.offset;
        this.offset2 = this.h/2;
        this.velX = 0.0;
        this.velY = 0.0;

        this.platformCollision;
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

        // Movement parameters
        this.speedX = 2.5;
        this.speedY = 4; 
        this.gravity = 0.07;
        
        // [0] baix [1] cap [2] dreta [3] esquerra
        this.walls = [new Wall(this.rx, this.by, this.lx, this.by), new Wall(this.lx, this.ty, this.rx, this.ty), 
                     new Wall(this.rx, this.ty, this.rx, this.by), new Wall(this.lx, this.by, this.lx, this.ty)]
    }
    
    show() {
        const dt = new drawTool("mycanvas");
        //console.log("show")
        //console.log(this.posX)
        dt.rectangle(this.posX, this.posY, this.w, this.h, {color: "#FCD0B4"});

        dt.rectangle(this.posX - 5 + this.anim, this.posY - 1 + this.animY, 4, 4);
        dt.rectangle(this.posX + 5 + this.anim, this.posY - 1 + this.animY, 4, 4);
        this.anim = 0;
        this.animY = 0;
    }

    jump() {

        let bopLeftRight = (this.collisionRIGHT && this.collisionLEFT) || 
        (!this.collisionLEFT && !this.collisionRIGHT);

        if (this.isGrounded && bopLeftRight) {
            this.afterJump = true;
            this.velY -= this.speedY;
            this.isGrounded = false;
            this.justJumped = true;
        }
        this.animY = -4;
    }

    moveRight() {
        this.velX = this.speedX;
        this.anim = 4;
    }

    moveLeft() {
        this.velX = -this.speedX;
        this.anim = -4
    }

        // [0] baix [1] cap [2] dreta [3] esquerra

    isCollision(platform) {
        
        this.collisionLEFT = this.collisionRIGHT  = this.collisionTOP = this.isGrounded = false; 
        let trobat = false; 
        for (let i = 0; i < this.walls.length; ++i) {
            if (platform.isInside(this.walls[i])) {
                trobat = true;
                this.platformCollision = platform;
                console.log(i);
                if (i == 0) {
                    this.isGrounded = true;
                    //this.afterJump = true;
                    //console.log(this.lastCollision)
                } 
                else if (i == 1) this.collisionTOP = true;  
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
        let ofs = 2
        this.walls = [
            new Wall(this.rx - ofs, this.by, this.lx + ofs, this.by), 
            new Wall(this.lx + ofs, this.ty, this.rx - ofs, this.ty), 
            new Wall(this.rx, this.ty + ofs, this.rx, this.by - ofs), 
            new Wall(this.lx, this.by - ofs, this.lx, this.ty + ofs)
        ]
    }

    update() {
        if (this.velX > 0) this.velX -= 0.1;
        if (this.velX < 0) this.velX += 0.1;
        if (Math.abs(this.velX) <= 0.1) this.velX = 0;
        
        // Botom right
        if (this.isGrounded && this.collisionRIGHT && !this.collisionLEFT) {
            // Enough to be up
            if (this.posY + 2*this.h/5 <= this.platformCollision.y2) {
                this.posY = this.platformCollision.y2 - this.h/2 - 1;
                this.velY = 0;
            }
            else {
                this.posX = this.platformCollision.x2 - this.w/2;
                this.velX = 0;
            }
        }

        // Botom left
        else if (this.isGrounded && this.collisionLEFT && !this.collisionRIGHT) {
            // Enough to be up
            if (this.posY + 2*this.h/5 <= this.platformCollision.y2) {
                this.posY = this.platformCollision.y2 - this.h/2 - 1;
                this.velY = 0;
            }
            else {
                this.posX = this.platformCollision.x1 + this.w/2;
                this.velX = 0;
            }
        }

        // Top right
        else if (this.collisionTOP && this.collisionRIGHT && !this.collisionLEFT) {
            // Enough to be up
            if (this.posY - 2*this.h/5 <= this.platformCollision.y1) {
                this.posX = this.platformCollision.x2 - this.w/2;
                this.velX = 0;
            }
            else {
                this.posY = this.platformCollision.y1 + this.h/2 + 1;
                // this.velY = 0;
            }
        }

        // Top left
        else if (this.collisionTOP && !this.collisionRIGHT && this.collisionLEFT) {
            // Enough to be up
            if (this.posY - 2*this.h/5 <= this.platformCollision.y1) {
                this.posX = this.platformCollision.x1 + this.w/2;
                this.velX = 0;
            }
            else {
                this.posY = this.platformCollision.y1 + this.h/2 + 1;
                // this.velY = 0;
            }
        }
        let leftRight = (this.collisionRIGHT && this.collisionLEFT) || 
        (!this.collisionLEFT && !this.collisionRIGHT);

        if (this.collisionTOP && leftRight) {
            this.velY = 0;
            this.posY = this.platformCollision.y1 + this.h/2 + 3;
        }
        
        this.posX += this.velX;
        this.posY += this.velY;
        
        // Mirem limits parets
        if (this.posX - this.w/2 <= 0) {
            this.posX = this.w/2 + 1; // posem 1 de offset per assegurar-nos que va bé
            this.velX = 0;
            this.accX = 0;
        }

        else if (this.posX + this.w/2 >= d.width) {
            this.posX = d.width - this.w/2 - 1;// posem 1 de offset per assegurar-nos que va b;
            this.velX = 0;
            this.accX = 0;
        }
        
        this.updateWalls()

        // for (let h = 0; h < this.walls.length; ++h) {
        //     this.walls[h].show();
        // }

        if (!this.isGrounded) this.velY += this.gravity;

        if (this.isGrounded && leftRight) {
            this.posY = this.platformCollision.y2 - this.h/2
            this.velY = 0
        }

        this.show();
    }

    update_other() {
        //demano pos a pau i faig show
    }


}
