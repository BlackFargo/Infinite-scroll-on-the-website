export const carCheckBoxes = document.querySelectorAll(
	'.search__checkbox-input'
)
let id = 0
export const checkBoxesContainer = document.querySelector('.search__checkboxes')

export function getCheckBoxValue(checkBoxes) {
	let checkBoxValues = []

	checkBoxes.forEach(checkBox => {
		if (checkBox.checked === true) {
			checkBoxValues.push(checkBox.value)
		}
	})

	return checkBoxValues
}

export function filterCardsByCheckbox(props) {
	const selectedBrands = getCheckBoxValue(carCheckBoxes)


	if (selectedBrands.length === 0) {
		props.forEach(card => {
			card.style.display = 'flex'
			setTimeout(() => {
				card.classList.add('show')
				card.classList.remove('hide')
			}, 300)
		})
	} else {
		props.forEach(card => {
			const carBrand = card.carBrand

			if (selectedBrands.includes(carBrand)) {
				setTimeout(() => {
					card.classList.add('show')
				}, 50)
				card.style.display = 'flex'
			} else {
				card.classList.remove('show')
				card.classList.add('hide')
				setTimeout(() => {
					card.style.display = 'none'
				}, 200)
			}
		})
	}
	saveToSessionStorage(carCheckBoxes)
}

function saveToSessionStorage(elements) {
	const items = []
	elements.forEach(el => {
		items.push({
			id: el.id,
			checked: el.checked,
		})
	})
	sessionStorage.setItem('CheckBoxes', JSON.stringify(items))
}

function loadFromSessionStorage(key) {
	const data = sessionStorage.getItem(key)
	if (data) {
		const items = JSON.parse(data)

		items.forEach(savedItem => {
			const checkBox = document.getElementById(savedItem.id)
			if (checkBox) checkBox.checked = savedItem.checked
		})
	}
}

loadFromSessionStorage('CheckBoxes')
