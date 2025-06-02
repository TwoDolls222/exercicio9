export default class DifficultyManager {
    constructor(game) {
        this.game = game;
        this.currentDifficulty = null;
        this.createMenu();
    }

    createMenu() {
        this.menu = document.createElement('div');
        this.menu.innerHTML = `
            <div class="difficulty_menu" style="position:absolute; top:30vh; left:0; right:0; text-align:center; color:white; font-family:Arial; z-index:100;">
                <h2>Escolha a Dificuldade</h2>
                <button class="difficulty_btn" data-level="easy" style="margin:10px; padding:10px 20px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">Bebe Chorao</button>
                <button class="difficulty_btn" data-level="medium" style="margin:10px; padding:10px 20px; background:#FFC107; color:black; border:none; border-radius:5px; cursor:pointer;">To treinando</button>
                <button class="difficulty_btn" data-level="hard" style="margin:10px; padding:10px 20px; background:#F44336; color:white; border:none; border-radius:5px; cursor:pointer;">Sou foca</button>
            </div>
        `;
        document.body.appendChild(this.menu);
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.difficulty_btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setDifficulty(btn.dataset.level);
            });
        });
    }

    setDifficulty(level) {
        this.currentDifficulty = level;
        this.menu.style.display = 'none';

        switch (level) {
            case 'easy':
                this.game.MOVE_SPEED = 4;
                this.game.GRAVITY = 0.4;
                this.game.JUMP_FORCE = -8;
                this.game.PIPE_GAP = 40;
                this.game.PIPE_INTERVAL = 150;
                this.game.dificulty = 1;
                break;

            case 'medium':
                this.game.MOVE_SPEED = 7;
                this.game.GRAVITY = 0.7;
                this.game.JUMP_FORCE = -7.6;
                this.game.PIPE_GAP = 35;
                this.game.PIPE_INTERVAL = 115;
                this.game.dificulty = 2;
                break;

            case 'hard':
                this.game.MOVE_SPEED = 9;
                this.game.GRAVITY = -0.5;
                this.game.JUMP_FORCE = 6;
                this.game.PIPE_GAP = 25;
                this.game.PIPE_INTERVAL = 100;
                this.game.dificulty = 3;
                break;
        }

        this.game.message.innerHTML = 'Pressione Espaço para Começar';
        this.game.message.style.left = '25vw';
    }
}