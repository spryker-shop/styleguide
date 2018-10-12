"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var cwd = process.cwd();
exports.default = {
    site_title: 'Spryker Styleguide',
    base_url: '',
    server_port: 3333,
    support_email: '',
    copyright: 'MIT licence',
    excerpt_length: 400,
    page_sort_meta: 'sort',
    category_sort: true,
    show_on_home_default: true,
    theme_dir: path_1.join(cwd, 'src/themes'),
    theme_name: 'default',
    content_dir: path_1.join(cwd, 'content'),
    public_dir: path_1.join(cwd, 'src/themes/default/public'),
    image_url: '/images',
    analytics: '',
    allow_editing: false,
    authentication: false,
    authentication_for_edit: true,
    authentication_for_read: false,
    secret: 'someCoolSecretRightHere',
    locale: 'en',
    searchExtraLanguages: ['ru'],
    datetime_format: 'Do MMM YYYY',
    rtl_layout: false,
    home_meta: {},
    table_of_contents: false
};
//# sourceMappingURL=config.js.map