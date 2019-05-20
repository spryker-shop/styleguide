const { join } = require('path');
const { kebabCase } = require('lodash');

exports.createSlug = node => {
    const fragments = [node.namespace, node.module, node.type, node.name];
    return join(...fragments.map(kebabCase));
}
