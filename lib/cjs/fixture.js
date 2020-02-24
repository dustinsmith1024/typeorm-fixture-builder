"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reflect_1 = require("./reflect");
/**
 * Defines a fixture.
 *
 * @param entity Entity.
 * @param data Data for entity.
 * @param resolver Custom entity resolver.
 */
function fixture(entity, data, resolver) {
    var instance = new entity();
    reflect_1.setPersisted(instance, false);
    reflect_1.setResolver(instance, resolver);
    return Object.assign(instance, data);
}
exports.fixture = fixture;
