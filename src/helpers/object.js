import { path, split } from 'ramda';

const toFragments = split('.');

export const getDefault = (obj, defaultValue = null, paths = '') => {
    if (!obj) {
        return defaultValue;
    }

    if (!paths) {
        return obj;
    }

    return path(toFragments(paths), obj) || defaultValue;
}

export const exists = (obj, paths = '') => {
    const property = getDefault(obj, null, paths);

    if (!property) {
        return false;
    }

    if (Array.isArray(property)) {
        return property.length > 0;
    }

    return true;
}
