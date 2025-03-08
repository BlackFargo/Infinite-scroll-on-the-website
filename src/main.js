import { createCard, updateCardsList } from './scripts/card.js'
import { setupSearchEvent } from './scripts/search.js'
import { openModal, closeModal } from './scripts/modal.js'
import {
	filterCardsByCheckbox,
	carCheckBoxes,
	checkBoxesContainer,
} from './scripts/checkbox.js'
import arrowUp from './scripts/arrowUp.js'
import { cartList, createCartItem } from './scripts/cart.js'
import { addCartItem, OrderCartItems } from './scripts/cartAlert.js'
import { initThemeSwitcher } from './scripts/themeSwitcher.js'

const cartOrder = document.querySelector('.cart__footer-order')
let search = document.querySelector('#inpSearch')
const cardsContainer = document.querySelector('.cards')
const dialogImage = document.querySelector('#dialogImage')
const dialog = document.querySelector('dialog')
let titles = document.querySelectorAll('.card__title')
let cards = document.querySelectorAll('.card')

let cartItems = {}


initThemeSwitcher()

checkBoxesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('search__checkbox-input')) {

        filterCardsByCheckbox(cards)

  
        setTimeout(() => {
            let newCards = document.querySelectorAll('.show')
            let newTitles = [...newCards].map(card => card.querySelector('.card__title'))
            console.log(newCards)


            search.replaceWith(search.cloneNode(true));
            search = document.querySelector('#inpSearch');

            setupSearchEvent(search, newTitles, newCards);
        }, 50) 
    }
})

let max = 4
let min = 0


const cardViewObserver = new IntersectionObserver((entries, observer) => {
	if(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0)'
            }
        })
	
		
	}
}
,{threshold: 0.2})

const cardObserver = new IntersectionObserver(([entry], observer) => {
	if(entry) {
        
		if(entry.isIntersecting) {
            console.log(entry.target)
            max += 4
            min +=4
            loadData(min, max)
           observer.unobserve(entry.target)
           
        }
		
	}
}
,{threshold: 0.9})

function loadData(min = 0, max = 4) {
fetch('https://blackfargo.github.io/Infinite-scroll-on-the-website/cars.json')
	.then(response => response.json())
	.then(data => {
        const newData = data.filter(item => item.id > min && item.id <= max)
       
        if (newData.length === 0) return;
		newData.forEach(car => {
			const cardHTML = createCard(car)
			const cardElement = document.createElement('div')
			cardElement.innerHTML = cardHTML
			const card = cardElement.firstChild

			card.carBrand = car.brand

			cardsContainer.insertAdjacentElement('beforeend', card)
		})

		cardsContainer.addEventListener('click', event => {
			if (event.target.tagName === 'BUTTON') {
				const cardElement = event.target.closest('.card')
				const carTitle = cardElement.querySelector('.card__title').textContent
				const car = data.find(item => item.title === carTitle)

				if (car) {
					if (cartItems[car.title]) {
						cartItems[car.title].quantity += 1
					} else {
						cartItems[car.title] = { ...car, quantity: 1 }
					}
					updateCartUI()
				}
			}
		})

		cards = document.querySelectorAll('.card')
        cards.forEach(card => cardViewObserver.observe(card))
		filterCardsByCheckbox(cards)

		const { titles: updatedTitles, cards: updatedCards } = updateCardsList()
		titles = updatedTitles
		cards = updatedCards
        const lastChild = document.querySelector('.card:last-child')
        cardObserver.observe(lastChild)
		
		setupSearchEvent(search, titles, updatedCards)
	})
	.catch(e => {
		console.error('Error loading cars data:', e)
		cardsContainer.innerHTML =
			'<p class="error-message">Failed to load cars. Please try again later.</p>'
	})
}
loadData(0, 4)

cardsContainer.addEventListener('click', e => {
	if (e.target.classList.contains('img')) {
		const src = e.target.getAttribute('src')
		openModal(dialogImage, dialog, src)
	}
})

dialog.addEventListener('click', e => {
	if (e.target === dialog) {
		closeModal(dialog)
	}
})

dialog.addEventListener('cancel', () => {
	closeModal(dialog)
})
let total = 0
const totalPrice = document.querySelector('.cart__footer-total')

function updateCartUI() {
    // Очистить только измененные элементы
    cartList.innerHTML = '';
    total = 0;

    Object.values(cartItems).forEach(car => {
        const quantity = car.quantity;
        const cartItemHTML = createCartItem(car, quantity);
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = cartItemHTML;

        const newItem = cartItemElement.firstChild;
        cartList.appendChild(newItem);

        let price = parseFloat(car.price.replace(',', '').replace('$', ''));
        total += price * quantity;
    });

    totalPrice.innerHTML = `Total price: ${total.toFixed(2)}$`;
}

function updateCartItemQuantity(carTitle, operation) {
    if (cartItems[carTitle]) {
        if (operation === 'increase') {
            cartItems[carTitle].quantity += 1;
        } else if (operation === 'decrease') {
            if (cartItems[carTitle].quantity > 1) {
                cartItems[carTitle].quantity -= 1;
            } else {
                delete cartItems[carTitle];
            }
        }
        updateCartUI();
    }
}

cartOrder.addEventListener('click', () => {
    if (Object.entries(cartItems).length > 0) {
        cartList.innerHTML = '';
        totalPrice.innerHTML = `Total price: 0$`;
        OrderCartItems();
        cartItems = {};
    }
});

cartList.addEventListener('click', e => {
    const carTitle = e.target.closest('.cart__list-item')?.querySelector('.cart__list-item-title')?.textContent;
    if (!carTitle) return;

    if (e.target.classList.contains('cart__list-item-plus')) {
        updateCartItemQuantity(carTitle, 'increase');
    } else if (e.target.classList.contains('cart__list-item-minus')) {
        updateCartItemQuantity(carTitle, 'decrease');
    }
});
