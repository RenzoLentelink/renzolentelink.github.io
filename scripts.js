const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const gift = document.getElementById('gift');
const obstacle = document.getElementById('obstacle');
const message = document.getElementById('message');
const startButton = document.getElementById('startButton');

let score = 0;
let gameInterval;

function startGame() {
    score = 0;
    message.textContent = "Work together to collect gifts!";
    resetPositions();
    gameInterval = setInterval(moveGift, 2000);
}

function resetPositions() {
    player1.style.left = '50px';
    player1.style.top = '50px';
    player2.style.left = '100px';
    player2.style.top = '50px';
    placeGift();
    placeObstacle();
}

function placeGift() {
    gift.style.left = Math.random() * (580 - 20) + 'px';
    gift.style.top = Math.random() * (380 - 20) + 'px';
}

function placeObstacle() {
    obstacle.style.left = Math.random() * (580 - 50) + 'px';
    obstacle.style.top = Math.random() * (380 - 50) + 'px';
}

function moveGift() {
    placeGift();
}

function collectGift(player) {
    const giftRect = gift.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
        playerRect.x < giftRect.x + giftRect.width &&
        playerRect.x + playerRect.width > giftRect.x &&
        playerRect.y < giftRect.y + giftRect.height &&
        playerRect.y + playerRect.height > giftRect.y
    ) {
        score++;
        message.textContent = `Great job! Score: ${score}`;
        placeGift();
    }
}

function checkCollision() {
    const player1Rect = player1.getBoundingClientRect();
    const player2Rect = player2.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        (player1Rect.x < obstacleRect.x + obstacleRect.width &&
            player1Rect.x + player1Rect.width > obstacleRect.x &&
            player1Rect.y < obstacleRect.y + obstacleRect.height &&
            player1Rect.y + player1Rect.height > obstacleRect.y) ||
        (player2Rect.x < obstacleRect.x + obstacleRect.width &&
            player2Rect.x + player2Rect.width > obstacleRect.x &&
            player2Rect.y < obstacleRect.y + obstacleRect.height &&
            player2Rect.y + player2Rect.height > obstacleRect.y)
    ) {
        clearInterval(gameInterval);
        message.textContent = "Oh no! You hit an obstacle. Game over!";
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player1.style.top = Math.max(0, player1.offsetTop - 10) + 'px';
            collectGift(player1);
            checkCollision();
            break;
        case 'ArrowDown':
            player1.style.top = Math.min(370, player1.offsetTop + 10) + 'px';
            collectGift(player1);
            checkCollision();
            break;
        case 'ArrowLeft':
            player1.style.left = Math.max(0, player1.offsetLeft - 10) + 'px';
            collectGift(player1);
            checkCollision();
            break;
        case 'ArrowRight':
            player1.style.left = Math.min(570, player1.offsetLeft + 10) + 'px';
            collectGift(player1);
            checkCollision();
            break;
        case 'w':
            player2.style.top = Math.max(0, player2.offsetTop - 10) + 'px';
            collectGift(player2);
            checkCollision();
            break;
        case 's':
            player2.style.top = Math.min(370, player2.offsetTop + 10) + 'px';
            collectGift(player2);
            checkCollision();
            break;
        case 'a':
            player2.style.left = Math.max(0, player2.offsetLeft - 10) + 'px';
            collectGift(player2);
            checkCollision();
            break;
        case 'd':
            player2.style.left = Math.min(570, player2.offsetLeft + 10) + 'px';
            collectGift(player2);
            checkCollision();
            break;
    }
});

startButton.addEventListener('click', startGame);