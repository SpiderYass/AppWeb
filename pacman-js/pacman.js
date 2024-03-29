
class Pacman {
    constructor(x ,y ,width ,height, speed, lives) {
        this.x = x;
        this.y = y;
        this.width = oneBlockSize;
        this.height = oneBlockSize;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction;
        this.currentFrame = 1;
        this.frameCount = 7;
        this.lives = 5;
        this.frameDelay = 0;
        this.changeAnimation();
        setInterval(this.changeAnimation.bind(this), 100);
        
    }

    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForwards()
        if(this.checkCollision()) {
            this.moveBackwards();
        }
    }

    

    moveForwards() {
        switch(this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed
                break;
            case DIRECTION_UP:
                this.y -= this.speed
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed
                break;
            case DIRECTION_BOTTOM:
                this.y += this.speed
                break;
        }
    }

    moveBackwards() {
        switch(this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed
                break; 
            case DIRECTION_UP:
                this.y += this.speed
                break;
            case DIRECTION_LEFT:
                this.x += this.speed
                break;
            case DIRECTION_BOTTOM:
                this.y -= this.speed
                break;
        }
    }


    checkCollision () {
        if(
            map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1 || 
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
        ) {
           return true; 
        }
        return false;
    }

    checkGhostCollision () {
        // fonction qui vérifie si pacman est en collision avec un fantome
    }

    changeDirectionIfPossible() {
        // fontion qui change la direction si il n'y a pas de collision
        if (this.direction == this.nextDirection) {
            return;
        }
        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards();
        if(this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
    }
    
    changeAnimation() {
        this.frameDelay++;
        if (this.frameDelay >= 1) { 
            this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
            this.frameDelay = 0;
        }
    }
    

    draw() {
        canvasContext.save();
        canvasContext.translate(this.x + oneBlockSize / 2, this.y + oneBlockSize / 2);
        canvasContext.rotate(this.direction * 90 * Math.PI / 180);
        canvasContext.translate(-oneBlockSize / 2, -oneBlockSize / 2);
        canvasContext.drawImage(pacmanFrames, (this.currentFrame - 1) * oneBlockSize*0.67, 0, oneBlockSize*0.65, oneBlockSize*0.65, 0, 0, oneBlockSize, oneBlockSize);
        canvasContext.restore();
    }

    getMapX() {
        return parseInt(this.x / oneBlockSize);
    }

    getMapY() {
        return parseInt(this.y / oneBlockSize);
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.99 * oneBlockSize) / oneBlockSize);
    }
    
    getMapYRightSide() {
        return parseInt((this.y + 0.99 * oneBlockSize) / oneBlockSize);
    }
}