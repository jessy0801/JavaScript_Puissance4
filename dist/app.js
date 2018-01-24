'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('./puissance4_es6.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
    (0, _jquery2.default)("#p4-contener").drawarea((0, _jquery2.default)("#p4-contener").genarea());
});