import { Connection } from 'typeorm';
/**
 * Uses the given connection to install an array of fixtures.
 * Fixtures have to be defined by using the `fixture` function.
 *
 * @see fixture
 * @param connection Connection.
 * @param fixtures Array of fixtures.
 */
export declare function install<Entity>(connection: Connection, fixtures: Entity[]): Promise<void>;
