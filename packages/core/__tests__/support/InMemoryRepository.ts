import IRepository from "@/domain/support/IRepository";
import Id from "@/domain/support/Id";
import Entity from "@/domain/support/Entity";
import equal from "fast-deep-equal";

export default abstract class InMemoryRepository<ID extends Id<any>, E extends Entity<ID>>
  implements IRepository<ID, E> {

  public _entities: E[];

  public constructor(entities: E[] = []) {
    this._entities = entities;
  }

  public get entities(): E[] { return this._entities; }
  public set entities(entities: E[]) { this._entities = entities; };

  public async findById(id: ID): Promise<E | undefined> {
    return this._entities.find(entity => equal(entity.id, id));
  }

  public abstract nextId(): Promise<ID>;

  public async remove(id: ID): Promise<void> {
    this._entities = this._entities.filter(entity => !equal(entity.id, id));
  }

  public async removeAll(ids: ID[]): Promise<void> {
    this._entities = this._entities.filter(entity => !ids.includes(entity.id));
  }

  public async save(entity: E): Promise<void> {
    const index = this._entities.findIndex((e) => equal(e.id, entity.id));
    if (index !== -1) {
      this._entities[index] = entity;
    } else {
      this._entities.push(entity);
    }
  }

  public async saveAll(entities: E[]): Promise<void> {
    for (const entity of entities) {
      await this.save(entity);
    }
  }
}
