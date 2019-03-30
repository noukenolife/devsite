import { Entity } from '@/domain/support/Entity';
import { Id } from '@/domain/support/Id';
import { InMemoryRepository } from './InMemoryRepository';

class TestId extends Id<number> {}

class TestEntity extends Entity<TestId> {
  protected _value: string;

  public constructor(id: TestId, value: string = 'Test') {
    super(id);
    this._value = value;
  }

  public set value(value: string) {
    this._value = value;
  }
}

class InMemoryTestRepository extends InMemoryRepository<TestId, TestEntity> {
  private counter: number = 0;

  public async nextId(): Promise<TestId> {
    this.counter += 1;
    return new TestId(this.counter);
  }
}

describe('InMemoryRepository', () => {
  it('find the entity by the id', async () => {
    const testRepo = new InMemoryTestRepository();

    const entity1 = new TestEntity(await testRepo.nextId());
    const entity2 = new TestEntity(await testRepo.nextId());
    const entity3 = new TestEntity(await testRepo.nextId());
    testRepo.entities = [entity1, entity2, entity3];

    const thatEntity = await testRepo.findById(entity1.id);
    expect(thatEntity).toEqual(entity1);

    await expect(testRepo.findById(new TestId(4))).resolves.toBe(undefined);
  });

  it('save an entity', async () => {
    const testRepo = new InMemoryTestRepository();

    const newEntity = new TestEntity(await testRepo.nextId());
    await testRepo.save(newEntity);

    expect(testRepo.entities).toEqual([newEntity]);

    newEntity.value = 'NewTest';
    await testRepo.save(newEntity);

    expect(testRepo.entities).toEqual([newEntity]);
  });

  it('save all entities', async () => {
    const testRepo = new InMemoryTestRepository();

    const entity1 = new TestEntity(await testRepo.nextId(), 'Test1');
    const entity2 = new TestEntity(await testRepo.nextId(), 'Test2');
    const entity3 = new TestEntity(await testRepo.nextId(), 'Test3');

    await testRepo.saveAll([entity1, entity2]);
    expect(testRepo.entities).toEqual([entity1, entity2]);

    entity1.value = 'NewTest1';
    entity2.value = 'NewTest2';
    await testRepo.saveAll([entity1, entity2, entity3]);
    expect(testRepo.entities).toEqual([entity1, entity2, entity3]);
  });

  it('remove an entity', async () => {
    const testRepo = new InMemoryTestRepository();
    const entity = new TestEntity(await testRepo.nextId());
    testRepo.entities = [entity];

    await testRepo.remove(entity.id);
    expect(testRepo.entities).toEqual([]);
  });

  it('remove all entities', async () => {
    const testRepo = new InMemoryTestRepository();
    const entity1 = new TestEntity(await testRepo.nextId());
    const entity2 = new TestEntity(await testRepo.nextId());
    testRepo.entities = [entity1, entity2];

    await testRepo.removeAll([entity1.id, entity2.id]);
    expect(testRepo.entities).toEqual([]);
  });
});
