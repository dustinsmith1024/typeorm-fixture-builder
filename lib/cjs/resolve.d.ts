import { DeepPartial, SelectQueryBuilder, Repository, EntityManager } from 'typeorm';
/**
 * Defines a resolver callback.
 */
export interface Resolver<Entity extends {} = any> {
    (repository: Repository<Entity>, values: DeepPartial<Entity>): SelectQueryBuilder<Entity>;
}
/**
 * Resolves an entity instance for a fixture.
 * If an entity has been found, the loaded entity is merged with the
 * fixture and returned, otherwise the fixture itself is returned.
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 */
export declare function resolve(manager: EntityManager, fixture: any): Promise<any>;
