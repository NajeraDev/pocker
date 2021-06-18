const express = require('express');
const app = express();
const { Deck, Hand } = require('./cards/deck.js');

app.use(express.static('public'));
app.use(express.json());

const deck = new Deck()
const table = new Hand(deck, +5)

app.get('/get-cards', (req, res) => {
  const hands = [];
  hands.push(new Hand(deck, +2))
  return res.json({
    hands: hands.map((hand) => hand.cards),
    deck: table.cards
  })
})
  
app.listen(4001, () => {
  console.log('Server running on port 4001');
});

