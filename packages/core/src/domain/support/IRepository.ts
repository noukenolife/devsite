import Id from "@/domain/support/Id";
import Entity from "@/domain/support/Entity";

export default interface IRepository<ID extends Id<any>, E extends Entity<ID>> {
  nextId(): Promise<ID>;
  save(entity: E): Promise<void>;
  saveAll(entities: E[]): Promise<void>;
  remove(id: ID): Promise<void>;
  removeAll(ids: ID[]): Promise<void>;
  findById(id: ID): Promise<E | undefined>;
}
