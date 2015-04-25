(function () {
    'use strict';

    setInterval(function() {
        var randomHex = parseInt((Math.random() * 16777215)).toString(16);
        var randomColor = '#' + ('000000'.substring(0, 6 - randomHex.length) + randomHex);

        var cards = document.getElementsByClassName('card');
        cards[Math.floor(Math.random() * cards.length)].style.backgroundColor = randomColor;
    }, 100);

    $(function () {

    });

})();
