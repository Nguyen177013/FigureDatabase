function pagination(url = 'latest') {
    const pagination = document.querySelector('.pagination');
    console.log(length);
    const size = length / 15;
    for (let i = 0; i <size; i++) {
        console.log(i);
        let button = document.createElement('div');
        button.classList.add('page_btn');
        if (i == 0) {
            button.innerHTML = `<a href="/figure/${url}/1" class="page">${i + 1}</a>`
        }
        else
            button.innerHTML = `<a href="/figure/${url}/${i + 1}" class="page">${i + 1}</a>`
        if (i == page)
            button.innerHTML = `<a href="/figure/${url}/${i}" class="page selected">${i + 1}</a>`
        pagination.appendChild(button);
    }
}
