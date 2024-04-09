const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const userObject = new UserControlledObject(50, 50, 30, 30);
const autonomousObject = new GameObject(200, 200, 40, 40);

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw user-controlled object
    ctx.fillStyle = 'blue';
    userObject.draw(ctx);

    // Draw autonomous object
    ctx.fillStyle = 'green';
    autonomousObject.draw(ctx);

    // Collision detection
    if (userObject.checkCollision(autonomousObject)) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Change background color
        userObject.width -= 5; // Decrease object size
        autonomousObject.width -= 5;
    }

    requestAnimationFrame(draw);
}

draw();
