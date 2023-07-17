document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("confetti");
    var ctx = canvas.getContext("2d");
  
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    var pieces = [];
    var numPieces = 100;
    var animationRunning = true;
  
    // Create confetti pieces
    for (var i = 0; i < numPieces; i++) {
      pieces.push(new Piece(canvas));
    }
  
    function Piece(canvas) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 10 + 5;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 6 - 3;
  
      this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
  
        if (this.x + this.radius < 0) {
          this.x = canvas.width + this.radius;
        }
        if (this.x - this.radius > canvas.width) {
          this.x = -this.radius;
        }
        if (this.y + this.radius < 0) {
          this.y = canvas.height + this.radius;
        }
        if (this.y - this.radius > canvas.height) {
          this.y = -this.radius;
        }
  
        this.draw();
      };
  
      this.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle =
          "rgba(" +
          Math.floor(Math.random() * 255) +
          "," +
          Math.floor(Math.random() * 255) +
          "," +
          Math.floor(Math.random() * 255) +
          ", 0.8)";
        ctx.fillRect(
          -this.radius,
          -this.radius,
          this.radius * 2,
          this.radius * 2
        );
        ctx.restore();
      };
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (var i = 0; i < numPieces; i++) {
        pieces[i].update();
      }
  
      if (animationRunning) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  
    animate();
  
    // Detener la animación después de 5 segundos
    setTimeout(function() {
      animationRunning = false;
      canvas.style.display = "none";
    }, 3000);
  });
  