const { join } = require('path');
const { kebabCase } = require('lodash');

const createSlug = (...fragments) => `${join(...fragments.map(kebabCase))}/`;
const createSlugForComponent = (namespace, moduleName, componentType, componentName) => createSlug(namespace, moduleName, componentType, componentName);
const createSlugForModule = (namespace, moduleName) => createSlug(namespace, moduleName);

module.exports = {
    createSlug,
    createSlugForComponent,
    createSlugForModule
};
