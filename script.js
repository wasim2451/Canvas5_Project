const canvas = document.getElementById('canvas-id');
// Set height and width
canvas.height = 400;
canvas.width = 600;
const canvasHeight = canvas.height;

// Define the Global variables of Random colors
let red, blue, green, circleColor;

// Define the coordinates of the Circle
let circleX = 100;
let circleY = canvasHeight / 2;

// Define the coordinates of the Arrow
let imgX = circleX + 400;
let imgY = circleY - 25;


//Define variables for Animation
const speed = 2;
let animationId;

// Declare the Arrow image
const img = new Image();
img.src = './arrow.png';
img.onload = () => {
    imageLoader();
};

if (canvas.getContext) {
    const context = canvas.getContext('2d');

    // Store the circle color initially
    let storedCircleColor = RandomColor(); // Blue , Green 

    function RandomColor() {
        red = Math.floor(Math.random() * 255);
        blue = Math.floor(Math.random() * 255);
        green = Math.floor(Math.random() * 255);
        return `rgb(${red},${blue},${green})`;
    }

    function drawCircle() {
        context.fillStyle = storedCircleColor;
        context.lineWidth = 3;
        context.beginPath();
        context.arc(circleX, circleY, 50, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();
        context.fill();
    }

    function imageLoader() {
        context.drawImage(img, imgX, imgY, 50, 50);
    }

    function animate() {
        // Animatioon Code
        context.clearRect(0, 0, canvas.width, canvas.height);
        imgX = imgX - speed; // Decreasing the value of image position at every frame.

        if (imgX <= (circleX + 53)) {
            //💡Tried using imgX<=circleX but in that case the arrow was going inside the circle so added plus 50 to make the arrow stop on the boundary of the circle.
            //50 is the radius of the circle so +50 and line width is 3 so +3. Total circleX+53.

            stopAnimation(animationId);

            //new circle color when arrow hits
            storedCircleColor = RandomColor();

            // Redraw circle with new color
            drawCircle();

            //Re draw the arrow with new position of imgX
            imageLoader();

            // To stop furthur program execution
            return; 

        }
        // Else part ...
        // Draw the circle in each frame
        drawCircle();

        // Draw the Arrow Image in each frame
        imageLoader();
        animationId = requestAnimationFrame(animate);

    }

    // Function to stop animation
    function stopAnimation(animationId) {
        cancelAnimationFrame(animationId);
    }

    // Draw initial elements
    drawCircle();
    imageLoader();

    // Reset button logic
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        //Resetting the arrow position
        imgX = circleX + 400;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        //new circle color
        storedCircleColor = RandomColor();

        // Redraw circle with new color
        drawCircle();

        // Redraw arrow
        imageLoader();

        //Stop the animation
        stopAnimation(animationId);

        //Enabling the HitButton on reset 
        hitButton.disabled=false;
    });

    //Hit button Logic
    const hitButton = document.getElementById('hit');
    hitButton.addEventListener('click', () => {
        //Start animation
        animate();
        
        //Disabling the hit button
        hitButton.disabled=true;
    })
}
