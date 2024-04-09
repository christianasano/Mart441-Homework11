class GameObject {
    constructor(x, y, width, height, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(dx, dy) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (newX >= 0 && newX + this.width <= this.canvasWidth) {
            this.x = newX;
        }

        if (newY >= 0 && newY + this.height <= this.canvasHeight) {
            this.y = newY;
        }
    }

    checkCollision(otherObject) {
        return (
            this.x < otherObject.x + otherObject.width &&
            this.x + this.width > otherObject.x &&
            this.y < otherObject.y + otherObject.height &&
            this.y + this.height > otherObject.y
        );
    }
}

class UserControlledObject extends GameObject {
    constructor(x, y, width, height, canvasWidth, canvasHeight) {
        super(x, y, width, height, canvasWidth, canvasHeight);
    }

    handleInput(keys) {
        if (keys.ArrowUp) {
            this.move(0, -5);
        }
        if (keys.ArrowDown) {
            this.move(0, 5);
        }
        if (keys.ArrowLeft) {
            this.move(-5, 0);
        }
        if (keys.ArrowRight) {
            this.move(5, 0);
        }
    }
}

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const userObject = new UserControlledObject(50, 50, 30, 30, canvasWidth, canvasHeight);
const autonomousObject = new GameObject(200, 200, 40, 40, canvasWidth, canvasHeight);

document.addEventListener('keydown', (e) => {
    const keys = {
        ArrowUp: e.key === 'ArrowUp',
        ArrowDown: e.key === 'ArrowDown',
        ArrowLeft: e.key === 'ArrowLeft',
        ArrowRight: e.key === 'ArrowRight'
    };
    userObject.handleInput(keys);
});

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw user-controlled object
    ctx.fillStyle = 'blue';
    userObject.draw(ctx);

    // Draw autonomous object
    ctx.fillStyle = 'green';
    autonomousObject.draw(ctx);

    // Collision detection
    if (userObject.checkCollision(autonomousObject)) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight); // Change background color
        userObject.width -= 5; // Decrease object size
        autonomousObject.width -= 5;
    }

    requestAnimationFrame(draw);
}

draw();
