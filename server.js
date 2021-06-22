const express = require('express');
const app = express();
const cors = require('cors')
const { Deck, Hand } = require('./cards/deck.js');
app.use(cors());

app.use(express.static('public'));
app.use(express.json());

const deck = new Deck()
const table = new Hand(deck, +5)

app.get('/hand', (req, res) => {
  const hands = new Hand(deck, +2)
  return res.json({
    hand: hands.cards
  })
})
  
app.get('/table', (req, res) => {
  return res.json({
    deck: table.cards
  })
})

app.listen(4001, () => {
  console.log('Server running on port 4001');
});

