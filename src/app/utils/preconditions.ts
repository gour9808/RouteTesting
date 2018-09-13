
/**
 * @preserve
 * condicio.js - A preconditions library for JavaScript similar to Google's Preconditions from Guava
 * Version 2.0.0
 * Written by Vivin Paliath (http://vivin.net)
 * Modified by Dhanraj Padmashali (https://dhanrajsp.me)
 * License: BSD License
 * Copyright (C) 2015
 */
export class Preconditions {


    static checkElementIndex(index, size, message, args) {
        this.checkIsNumber(index, 'Index must be a number');
        this.checkIsNumber(size, 'Size must be a number');

        if (this.isElementIndexInvalid(index, size)) {
            console.error('Index ' + index + ' is not a valid index in array of size ' + size, message, args, RangeError);
        }
    }

    static isElementIndexInvalid(index, size) {
        this.checkIsNumber(index, 'Index must be a number');
        this.checkIsNumber(size, 'Size must be a number');

        return (index < 0 || index >= size);
    }

    static checkNotNull(reference?, message?, args?) {
        if (this.isNull(reference)) {
            console.error('Argument cannot be null', message, args, TypeError);
        }
    }

    static isNull(reference) {
        return (reference === null);
    }

    static checkNotUndefined(reference?, message?, args?) {
        if (this.isUndefined(reference)) {
            console.error('Argument cannot be undefined', message, args, ReferenceError);
        }
    }

    static isUndefined(reference) {
        return (typeof reference === 'undefined');
    }

    static checkPositionIndex(index, size, message, args) {
        this.checkIsNumber(index, 'Index must be a number');
        this.checkIsNumber(size, 'Size must be a number');

        if (this.isPositionIndexInvalid(index, size)) {
            console.error('Index ' + index + ' is not a valid position in array of size ' + size, message, args, RangeError);
        }
    }

    static isPositionIndexInvalid(index, size) {
        this.checkIsNumber(index, 'Index must be a number');
        this.checkIsNumber(size, 'Size must be a number');

        return (index < 0 || index > size);
    }

    static checkPositionIndexes(start, end, size, message, args) {
        this.checkIsNumber(start, 'Starting index must be a number');
        this.checkIsNumber(end, 'Ending index must be a number');
        this.checkIsNumber(size, 'Size must be a number');

        if (this.arePositionIndexesInvalid(start, end, size)) {
            console.error('Positions between indexes ' + start + ' and ' + end + ' are not valid positions in array of size ' + size, message, args, RangeError);
        }
    }

    static arePositionIndexesInvalid(start, end, size) {
        this.checkIsNumber(start, 'Starting index must be a number');
        this.checkIsNumber(end, 'Ending index must be a number');
        this.checkIsNumber(size, 'Size must be a number');

        return (start < 0 || end > size || start > end);
    }

    static checkObjectDirectProperty(object, property, message, args) {
        this.checkNotNull(object, 'Object parameter cannot be null');
        this.checkNotUndefined(object, 'Object parameter cannot be undefined');
        this.checkIsString(property, 'Property parameter must be a string');

        if (!this.isObjectDirectProperty(object, property)) {
            console.error('Property \'' + property + '\' is not a valid, direct property', message, args, ReferenceError);
        }
    }

    static isObjectDirectProperty(object, property) {
        this.checkNotNull(object, 'Object parameter cannot be null');
        this.checkNotUndefined(object, 'Object parameter cannot be undefined');
        this.checkIsString(property, 'Property parameter must be a string');

        return object.hasOwnProperty(property);
    }

    static checkObjectProperty(object, property, message, args) {
        this.checkNotNull(object, 'Object parameter cannot be null');
        this.checkNotUndefined(object, 'Object parameter cannot be undefined');
        this.checkIsString(property, 'Property parameter must be a string');

        if (!this.isObjectProperty(object, property)) {
            console.error('Property \'' + property + '\' is not a valid property', message, args, ReferenceError);
        }
    }

    static isObjectProperty(object, property) {
        this.checkNotNull(object, 'Object parameter cannot be null');
        this.checkNotUndefined(object, 'Object parameter cannot be undefined');
        this.checkIsString(property, 'Property parameter must be a string');

        return (property in object);
    }

    static checkState(expression, message, args) {
        if (!expression) {
            console.error('State does not satisfy expression', message, args);
        }
    }

    static checkIsBoolean(object, message, args) {
        if (!this.isBoolean(object)) {
            console.error('Argument is not a boolean', message, args, TypeError);
        }
    }

    static isBoolean(object?, message?) {
        return (typeof object === 'boolean');
    }

    static checkIsNumber(object?, message?, args?) {
        if (!this.isNumber(object)) {
            console.error('Argument is not a number', message, args, TypeError);
        }
    }

    static isNumber(object) {
        return (typeof object === 'number');
    }

    static checkIsString(object, message, args?) {
        if (!this.isString(object)) {
            console.error('Argument is not a string', message, args, TypeError);
        }
    }

    static isString(object) {
        return (typeof object === 'string');
    }

    static checkIsArray(object, message, args?) {
        if (!this.isArray(object)) {
            console.error('Argument is not an array', message, args, TypeError);
        }
    }

    static isArray(object) {
        return (typeof Array.isArray === 'undefined') ? (toString.call(object) === '[object Array]') : Array.isArray(object);
    }

    static checkIsObject(object, message, args) {
        if (!this.isObject(object)) {
            console.error('Argument is not an object', message, args, TypeError);
        }
    }

    static isObject(object) {
        return (Object.getPrototypeOf(new Object(object)) === Object.prototype);
    }

    static checkIsFunction(object?, message?, args?) {
        if (!this.isFunction(object)) {
            console.error('Argument is not a ', message, args, TypeError);
        }
    }

    static isFunction(object) {
        return (typeof object === 'function');
    }

    static checkIsType(object?, type?, message?, args?) {
        this.checkNotNull(object, 'Object parameter cannot be null');
        this.checkNotUndefined(object, 'Object parameter cannot be undefined');
        this.checkNotNull(type, 'Type parameter cannot be null');
        this.checkNotUndefined(type, 'Type parameter cannot be undefined');
        this.checkIsFunction(type, 'Type parameter must be a ');

        const expectedType = type.toString().replace(/\s/g, '').replace(/^/, '').replace(/\(.*/, '');

        if (!this.isType(object, type)) {
            console.error('Argument is not of type ' + expectedType, message, args, TypeError);
        }
    }

    static isType(object?, type?) {
        this.checkNotNull(object, 'Object parameter cannot be null');
        this.checkNotUndefined(object, 'Object parameter cannot be undefined');
        this.checkNotNull(type, 'Type parameter cannot be null');
        this.checkNotUndefined(type, 'Type parameter cannot be undefined');
        this.checkIsFunction(type, 'Type parameter must be a ');

        return (object instanceof type);
    }
}
