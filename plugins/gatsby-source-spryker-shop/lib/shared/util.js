const { join } = require('path');
const { kebabCase } = require('lodash');

const createSlug = (...fragments) => `${join(...fragments.map(kebabCase))}/`;

const sortStringsBy = (propertyName) => (a, b) => {
    const nameA = a[propertyName].toLowerCase();
    const nameB = b[propertyName].toLowerCase();

    if (nameA < nameB) {
        return -1;
    }

    if (nameA > nameB) {
        return 1;
    }

    return 0;
}

module.exports = {
    createSlug,
    sortStringsBy
};
