"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META_PERSISTED = '__PERSISTED__';
exports.META_RESOLVER = '__RESOLVER__';
/**
 * Returns true if the "peristed" meta data of a fixture contains
 * true.
 *
 * @param target Fixture.
 */
function isPersisted(target) {
    return Reflect.getMetadata(exports.META_PERSISTED, target);
}
exports.isPersisted = isPersisted;
/**
 * Returns true if the given target object is marked as a fixture,
 * otherwise false.
 *
 * @param target Maybe fixture.
 */
function isFixture(target) {
    return Reflect.hasMetadata(exports.META_PERSISTED, target);
}
exports.isFixture = isFixture;
/**
 * Sets the "persisted" meta data of a fixture.
 *
 * @param target Fixture.
 * @param value Value.
 */
function setPersisted(target, value) {
    Reflect.defineMetadata(exports.META_PERSISTED, value, target);
}
exports.setPersisted = setPersisted;
/**
 * Sets the "resolver" meta data of a fixture.
 *
 * @param target Fixture.
 * @param value Resolver callback.
 */
function setResolver(target, value) {
    Reflect.defineMetadata(exports.META_RESOLVER, value, target);
}
exports.setResolver = setResolver;
/**
 * Returns the resolver of a fixture.
 *
 * @param target Fixture.
 */
function getResolver(target) {
    return Reflect.getMetadata(exports.META_RESOLVER, target);
}
exports.getResolver = getResolver;
