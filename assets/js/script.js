'use strict';

setTimeout(function() {
    setInterval(function() {

        var cards = document.getElementsByClassName('card');
        for (var i = 0; i < cards.length ; i++) {
            var randomHex = parseInt((Math.random() * 20) + 1385898).toString(16);
            var randomColor = '#' + ('000000'.substring(0, 6 - randomHex.length) + randomHex);
            cards[i].style.backgroundColor = randomColor;
            cards[i].innerHTML = '>';
        }
    }, 100);
}, 1000);
