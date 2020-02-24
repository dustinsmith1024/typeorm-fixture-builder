import { DeepPartial } from 'typeorm';
import { Resolver } from './resolve';
/**
 * Defines a fixture.
 *
 * @param entity Entity.
 * @param data Data for entity.
 * @param resolver Custom entity resolver.
 */
export declare function fixture<Entity extends {}>(entity: new () => Entity, data: DeepPartial<Entity>, resolver?: Resolver<Entity>): Entity;
