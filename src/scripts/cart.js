export const cartList = document.querySelector('.cart__list')

const cart = document.querySelector('.cart')
const cartBtn = document.querySelector('.header__basketBtn')
const closeBtn = document.querySelector('.cart__close-btn')

export function createCartItem(obj, quantity = 1) {
	let price = parseFloat(obj.price.replace(',', '').replace('$', ''))
	let finalPrice = price * quantity

	let item = `<li class="cart__list-item
    ">
    <img src="${obj.img}" class="cart__list-image" alt="car" />
    <div class='cart__list-text'>
        <h4 class='cart__list-item-title'>${obj.title}</h4>
        <p>Price: ${obj.price}</p>
        <p>Quantity: ${quantity}</p>
        <p>Final price: ${finalPrice.toFixed(2)}$</p>
        <div class='cart__list-item-actions'>
            <button class='cart__list-item-plus'></button>
            <button class='cart__list-item-minus'></button>
        </div>
    </div>
  </li>`

	return item
}

let opened = false
function toggleModal(item) {
	if (!opened) {
		setTimeout(() => {
			item.classList.remove('hide')
			item.classList.add('show')
		}, 100)

		item.style.display = 'block'

		opened = true
	} else {
		setTimeout(() => {
			item.style.display = 'none'
		}, 100)
		item.classList.remove('show')
		item.classList.add('hide')
		opened = false
	}
}

cartBtn.addEventListener('click', () => {
	toggleModal(cart)
})
closeBtn.addEventListener('click', () => {
	toggleModal(cart)
})
