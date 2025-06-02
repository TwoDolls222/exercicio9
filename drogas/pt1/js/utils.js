export function isCollision(bird, pipe) {
    return (
        bird.left < pipe.left + pipe.width &&
        bird.left + bird.width > pipe.left &&
        bird.top < pipe.top + pipe.height &&
        bird.top + bird.height > pipe.top
    );
}

export function isPassed(pipe, bird) {
    return pipe.right < bird.left && pipe.right + MOVE_SPEED >= bird.left;
}