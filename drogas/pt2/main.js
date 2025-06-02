 document.addEventListener('DOMContentLoaded', () => {
     const gameBoard = document.getElementById('gameBoard');
     const movesDisplay = document.getElementById('moves');
     const triosDisplay = document.getElementById('trios');
     const resetButton = document.getElementById('resetButton');

     let cards = [];
     let flippedCards = [];
     let moves = 0;
     let matchedTrios = 0;
     let canFlip = true;

     const images = [{
         symbol: 'momo',
         src: 'img/mom.jpg'
     }, {
         symbol: 'bolsonaro',
         src: 'img/bolsonaroDedo.jpg'
     }, {
         symbol: 'iluminati',
         src: 'img/illuminati.webp'
     }];
     async function initGame() {
         gameBoard.innerHTML = '';
         cards = [];
         flippedCards = [];
         moves = 0;
         matchedTrios = 0;
         canFlip = false; 

         movesDisplay.textContent = moves;
         triosDisplay.textContent = matchedTrios;


         let cardValues = [];
         for (let i = 0; i < 3; i++) {
             cardValues.push(images[i], images[i], images[i]);
         }


         cardValues = cardValues.sort(() => Math.random() - 0.5);
         for (let i = 0; i < 9; i++) {
             const card = document.createElement('div');
             card.classList.add('card');
             card.dataset.symbol = cardValues[i].symbol;
             card.dataset.index = i;

             const img = document.createElement('img');
             img.src = cardValues[i].src;
             img.alt = cardValues[i].symbol;
             card.appendChild(img);

             card.addEventListener('click', flipCard);

             gameBoard.appendChild(card);
             cards.push(card);
         }

         showAllCards();
         await new Promise(resolve => setTimeout(resolve, 3000)); 
         hideAllCards();
         canFlip = true;
     }
     function showAllCards() {
         cards.forEach(card => {
             card.classList.add('flipped');
         });
     }
     function hideAllCards() {
         cards.forEach(card => {
             if (!card.classList.contains('matched')) {
                 card.classList.remove('flipped');
             }
         });
     }

     function flipCard() {
         if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) {
             return;
         }

         this.classList.add('flipped');
         flippedCards.push(this);
         if (flippedCards.length === 3) {
             canFlip = false;
             moves++;
             movesDisplay.textContent = moves;

             checkForTrio();
         }
     }
     function checkForTrio() {
         const [card1, card2, card3] = flippedCards;

         if (card1.dataset.symbol === card2.dataset.symbol && card2.dataset.symbol === card3.dataset.symbol) {
             card1.classList.add('matched');
             card2.classList.add('matched');
             card3.classList.add('matched');
             matchedTrios++;
             triosDisplay.textContent = matchedTrios;
             flippedCards = [];
             canFlip = true;
             if (matchedTrios === 3) {
                 setTimeout(() => {
                     alert(`Parabéns! Você completou o jogo em ${moves} movimentos.`);
                 }, 500);
             }
         } else {
             setTimeout(() => {
                 card1.classList.remove('flipped');
                 card2.classList.remove('flipped');
                 card3.classList.remove('flipped');

                 flippedCards = [];
                 canFlip = true;
             }, 1000);
         }
     }
     resetButton.addEventListener('click', initGame);
     initGame();
 });