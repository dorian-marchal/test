(function () {
    'use strict';

    $(function () {
        L.map($('.map').get(0), {
            center: new L.LatLng(48.8, 2.3),
            zoom: 8,
            layers: new L.TileLayer('https://a.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG9yaWFuLW1hcmNoYWwiLCJhIjoiS2VBQTFZTSJ9.ikZEadF09jwZgQQnql7aMA'),
        });
    });

})();
