"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var reflect_1 = require("./reflect");
/**
 * Collects fixtures from an arbitrary object or array structure.
 * Any value inside that structure has to be either an array of fixtures or an object which
 * values lead to a fixture.
 *
 * @param value Object or Array to collect from.
 */
function collect(value) {
    if (value && Array.isArray(value)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return collectArray(value);
    }
    if (typeof value === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return collectObject(value);
    }
    throw new Error("Invalid fixture definition.");
}
exports.collect = collect;
/**
 * Collects fixtures from an array type.
 *
 * @param value Array.
 */
function collectArray(value) {
    return value.reduce(function (fixtures, element) { return fixtures.concat(collect(element)); }, []);
}
/**
 * Collects fixtures from an object type.
 *
 * @param value Object.
 */
function collectObject(value) {
    if (reflect_1.isFixture(value)) {
        return [value];
    }
    else {
        return Object.values(value).reduce(function (fixtures, element) { return fixtures.concat(collect(element)); }, []);
    }
}
