/**
 * Collects fixtures from an arbitrary object or array structure.
 * Any value inside that structure has to be either an array of fixtures or an object which
 * values lead to a fixture.
 *
 * @param value Object or Array to collect from.
 */
export declare function collect<Bundle, Entity>(value: Bundle): Entity[];
