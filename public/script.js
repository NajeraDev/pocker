const container = document.querySelector(".deck");

fetch("/get-cards")
	.then((data) => data.json())
	.then((res) => onFinishedFetching(res))


	const createCard = (card) => {
		const number = card.slice(0, -1)
		const symbol = card.slice(-1)

		const isNumber = !isNaN(number)
		const cardDiv = document.createElement('div')
		
		cardDiv.classList.add('card')
		cardDiv.setAttribute('symbol', symbol)
		cardDiv.setAttribute('number', number)
		
		cardDiv.innerHTML = `
		 	<div class="card-corner top-left">
		 	<div>${number}</div>
		 	<div>${symbol}</div>
		 	</div>
		 	<div class="symbols">
		 	${
		 		number == 'A' ?
		 		`<div class="Asymbol">${symbol}</div>` : ""
		 	}
		 	${
		 		isNumber
		 		? `${new Array(parseInt(number))
		 			.fill(symbol)
		 			.map(
		 				(cardSymbol) => `
		 				<div>${cardSymbol}</div>
		 				`
		 				)
		 				.join("")}`
		 				: ""
		 			} 
		 			${
		 				number == 'J' || number == 'Q' || number == 'K' ? 
		 				`<div class="image"></div>`
		 				: ""
		 			}
		 		</div>
		 		<div class="card-corner bottom-right">
		 			<div>${number}</div>
		 			<div>${symbol}</div>
		 		</div>
		 	`
	cardDiv.addEventListener("click",()=>{
		console.log("Ahora si ptm")
	})

	return cardDiv
	}

function onFinishedFetching(res) {
	const { deck, hands } = res;
	
	deck.forEach((card) => {
        container.append(createCard(card))
	})
	container.innerHTML += `<h2>Your Hand</h2>`;

	 hands.forEach((hand) => {
	 	const newHand = hand.map(createCard);
		newHand.forEach((card)=>{
			container.appendChild(card)
		})
	 });
}

