window.onload = function() {
    var pont = document.getElementById('pont');
    var guarda = 0;
    var colision = false;
    var gameRunning = false;

    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);

    setInterval(game, 60);

    const vel = 1;

    var vx = vy = 0;
    var px = 10;
    var py = 15;
    var tp = 20;
    var qp = 20;
    var ax = ay = 15;

    var trail = [];
    tail = 5;

    function game() {
        if (!gameRunning){
            return;
        }

        px += vx;
        py += vy;

        if (px < 0) px = qp - 1;
        if (px > qp - 1) px = 0;
        if (py < 0) py = qp - 1;
        if (py > qp - 1) py = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x === px && trail[i].y === py) {
                colision = true;
                vx = vy = 0;
                tail = 5;
            }
        }
        trail.push({ x: px, y: py });
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax === px && ay === py) {
            tail++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
            guarda++;
            pont.innerText = guarda;
        }

        if (colision) {
            window.location.href = "TelaGameOver.html";
            gameRunning = false;
            return;
        }
    }

    function keyPush(event) {
        switch (event.keyCode) {
            case 37: // tecla left
                vx = -vel;
                vy = 0;
                break;
            case 38: // tecla up
                vx = 0;
                vy = -vel;
                break;
            case 39: // tecla right
                vx = vel;
                vy = 0;
                break;
            case 40: // tecla down
                vx = 0;
                vy = vel;
                break;
            default:
                break;
        }

        if (!gameRunning) {
            gameRunning = true; 
        }
    }
}