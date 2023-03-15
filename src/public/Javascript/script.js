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

    const orders = new Array();
    const prices = new Array();
    const ingredientsStore = new Array();
    const ids = new Array();
    $('.circle').each((index, item) => {
        $(item).click(function () {
            //* take the nameFood class which is the last sibling to .circle
            //* similar to price
            const name = $(this).prevAll()[2];
            const price = $(this).prevAll()[0];
            const ingredients = $(this).nextAll();

            const template = (name, price = 0) => {
                return `
                    <div class="order">
                        <div class='flex justify-start items-center px-[10px] py-[10px] w-full'>
                            <button class='sidebar_right_minus'><i class='fa-solid fa-minus'></i></button>
                            <span class='span-1 w-[50px] ml-[30px]' id='qty'>1</span>
                            <span class='span-2'>${name}</span>
                            <span class='span-3 ml-auto'>${price} $</span>
                            <button class='sidebar_right_plus ml-auto'><i class='fa-solid fa-plus'></i></button>
                        </div>
                        <div class="flex justify-center">
                            <div class="relative mb-3 xl:w-96" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    class="test peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput1"
                                    placeholder="Example label" 
                                />
                                <label
                                    for="exampleFormControlInput1"
                                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                                    >Example label
                                </label>
                            </div>
                        </div>
                    </div>`;
            };

            //* append order to sidebar right
            $('.orderingFood').append(template($.trim($(name).text()), Number($.trim($(price).text()).split(' ')[0])));

            //* push ingredients in each foods to ingredientsStore array to update ingredients's quantity
            ingredients.each((index, item) => {
                //* in food card, we display like this [name]-[quantity]
                //* so we use split to take the first part to call API
                ingredientsStore.push($.trim($(item).text()).split('-')[0]);
            });

            console.log('ingredients', ingredientsStore);
        });
    });

    //* update food card color base on ingredient's quantity (<= 0 will be gray color)
    $('.foodCard').each((index, item) => {
        $(item)
            .find('.ingredient')
            .each((index, value) => {
                //* 2 is the index of foodCard in value's parents list
                if (!Number($(value).text().split('-')[1])) {
                    const ingredients = $(value).parent();
                    let circle = null;
                    if ($(ingredients).prev().hasClass('circle')) {
                        circle = $(ingredients).prev();
                    } else {
                        circle = $(ingredients).prevAll()[1];
                    }
                    //* remove click event on circle button since we disable this food card
                    $(circle).off('click');
                    const parent = $(value).parents()[2];
                    $(parent).css('opacity', '0.6');
                }
            });
    });

    $('.order').click(function () {
        const span1 = $('.span-1');
        const span2 = $('.span-2');
        const span3 = $('.span-3');
        const input = $('.test');

        const quantityArray = new Array();
        const nameArray = new Array();
        const priceArray = new Array();
        const noteArray = new Array();

        //* get foods ID
        const getID = async (name) => {
            const res = await fetch(`http://localhost:3000/getID/${name}`);
            const { _id } = await res.json();
            ids.push(_id);
        };

        const addCart = async (name, price, quantity, note) => {
            fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price, quantity, note }),
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

        $(span1).each((index, item) => {
            quantityArray.push($(item).text());
        });

        $(span2).each((index, item) => {
            nameArray.push($(item).text());
        });

        $(span3).each((index, item) => {
            priceArray.push($(item).text().split(' ')[0]);
        });

        $(input).each((index, item) => {
            noteArray.push($(item).val() || ' ');
        });

        quantityArray.forEach(async (item, index) => {
            await getID(nameArray[index]);
            orders.push({
                id: ids[index],
                quantity: quantityArray[index],
                name: nameArray[index],
                price: priceArray[index],
                note: noteArray[index],
            });
            console.log('orders', orders);

            //* add order to cart database
            addCart(nameArray[index], priceArray[index], quantityArray[index], noteArray[index]);
            updateOrderHistory(nameArray[index]);
        });

        //* update ingredients's quantity in database
        ingredientsStore.forEach((item) => {
            updateIngredients(item);
        });

        //* clear data when submit order
        $('.orderingFood').text('');
    });

    //* calculate total price of the bill
    const sum = (total, num) => {
        return total + num;
    };

    //* calculating total price for user
    $('.payment').click(function () {
        //* call API to create bill
        const createBill = async (quantity, foods, total, table = 1) => {
            fetch('http://localhost:3000/manager/bill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity, foods, total, table }),
            });
        };

        orders.forEach((item) => {
            //* convert price (string) to price (Number)
            prices.push(Number(item.price));
        });

        const total = prices.reduce(sum, 0);
        console.log(prices.length);
        console.log(total);

        //* call API for payment then clear all the data in array
        createBill(prices.length, orders, total);
        orders.length = 0;
        prices.length = 0;
        ids.length = 0;
        console.log(orders, prices, ids);
    });

    //* increase food's quantity when click plus icon
    $('.orderingFood').delegate('.sidebar_right_plus', 'click', function () {
        const quantity = $(this).prevAll()[2];
        const price = $(this).prevAll()[0];
        let number = Number($(quantity).text());

        const newQuantity = $(quantity).text(++number);
        let newPrice = Number($(price).text().split(' ')[0]) * newQuantity.text();
        $(price).text(`${newPrice} $`);
    });

    //* decrease food's quantity when click minus icon
    //* or remove food from sidebar right if quantity <= 0 (incase user want to remove from order list)
    $('.orderingFood').delegate('.sidebar_right_minus', 'click', function () {
        const quantity = $(this).next();
        const price = $(this).nextAll()[2];
        let number = $(quantity).text();
        //* divide into two cases like comment above
        if (Number(number) > 1) {
            let newPrice = Number($(price).text().split(' ')[0]) / Number($(quantity).text());
            $(quantity).text(--number);
            $(price).text(`${newPrice} $`);
        } else {
            //* remove this order from sidebar right
            const order = $(this).parents()[1];
            $(order).text(' ');
        }
    });

    //* update done status in chef page base on checkbox
    $("input[type='checkbox'][name='doneOrder']").each((index, item) => {
        $(item).change(function () {
            const row = $(this).parents()[4];
            const id = $(row).children()[0];
            const status = $(this).parents()[3];

            const updateDoneStatus = (id, status) => {
                fetch(`http://localhost:3000/cart/${id}?done=${status}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                });
            };

            if ($(this).prop('checked')) {
                $(status).prev().text('true');
                updateDoneStatus($(id).text(), true);
            } else {
                $(status).prev().text('false');
                updateDoneStatus($(id).text(), false);
            }
        });
    });

    //* toggle food by chef
    $("input[type='checkbox'][name='toggleCheckbox']").each((index, item) => {
        $(item).change(function () {
            const row = $(this).parents()[4];
            const id = $(row).children()[0];

            const updateToggleStatus = (id, toggle) => {
                fetch(`http://localhost:3000/chef/toggle?id=${id}&&toggle=${toggle}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                });
            };

            if ($(this).prop('checked')) {
                updateToggleStatus($.trim($(id).text()), true);
            } else {
                updateToggleStatus($.trim($(id).text()), false);
            }
        });
    });

    //* find bill base on a specific date
    $('.findDate').click(function () {
        const result = $('.date-picker').val().replace(/\//g, '-');
        window.location.href = `/manager/bill?date=${result}`;
    });
});
