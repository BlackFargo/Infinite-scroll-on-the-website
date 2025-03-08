export function createCard(obj) {
	return `<div class='card' >
    <div class="card__content">
      <h4 class='card__title'>${obj.title}</h4>
      <img
        alt='car'
        src='${obj.img}'
        class='img'
      />
      <ul class='card__list'>
      <li><span class='card__list-titles'>Engine:</span> ${obj.info?.engine}</li>
      <li><span class='card__list-titles'>Power:</span> ${obj.info?.power}</li>
      <li><span class='card__list-titles'>Torque:</span> ${obj.info?.torque}</li>
      <li><span class='card__list-titles'>Acceleration:</span> ${obj.info?.acceleration}</li>
      <li><span class='card__list-titles'>Drive:</span> ${obj.info?.drive}</li>
      <li><span class='card__list-titles'>Transmission:</span> ${obj.info?.transmission}</li>
      <li><span class='card__list-titles'>Top_speed:</span> ${obj.info?.top_speed}</li>
      </ul>
      <p class='card__price'>Price: ${obj.price}</p>
    </div>
    <div class="card__actions">
      <button class='card__button'>Add to cart</button>
    </div>
  </div>`
}

export function updateCardsList(obj) {
	const titles = document.querySelectorAll('.card__title')
	const cards = document.querySelectorAll('.card')
	return { titles, cards }
}

function btnsAlert() {}
