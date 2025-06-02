export default class PipeManager {
    constructor(game) {
        this.game = game;
    }

    start() {
        this.updatePipes();
        this.spawnPipes();
    }

    reset() {
        document.querySelectorAll('.pipe_sprite').forEach(pipe => pipe.remove());
        this.game.pipeSeparation = 0;
    }

    createPipe(topVh, isScoringPipe = false) {
        const pipe = document.createElement('div');
        pipe.className = 'pipe_sprite';
        pipe.style.top = `${topVh}vh`;
        pipe.style.left = '100vw';
        if (isScoringPipe) pipe.increase_score = '1';
        document.body.appendChild(pipe);
    }

    updatePipes() {
        if (this.game.gameState !== 'Play') return;

        const pipes = document.querySelectorAll('.pipe_sprite');
        const birdProps = this.game.bird.element.getBoundingClientRect();

        pipes.forEach(pipe => {
            const pipeProps = pipe.getBoundingClientRect();

            if (pipeProps.right <= 0) {
                pipe.remove();
                return;
            }

            if (this.isCollision(birdProps, pipeProps)) {
                this.game.endGame();
                return;
            }

            if (this.isPassed(pipeProps, birdProps) && pipe.increase_score === '1') {
                this.game.ponto++;
                this.game.scoreVal.innerHTML = this.game.ponto;
                if (this.game.dificulty == 3) {
                    if (this.game.ponto == 10) {
                        alert("ganhou");
                        console.log("SEU CORNO MANÇO KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
                    }
                }
                pipe.increase_score = '0'; // Marca como já contabilizado
            }

            pipe.style.left = pipeProps.left - this.game.MOVE_SPEED + 'px';
        });

        requestAnimationFrame(() => this.updatePipes());
    }

    spawnPipes() {
        if (this.game.gameState !== 'Play') return;

        if (this.game.pipeSeparation > this.game.PIPE_INTERVAL) {
            this.game.pipeSeparation = 0;
            const pipeTop = Math.floor(Math.random() * 43) + 8;

            this.createPipe(pipeTop - 70, false);
            this.createPipe(pipeTop + this.game.PIPE_GAP, true);
        }

        this.game.pipeSeparation++;
        requestAnimationFrame(() => this.spawnPipes());
    }

    isCollision(bird, pipe) {
        return (
            bird.left < pipe.left + pipe.width &&
            bird.left + bird.width > pipe.left &&
            bird.top < pipe.top + pipe.height &&
            bird.top + bird.height > pipe.top
        );
    }

    isPassed(pipe, bird) {
        return pipe.right < bird.left && pipe.right + this.game.MOVE_SPEED >= bird.left;
    }
}