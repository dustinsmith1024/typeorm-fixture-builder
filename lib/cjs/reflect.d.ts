import { Resolver } from './resolve';
export declare const META_PERSISTED = "__PERSISTED__";
export declare const META_RESOLVER = "__RESOLVER__";
/**
 * Returns true if the "peristed" meta data of a fixture contains
 * true.
 *
 * @param target Fixture.
 */
export declare function isPersisted(target: Record<string, any>): boolean;
/**
 * Returns true if the given target object is marked as a fixture,
 * otherwise false.
 *
 * @param target Maybe fixture.
 */
export declare function isFixture(target: Record<string, any>): boolean;
/**
 * Sets the "persisted" meta data of a fixture.
 *
 * @param target Fixture.
 * @param value Value.
 */
export declare function setPersisted(target: Record<string, any>, value: boolean): void;
/**
 * Sets the "resolver" meta data of a fixture.
 *
 * @param target Fixture.
 * @param value Resolver callback.
 */
export declare function setResolver(target: Record<string, any>, value: Resolver | undefined): void;
/**
 * Returns the resolver of a fixture.
 *
 * @param target Fixture.
 */
export declare function getResolver(target: Record<string, any>): Resolver | undefined;
