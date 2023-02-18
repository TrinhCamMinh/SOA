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
    $('.circle').each((index, item) => {
        $(item).click(function () {
            //* take the nameFood class which is the last sibling to .circle
            //* similar to price
            const nameFood = $(this).prevAll()[2];
            const price = $(this).prevAll()[0];

            orders.push({
                name: $.trim($(nameFood).text()),
                price: $.trim($(price).text()).split(' ')[1], //* split $ [price] into two elements
            });
            console.log(orders);
        });
    });

    //* calculate total price of the bill
    const sum = (total, num) => {
        return total + num;
    };

    $('.payment').click(function () {
        sessionStorage.setItem('foods', JSON.stringify(orders));
        const foodObject = JSON.parse(sessionStorage.getItem('foods'));
        foodObject.map((item) => {
            //* convert price (string) to price (Number)
            prices.push(Number(item.price));
        });
        // console.log(prices.length);
        // console.log(prices.reduce(sum, 0));
    });

    //* remove food from session storage (incase user want to remove from order list)
    $('.minus_button').each((index, item) => {
        $(item).click(function () {
            const nameFood = $(this).prevAll()[3];
            orders.map((item, index) => {
                if (item.name === $.trim($(nameFood).text())) {
                    //* remove item from order array
                    orders.splice(index, 1);
                }
            });
        });
    });
});
