'use strict';

// объект отрисовки продукта в корзине
const basketItem = {
renderBasketItem(product) {
    return `<div class="product">
                <div><b>Наименование</b>: ${product.name}</div>
                <div><b>Цена товара</b>: ${product.price}</div>
                <div><b>Количество</b>: ${product.amount}</div>
                <div><b>Общая стоимость</b>: ${product.price * product.amount}</div>
            </div>`
    }
}
    // сам объект корзины
const basket = {
    blockRender: null,
    button: null,
    basketItem,
    products: [{
        id: '01',
        name: 'Beer',
        price: 100,
        amount: 4
        },
        {id:'02',
            name: 'Cognac',
            price: 3000,
            amount: 1},
        {id: '03',
            name: 'vine',
            price: 1200,
            amount: 2}
    ],
    // подсчет обще стоимости, как и в 4 уроке применяем reduce и стрелочную функцию
    countTotal(){
        return this.products.reduce((totalPrice, product)=>totalPrice += product.price*product.amount, 0);
    },
    // метод добавления продукта в корзину
    addProduct(id, name, price, amount){
        this.products.push({id, name, price, amount});
    },
    // инициализация корзины
    init(){
        this.blockRender = document.querySelector('.block_render'); //ищем место для отрисовки
        this.button = document.querySelector('button');
        this.button.addEventListener('click',this.clearBasket.bind(this)); //без bind теряется контекст (относится не к this, а к eventListener)
        this.render();  //сама отрисовка
    },

    render(){
        if (this.products.length){             //если в корзине что то есть
            this.products.forEach(product=>{    //для каждого продукта в указанное место вставляем обънет отрисовки
                this.blockRender.insertAdjacentHTML('beforeend', this.basketItem.renderBasketItem(product));
            });
            this.blockRender.insertAdjacentHTML('beforeend', `В корзине ${this.products.length} товара стоимостью ${this.countTotal()}`)
        } else {
            this.blockRender.textContent = "Корзина пуста";
        }
    },

clearBasket(){
        this.products = [];
        this.render();
}
};
console.log(basket.countTotal());

basket.addProduct('05','whiskey', 2000, 1);

console.log(basket.countTotal());

basket.init();
