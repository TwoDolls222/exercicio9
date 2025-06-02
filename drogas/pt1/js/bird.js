export default class Bird {
    constructor(game) {
        this.game = game;
        this.element = document.querySelector('.bird');
        this.velocity = 0;
        this.reset();
    }

    reset() {
        this.element.style.top = '40vh';
        this.velocity = 0;
    }

    jump() {
        this.velocity = this.game.JUMP_FORCE;
    }

    applyGravity() {
        this.velocity += this.game.GRAVITY;
        this.element.style.top = this.element.getBoundingClientRect().top + this.velocity + 'px';
    }
}