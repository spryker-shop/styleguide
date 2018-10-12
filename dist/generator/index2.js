"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var layout_1 = require("./layout");
var app = Express();
app.use(Express.static('./dist/public'));
app.get('/', function (req, res) { return res.send(layout_1.layout()); });
app.listen(3333, function () { return console.log("Styleguide running on port 3333..."); });
//# sourceMappingURL=index2.js.map