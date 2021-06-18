const container = document.querySelector(".deck");
const containerHand = document.querySelector(".hand")

fetch("/get-cards")
	.then((data) => data.json())
	.then((res) => onFinishedFetching(res))


const createCard = (card, flipped) => {
	const number = card.slice(0, -1)
	const symbol = card.slice(-1)

	const isNumber = !isNaN(number)
	const cardDiv = document.createElement('div')
	
	cardDiv.classList.add('card')
	cardDiv.setAttribute('symbol', symbol)
	cardDiv.setAttribute('number', number)
	
	cardDiv.innerHTML = `
		<div class="container">
		
		<div class="back"></div>
		<div class="front">
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
				</div>
				</div>
		`

if (flipped) {
	cardDiv.classList.add("flipped")	
}
cardDiv.addEventListener("click",()=>{	
	cardDiv.classList.contains("flipped")?
	cardDiv.classList.remove("flipped") :
	cardDiv.classList.add("flipped")
})

return cardDiv
}

function onFinishedFetching(res) {
	const { deck, hands } = res;

	deck.forEach((card, index)=> {
		container.appendChild(createCard(card,(index < 2)))
		
	});
	
	hands.forEach((hand)=>{
		hand.forEach((card,index)=>{
			containerHand.appendChild(createCard(card,(index < 2)))
		})
	})


}

