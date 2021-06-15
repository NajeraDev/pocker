const URL = 'http://localhost:4040';

const startBtn = document.querySelector('.start-btn');

const getHands = async () => {
  try {
    const response = await fetch(`${URL}/play`);
    const sortedCards = await response.json();
    const { currentHands, remainingCards } = sortedCards;

    const deckList = document.createElement('ul');
    remainingCards.forEach((cart) => {
      const li = document.createElement('li');
      li.textContent = cart;
      deckList.appendChild(li);
    });
    const listContainer = document.querySelector('.deck');
    listContainer.appendChild(deckList);

    Object.keys(currentHands).forEach((player) => {
      const playerContainer = document.querySelector('.player-hands');
      const playerArea = document.createElement('div');
      const playerName = document.createElement('h3');
      playerName.innerText = player;
      playerArea.appendChild(playerName);
      const playerHand = document.createElement('ul');
      currentHands[player].cards.forEach((playerCard) => {
        const cardName = document.createElement('li');
        cardName.innerText = playerCard;
        playerHand.appendChild(cardName);
      });
      playerArea.appendChild(playerHand);
      playerContainer.appendChild(playerArea);
    });
  } catch (error) {
    console.warn(error);
  }
};

startBtn.addEventListener('click', getHands);
