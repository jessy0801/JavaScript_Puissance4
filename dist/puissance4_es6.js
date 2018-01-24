'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('jcanvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jquery2.default.fn.genarea = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

    var arr = [];
    for (var height = 0; height < x; height++) {
        arr.push([]);
        for (var width = 0; width < y; width++) {
            arr[height].push([{ type: 0, x: height, y: width }]);
        }
    }
    return arr;

    //$(this).append("<canvas></canvas>")
};
_jquery2.default.fn.drawarea = function (arr) {
    var test = 0;
    (0, _jquery2.default)(this).append("<table id='table'></table>");
    for (var height = 0; height < arr.length; height++) {
        (0, _jquery2.default)("#table").append("<tr id='row" + height + "'></tr>");

        var _loop = function _loop(width) {
            (0, _jquery2.default)("#row" + height).append("<td><canvas height='50px' width='50px' id='map" + height + "y" + width + "'></canvas></td>");
            if (arr[height][width].type === undefined) {
                var ctx = document.getElementById('map' + height + 'y' + width).getContext('2d');
                var img = new Image();
                img.src = '/home/sysy/JavaScript_Puissance4/empty_case.jpg';
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                };
                (0, _jquery2.default)("#map" + height + "y" + width).on('click', function () {
                    for (var i = arr.length - 1; i > 0; i--) {
                        if (arr[i][width].type === undefined && test === 0) {
                            arr[i][width].type = 1;
                            test = 1;
                            _jquery2.default.fn.drawarea(arr);
                            console.log("change type to 1");
                        }
                    }
                });
            } else {
                var _ctx = document.getElementById('map' + height + 'y' + width).getContext('2d');
                var imageData = _ctx.getImageData(0, 0, 50, 50);

                // examine every pixel,
                // change any old rgb to the new-rgb
                for (var i = 0; i < imageData.data.length; i += 4) {

                    if (imageData.data[i] === 255 && imageData.data[i + 1] === 255 && imageData.data[i + 2] === 255 && imageData.data[i + 3] === 255) {
                        imageData.data[i] = 200;
                        imageData.data[i + 1] = 10;
                        imageData.data[i + 2] = 10;
                        imageData.data[i + 3] = 10;
                    }
                }
                // put the altered data back on the canvas
                _ctx.putImageData(imageData, 0, 0);

                var _img = new Image();
                _img.src = '/home/sysy/JavaScript_Puissance4/full_case.jpg';
                _img.onload = function () {
                    _ctx.drawImage(_img, 0, 0);
                };
            }
        };

        for (var width = 0; width < arr[height].length; width++) {
            _loop(width);
        }
    }
    console.log(arr);
    //Change color
    // pull the entire image into an array of pixel data
};