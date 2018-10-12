"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var server_1 = require("react-dom/server");
var app_1 = require("../../shared/app");
exports.layout = function () { return "\n    <!doctype html>\n    <html lang=\"en\">\n        <head>\n            <meta charset=\"utf-8\" />\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\" />\n            <meta name=\"title\" content=\"\" />\n            <meta name=\"description\" content=\"\" />\n            <meta name=\"keywords\" content=\"\" />\n            <meta name=\"generator\" content=\"spryker\" />\n\n            <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\" />\n            <script src=\"/js/runtime.js\"></script>\n            <title>ShopUi Styleguide</title>\n        </head>\n        <body>\n            <div id=\"app\">" + server_1.renderToString(<app_1.App />) + "</div>\n            <script src=\"/js/vendor.js\"></script>\n            <script src=\"/js/app.js\"></script>\n        </body>\n    </html>\n"; };
//# sourceMappingURL=layout.js.map