"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raneto = require("raneto");
var config_1 = require("./config");
var app = raneto(config_1.default);
app.listen(config_1.default.server_port, function () { return console.log(config_1.default.site_title, "running on http://localhost:" + config_1.default.server_port + "..."); });
//# sourceMappingURL=index.js.map