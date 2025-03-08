let scrollPos = 0

export function scrollBlock() {
	scrollPos = window.scrollY
	document.body.style.position = 'fixed'
	document.body.style.top = `-${scrollPos}px`
	document.body.style.width = '100%'
}

export function returnScroll() {
	document.body.style.position = ''
	document.body.style.top = ''
	document.body.style.width = ''
	window.scrollTo(0, scrollPos)
}

export function openModal(dialogImage, dialog, src) {
	dialogImage.setAttribute('src', '')
	scrollBlock()
	dialogImage.setAttribute('src', src)
	dialog.showModal()
}

export function closeModal(dialog) {
	dialog.close()
	returnScroll()
}
