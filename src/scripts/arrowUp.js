const arrowBtn = document.querySelector('#arrow-up')

export default function scrollToTop(el) {
	el.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
}

scrollToTop(arrowBtn)
