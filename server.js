const express = require('express');
const path = require('path');
const { Deck, Hand } = require('./cards/deck');

const app = express();

const PORT = 4040;

const deck = new Deck();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/play', (req, res) => {
  const currentHands = {};
  for (let i = 1; i <= 5; i++) {
    const hand = new Hand(deck, 5);
    currentHands[`player${i}`] = hand;
  }
  res.send({
    remainingCards: deck.cards,
    currentHands,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
