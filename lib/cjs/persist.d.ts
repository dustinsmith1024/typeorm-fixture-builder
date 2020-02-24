import { EntityManager } from 'typeorm';
/**
 * Persists a fixture.
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 */
export declare function persist(manager: EntityManager, fixture: any): Promise<any>;
