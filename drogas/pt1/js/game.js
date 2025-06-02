import DifficultyManager from './difficulty.js';
import Bird from './bird.js';
import PipeManager from './pipe.js';

export default class Game {
    constructor() {
        // Constantes do jogo
        this.MOVE_SPEED = 3;
        this.GRAVITY = 0.7;
        this.JUMP_FORCE = -9.6;
        this.PIPE_GAP = 35;
        this.PIPE_INTERVAL = 115;
        this.pipeSeparation = 0;
        this.ponto = 0; // Adicionado para controle de pontuação
        this.dificulty = 0;

        // Elementos do DOM
        this.scoreVal = document.querySelector('.score_val');
        this.message = document.querySelector('.message');
        this.scoreTitle = document.querySelector('.score_title');
        this.background = document.querySelector('.background').getBoundingClientRect();

        // Subsistemas
        this.difficultyManager = new DifficultyManager(this);
        this.bird = new Bird(this);
        this.pipeManager = new PipeManager(this);

        this.gameState = 'Start';
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleSpacePress();
            }
        });
    }

    handleSpacePress() {
        if (this.gameState === 'Play') {
            this.bird.jump();
        } else if (this.gameState === 'Start' && this.difficultyManager.currentDifficulty) {
            this.startGame();
        } else if (this.gameState === 'End') {
            this.resetGame();
            this.startGame();
        }
    }

    startGame() {
        this.gameState = 'Play';
        this.ponto = 0; // Reseta a pontuação
        this.message.innerHTML = '';
        this.scoreTitle.innerHTML = 'P10NT0S: ';
        this.scoreVal.innerHTML = '0';
        this.pipeManager.start();
        this.applyGravity();
    }

    resetGame() {
        this.pipeManager.reset();
        this.bird.reset();
        this.gameState = 'Play';
        this.scoreTitle.innerHTML = 'P10NT0S: ';
        this.scoreVal.innerHTML = '0';
        this.ponto = 0; // Reseta a pontuação

        this.message.innerHTML = '';
    }

    applyGravity() {
        if (this.gameState !== 'Play') return;

        this.bird.applyGravity();

        const birdRect = this.bird.element.getBoundingClientRect();
        if (birdRect.top <= 0 || birdRect.bottom >= this.background.bottom) {
            this.endGame();
            return;
        }

        requestAnimationFrame(() => this.applyGravity());
    }

    endGame() {
        this.gameState = 'End';
        this.message.innerHTML = 'Pressione Espaço para Reiniciar';
        this.message.style.left = '20vw';
    }
}