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
});
