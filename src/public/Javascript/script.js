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
                price: $.trim($(price).text()).split(' ')[0], //* split [price] $ into two elements
            });
            console.log('orders', orders);

            //* push ingredients in each foods to ingredientsStore array to update ingredients's quantity
            ingredients.each((index, item) => {
                //* in food card, we display like this [name]-[quantity]
                //* so we use split to take the first part to call API
                ingredientsStore.push($.trim($(item).text().split('-')[0]));
            });

            console.log('ingredients', ingredientsStore);
        });
    });

    //* update food card color base on ingredient's quantity (<= 0 will be gray color)
    $('.foodCard').each((index, item) => {
        $(item)
            .find('.ingredient')
            .each((index, value) => {
                //* 2 is the index of foodCard in value parents list
                if (!Number($(value).text().split('-')[1])) {
                    const ingredients = $(value).parent();
                    const circle = $(ingredients).prev();
                    //* remove click event on circle button since we disable this food card
                    $(circle).off('click');

                    const parent = $(value).parents()[2];
                    $(parent).css('background-color', 'gray');
                }
            });
    });

    $('.order').click(function () {
        //* add data to cart database
        const addCart = async (name, price) => {
            fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price }),
            });
        };

        const updateIngredients = async (name) => {
            fetch(`http://localhost:3000/ingredients/?name=${name}&type=minus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
        };

        const updateOrderHistory = async (name, type = 'add') => {
            fetch(`http://localhost:3000/history/?name=${name}&type=${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
        };

        //* add order to cart database
        orders.forEach((item) => {
            addCart(item.name, Number(item.price.replace(',', '')));
            updateOrderHistory(item.name);
        });

        //* update ingredients's quantity in database
        ingredientsStore.forEach((item) => {
            updateIngredients(item);
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

        //* call API to create bill
        const fetchAPI = async (quantity, name, total, table = 1) => {
            fetch('http://localhost:3000/manager/bill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity, name, total, table }),
            });
        };

        //* call API for payment then clear all the data in array
        fetchAPI(prices.length, names, total);
        orders.length = 0;
        prices.length = 0;
        names.length = 0;
        console.log(orders, prices, names);
    });

    //* increase food's quantity when click plus icon
    $('.sidebar_right_plus').each((index, item) => {
        let number = 1;
        $(item).click(function () {
            const quantity = $(this).prevAll()[2];
            $(quantity).text(++number);
        });
    });

    //* decrease food's quantity when click minus icon
    //* or remove food from session storage if quantity <= 0 (incase user want to remove from order list)
    $('.sidebar_right_minus').each((index, item) => {
        let number = 1;
        $(item).click(function () {
            const quantity = $(this).next().text();
            if (Number(quantity) > 0) {
                console.log('greater than 0');
                $(quantity).text(--number);
                console.log(number)
            } else {
                console.log('less than 0');
            }
        });
        // $(item).click(function () {
        //     const nameFood = $(this).prevAll()[3];
        //     orders.forEach((item, index) => {
        //         if (item.name === $.trim($(nameFood).text())) {
        //             //* remove item from order array
        //             orders.splice(index, 1);
        //         }
        //     });
        //     //TODO increase ingredient's quantity here
        // });
    });
});
