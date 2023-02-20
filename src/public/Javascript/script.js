$(document).ready(() => {
    setInterval(displayClock, 100);

    //* Display time in header
    function displayClock() {
        //*Get real time to display on header
        let time = new Date();
        let hrs = time.getHours();
        let min = time.getMinutes();
        let en = 'AM';

        if (hrs > 12) {
            hrs = hrs - 12;
            en = 'PM';
        }

        if (hrs == 0) {
            hrs = 12;
        }

        //*display '0' before hrs and min if they <10
        if (hrs < 10) {
            hrs = '0' + hrs;
        }
        if (min < 10) {
            min = '0' + min;
        }

        document.getElementById('Clock').innerHTML = hrs + ':' + min + ' ' + en;
    }

    //* Button + to increase or decrease quantity of food

    function increaseOrDecreaseItems() {
        let plus = document.getElementById('plus'),
            minus = document.getElementById('minus'),
            qty = document.getElementById('qty'),
            num = 1;

        plus.addEventListener('click', () => {
            num++;
            qty.innerText = num;
            console.log('num');
        });

        minus.addEventListener('click', () => {
            num--;
            qty.innerText = num;
        });
    }
    increaseOrDecreaseItems();

    //* Change table's color and text content base on status
    $('.slider').each((index, item) => {
        $(item).click(function () {
            const table = $('.tableCard').eq(index);
            const header = $('.headerCard').eq(index);
            const title = $('.headerTitle').eq(index);
            if (!table.data('full')) {
                header.css('background-color', 'rgb(34,139,34)');
                title.text('Full Table');
                table.data('full', true);
            } else {
                header.css('background-color', 'rgb(118, 113, 113)');
                title.text('Empty Table');
                table.data('full', false);
            }
        });
    });

    //* Add food ordered to session storage
    const orders = new Array();
    const prices = new Array();
    const ingredientsStore = new Array();
    $('.circle').each((index, item) => {
        $(item).click(function () {
            //* take the nameFood class which is the last sibling to .circle
            //* similar to price
            const name = $(this).prevAll()[2];
            const price = $(this).prevAll()[0];
            const ingredients = $(this).nextAll();

            //* push food ordered to order array to take data from chef page
            orders.push({
                name: $.trim($(name).text()),
                price: $.trim($(price).text()).split(' ')[1], //* split $ [price] into two elements
            });
            console.log(orders);

            //* push ingredients in each foods to ingredientsStore array to update ingredients's quantity
            ingredients.each((index, item) => {
                ingredientsStore.push($.trim($(item).text()));
            });
        });
    });

    $('.order').click(function () {
        const addCart = async (name, price) => {
            fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price }),
            });
        };

        const fetchAPI = async (name) => {
            fetch(`http://localhost:3000/ingredients/?name=${name}&type=minus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
        };

        //* add order to cart database
        orders.forEach((item) => {
            addCart(item.name, Number(item.price.replace(',', '')));
        });

        //* update ingredients's quantity in database
        ingredientsStore.forEach((item) => {
            fetchAPI(item);
        });
    });

    //* calculate total price of the bill
    const sum = (total, num) => {
        return total + num;
    };

    //* calculating total price for user
    $('.payment').click(function () {
        sessionStorage.setItem('foods', JSON.stringify(orders));
        const foodObject = JSON.parse(sessionStorage.getItem('foods'));
        foodObject.map((item) => {
            //* convert price (string) to price (Number)
            prices.push(Number(item.price.replace(',', '')));
        });

        const total = prices.reduce(sum, 0);
        console.log(prices.length);
        console.log(total);

        const names = new Array();

        orders.forEach((item) => {
            names.push(item.name);
        });

        const fetchAPI = async (quantity, name, price, table = 1) => {
            fetch('http://localhost:3000/manager/bill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity, name, price, table }),
            });
        };

        //* call API for payment then clear all the data in array
        fetchAPI(prices.length, names, total);
        orders.length = 0;
        prices.length = 0;
        names.length = 0;
        console.log(orders, prices, names);
    });

    //* remove food from session storage (incase user want to remove from order list)
    $('.minus_button').each((index, item) => {
        $(item).click(function () {
            const nameFood = $(this).prevAll()[3];
            orders.forEach((item, index) => {
                if (item.name === $.trim($(nameFood).text())) {
                    //* remove item from order array
                    orders.splice(index, 1);
                }
            });
            //TODO minus ingredient's quantity here
        });
    });
});
