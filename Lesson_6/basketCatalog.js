'use strict';

// объект каталога
const catalog = {
    basket: null,
    blockRender: null,
    products: [{
        id: 1,
        name: 'Пивас',
        price: 100,
        image: 'images/beer.jpg'
    }, {
        id: 2,
        name: 'Коньячок',
        price: 3000,
        image: 'images/cognac.jpg'
    }, {
        id: 3,
        name: 'Винчик',
        price: 1200,
        amount: 2,
        image: 'images/vine.jpg'
    }],
    // инициализация каталога
    init() {
        this.blockRender = document.querySelector('.catalog'); //ищем место для отрисовки
        this.basket = basket;                                  // закрепляем за каталогом корзину
        this.render();  //сама отрисовка
        this.addEventHandlers(); // добавляем обработчики событий 
        this.button = document.querySelector('.addToBasketButton');
    },
    // отрисовка каталога
    render() {
        this.blockRender.innerHTML = '';  //предварительно очищаем каталог
        this.products.forEach(item => {
            this.blockRender.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },

    renderCatalogItem(product) {
        return `<div class="catalog_item">
                    <div class="column">
                        <div>Наименование:<b> ${product.name}</b></div>
                        <div>Цена товара:<b>${product.price}</b></div>
                        <button class="addToBasketButton" data-id_product="${product.id}" > В корзину</button>
                    </div>
                    <img src= ${product.image} alt= "picture"></img>
                </div>`
    },

    addEventHandlers() {
        this.button = document.querySelector('.addToBasketButton');
        this.blockRender.addEventListener('click', event => this.addToBasket(event));
    },
    // метод добавления продукта в корзину
    addToBasket(event) {
        if (!event.target.classList.contains('addToBasketButton')) return;
        const id_product = +event.target.dataset.id_product;
        const productToAdd = this.products.find((product) => product.id === id_product);
        this.basket.addProductToBasket(productToAdd);
    },
}

// сам объект корзины
const basket = {
    blockRender: null,
    button: null,
    products: [],

    // инициализация корзины
    init() {
        this.blockRender = document.querySelector('.basket'); //ищем место для отрисовки
        this.button = document.querySelector('.delButton');
        this.button.addEventListener('click', this.clearBasket.bind(this)); //без bind теряется контекст (относится не к this, а к eventListener)
        this.render();  //сама отрисовка
    },

    // отрисовка корзины 
    render() {
        this.blockRender.innerHTML = '';
        if (this.products.length) {
            this.products.forEach(product => {
                this.blockRender.insertAdjacentHTML('beforeend', this.renderBasketItem(product));
            });
            this.blockRender.insertAdjacentHTML('beforeend', `В корзине ${this.products.reduce((total, product) => total += product.amount, 0)} товара стоимостью ${this.countTotal()}`)
        } else {
            this.blockRender.textContent = "Корзина пуста";
        }
    },
    //отрисовка элементов корзины
    renderBasketItem(product) {
        return `<div class="basket_item">
                    <div><b>Наименование</b>: ${product.name}</div>
                    <div><b>Цена товара</b>: ${product.price}</div>
                    <div><b>Количество</b>: ${product.amount}</div>
                    <div><b>Общая стоимость</b>: ${product.price * product.amount}</div>
                </div>
            `
    },
    // подсчет общей стоимости, как и в 4 уроке применяем reduce и стрелочную функцию
    countTotal() {
        return this.products.reduce((totalPrice, product) => totalPrice += product.price * product.amount, 0);
    },

    addProductToBasket(product) {
        if (product) {
            const findInBasket = this.products.find((item) => product.id === item.id);
            if (findInBasket) {
                findInBasket.amount++;
            } else {
                this.products.push({ ...product, amount: 1 }); // ...- обязательно!
            }
            this.render();
        } else {
            alert('Ошибка добавления!');
        }
    },

    clearBasket() {
        this.products = [];
        this.render();
    }
};

catalog.init(basket);
basket.init();