export function initThemeSwitcher() {
	const switcher = document.querySelector('.header__actions-checkbox')

	if (!switcher) return

	switcher.addEventListener('click', () => {
		document.body.classList.toggle('dark')
	})
}
