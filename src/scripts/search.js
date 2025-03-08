function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

export function setupSearchEvent(search, titles, cards) {
    const savedSearchValue = sessionStorage.getItem('searchValue') || '';
    search.value = savedSearchValue;

    const updateSearchResults = () => {
        sessionStorage.setItem('searchValue', search.value);

        titles.forEach((item, index) => {
            const titleContent = item.textContent.trim().toLocaleLowerCase();
            if (titleContent.includes(search.value.trim().toLocaleLowerCase())) {
                cards[index].style.display = 'flex';
                setTimeout(() => {
                    cards[index].classList.add('show');
                }, 300);

                setTimeout(() => {
                    cards[index].classList.remove('hide');
                }, 300);
            } else {
                cards[index].classList.add('hide');
                setTimeout(() => {
                    cards[index].style.display = 'none';
                }, 300);
                cards[index].classList.remove('show');
            }
        });
    };

    const debouncedSearch = debounce(updateSearchResults, 300); 

    search.addEventListener('input', debouncedSearch);

    if (savedSearchValue) {
        updateSearchResults();
    }
}
